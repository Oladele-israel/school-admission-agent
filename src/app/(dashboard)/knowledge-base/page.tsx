import { prisma } from "@/lib/prisma";
import KnowledgeBaseClient from "@/components/kb/KnowledgeBaseClient";

export const dynamic = "force-dynamic";

export default async function KnowledgeBasePage() {
  const articles = await prisma.knowledgeBaseArticle.findMany({ orderBy: { category: "asc" } });
  const items = articles.map((a) => ({ ...a, updatedAt: a.updatedAt.toISOString() }));

  return (
    <div className="h-full flex flex-col">
      <header className="px-8 py-6 border-b border-line/20 bg-white/5 backdrop-blur-md shrink-0">
        <h1 className="font-display text-2xl font-bold text-white tracking-tight mb-1">Knowledge Base</h1>
        <p className="text-sm text-slate-400">
          What keeps the agent's answers accurate — no code changes needed when fees or policy change each term.
        </p>
      </header>
      <div className="flex-1 overflow-y-auto">
        <KnowledgeBaseClient initialItems={items} />
      </div>
    </div>
  );
}
