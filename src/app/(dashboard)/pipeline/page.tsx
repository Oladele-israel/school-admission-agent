import { prisma } from "@/lib/prisma";
import PipelineBoard from "@/components/pipeline/PipelineBoard";

export const dynamic = "force-dynamic";

const STAGES = ["INQUIRY", "TOUR_BOOKED", "TOUR_COMPLETED", "APPLICATION_SUBMITTED", "FEE_PENDING", "ENROLLED", "LOST"] as const;

export default async function PipelinePage() {
  const applicants = await prisma.applicant.findMany({
    orderBy: { updatedAt: "desc" },
    select: { id: true, parentName: true, childName: true, stage: true, updatedAt: true },
  });

  const columns = STAGES.map((stage: any) => ({
    stage,
    applicants: applicants
      .filter((a: any) => a.stage === stage)
      .map((a: any) => ({ ...a, updatedAt: a.updatedAt.toISOString() })),
  }));

  return (
    <div className="h-full flex flex-col">
      <header className="px-8 py-6 border-b border-line/20 bg-white/5 backdrop-blur-md shrink-0">
        <h1 className="font-display text-2xl font-bold text-white tracking-tight mb-1">Pipeline</h1>
        <p className="text-sm text-slate-400">Where the funnel is leaking — drag a card to correct a stage the agent missed.</p>
      </header>
      <div className="flex-1 min-h-0">
        <PipelineBoard initialColumns={columns} />
      </div>
    </div>
  );
}
