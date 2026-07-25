import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import SettingsClient from "@/components/settings/SettingsClient";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const user = await getSession();
  if (user?.role !== "ADMIN") redirect("/inbox");

  let settings = await prisma.settings.findUnique({ where: { id: "singleton" } });
  if (!settings) {
    settings = await prisma.settings.create({
      data: {
        id: "singleton",
        reminderCadenceDays: { incompleteApp: [2, 5, 10], feeReminder: [1, 4, 8] },
        tourWindows: [{ day: "Mon-Fri", start: "09:00", end: "15:00" }],
        escalationRouting: { FEE_NEGOTIATION: "BURSAR", COMPLAINT: "ADMISSIONS_OFFICER" },
        chatTestMode: true,
      },
    });
  }

  return (
    <div className="h-full flex flex-col">
      <header className="px-8 py-8 border-b border-line/20 bg-white/5 backdrop-blur-md">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-display text-3xl font-bold text-white tracking-tight mb-2">Workspace Settings</h1>
          <p className="text-sm text-slate-400">Configure reminder cadences, tour windows, routing rules, and system behavior.</p>
        </div>
      </header>
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
      <SettingsClient
        initialSettings={{
          reminderCadenceDays: settings.reminderCadenceDays as any,
          tourWindows: settings.tourWindows as any,
          escalationRouting: settings.escalationRouting as any,
          chatTestMode: settings.chatTestMode,
        }}
      />
        </div>
      </div>
    </div>
  );
}
