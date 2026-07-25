import "dotenv/config";
import { prisma } from "../src/lib/prisma";
import { kbSeedData } from "./kb-seed-data";

async function main() {
  await prisma.user.createMany({
    data: [
      { email: "officer@school.edu", name: "Amara (Admissions)", role: "ADMISSIONS_OFFICER" },
      { email: "bursar@school.edu", name: "Chidi (Bursar)", role: "BURSAR" },
      { email: "admin@school.edu", name: "Admin", role: "ADMIN" },
    ],
    skipDuplicates: true,
  });

  await prisma.knowledgeBaseArticle.createMany({
    data: kbSeedData.map(item => ({
      ...item,
      updatedBy: "seed",
    })),
    skipDuplicates: true,
  });



  await prisma.settings.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      reminderCadenceDays: { incompleteApp: [2, 5, 10], feeReminder: [1, 4, 8] },
      tourWindows: [{ day: "Mon-Fri", start: "09:00", end: "15:00" }],
      escalationRouting: { FEE_NEGOTIATION: "BURSAR", COMPLAINT: "ADMISSIONS_OFFICER" },
      chatTestMode: true,
    },
  });

  console.log("Seed complete.");
}

main().finally(() => prisma.$disconnect());
