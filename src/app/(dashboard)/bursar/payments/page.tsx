import { prisma } from "@/lib/prisma";
import PaymentsClient from "@/components/payments/PaymentsClient";

export const dynamic = "force-dynamic";

export default async function PaymentsPage() {
  const payments = await prisma.payment.findMany({
    orderBy: { dueDate: "asc" },
    include: { applicant: true },
  });

  const items = payments.map((p) => ({
    id: p.id,
    parentName: p.applicant.parentName || "Unnamed parent",
    amount: p.amount.toString(),
    dueDate: p.dueDate.toISOString(),
    status: p.status,
    reminderStage: p.reminderStage,
    draftReminder: p.draftReminder,
    providerRef: p.providerRef,
  }));

  return (
    <div className="h-full flex flex-col">
      <header className="px-8 py-6 border-b border-line/20 bg-white/5 backdrop-blur-md shrink-0">
        <h1 className="font-display text-2xl font-bold text-white tracking-tight mb-1">Payment Ledger</h1>
        <p className="text-sm text-slate-400">Overdue balances, reminder stages, and manual reconciliation.</p>
      </header>
      <div className="flex-1 overflow-y-auto">
        <PaymentsClient initialItems={items} />
      </div>
    </div>
  );
}
