import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import EscalationsClient from "@/components/escalations/EscalationsClient";

export const dynamic = "force-dynamic";

export default async function EscalationsPage() {
  const user = await getSession();

  const escalations = await prisma.escalationTask.findMany({
    where: { status: "OPEN" },
    orderBy: { createdAt: "asc" },
    include: { applicant: true },
  });

  const items = escalations.map((e) => ({
    id: e.id,
    applicantId: e.applicantId,
    parentName: e.applicant.parentName || "Unnamed parent",
    reason: e.reason,
    triggerSnippet: e.triggerSnippet,
    assignedRole: e.assignedRole,
    suggestedReply: e.suggestedReply,
    createdAt: e.createdAt.toISOString(),
  }));

  return (
    <div className="h-full flex flex-col">
      <header className="px-8 py-6 border-b border-line/20 bg-white/5 backdrop-blur-md shrink-0">
        <h1 className="font-display text-2xl font-bold text-white tracking-tight mb-1">Escalations</h1>
        <p className="text-sm text-slate-400">
          Nothing risky goes out without a click here. Approve, edit, or write a custom reply.
        </p>
      </header>
      <div className="flex-1 overflow-y-auto">
        <EscalationsClient initialItems={items} currentRole={user!.role} />
      </div>
    </div>
  );
}
