import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import InboxClient from "@/components/inbox/InboxClient";

export const dynamic = "force-dynamic";

export default async function InboxPage() {
  const user = await getSession();

  const applicants = await prisma.applicant.findMany({
    orderBy: { updatedAt: "desc" },
    include: {
      conversations: { orderBy: { createdAt: "desc" }, take: 1 },
      escalations: { where: { status: "OPEN" as any }, take: 1 },
    },
    take: 100,
  });

  const listItems = applicants.map((a: any) => ({
    id: a.id,
    parentName: a.parentName || "Unnamed parent",
    childName: a.childName,
    stage: a.stage,
    agentPaused: a.agentPaused,
    hasOpenEscalation: a.escalations.length > 0,
    lastMessage: a.conversations[0]?.body ?? "No messages yet",
    lastMessageAt: a.conversations[0]?.createdAt.toISOString() ?? a.updatedAt.toISOString(),
  }));

  return (
    <div className="h-screen flex flex-col">
      <header className="px-8 py-6 border-b border-line/20 bg-white/5 backdrop-blur-md shrink-0">
        <h1 className="font-display text-2xl font-bold text-white tracking-tight mb-1">Inbox</h1>
        <p className="text-sm text-slate-400">Live parent conversations across every channel.</p>
      </header>
      <div className="flex-1 min-h-0">
        <InboxClient initialApplicants={listItems} currentUserLabel={`officer:${user!.id}`} />
      </div>
    </div>
  );
}
