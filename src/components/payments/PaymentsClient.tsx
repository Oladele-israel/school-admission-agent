"use client";
import { DollarSign, CheckCircle2, Clock, MoreVertical, Search, Download } from "lucide-react";

export default function PaymentsClient({ initialItems = [] }: any) {
  const payments = initialItems;

  const calculateTotal = (status: string) => {
    return payments
      .filter((p: any) => p.status === status)
      .reduce((sum: number, p: any) => sum + Number(p.amount), 0)
      .toLocaleString();
  };

  return (
    <div className="p-8 max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div className="flex gap-4 w-full sm:w-auto">
          <div className="ledger-card px-5 py-3 flex items-center gap-4">
            <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg"><DollarSign size={20} /></div>
            <div>
              <div className="text-xs text-slate-400 uppercase tracking-wide font-semibold">Collected</div>
              <div className="text-xl font-bold text-white">₦{calculateTotal("paid")}</div>
            </div>
          </div>
          <div className="ledger-card px-5 py-3 flex items-center gap-4">
            <div className="p-2 bg-rust/20 text-rust rounded-lg"><Clock size={20} /></div>
            <div>
              <div className="text-xs text-slate-400 uppercase tracking-wide font-semibold">Pending/Overdue</div>
              <div className="text-xl font-bold text-white">₦{calculateTotal("pending")}</div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input type="text" placeholder="Search invoices..." className="input-field !pl-9" />
          </div>
          <button className="btn-secondary gap-2 px-3"><Download size={16}/></button>
        </div>
      </div>

      <div className="ledger-card overflow-hidden">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-white/5 border-b border-line/20 text-xs uppercase tracking-wider text-slate-400 font-semibold">
            <tr>
              <th className="px-6 py-4">Parent</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Due Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line/10">
            {payments.length === 0 && (
              <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-400">No payment records found.</td></tr>
            )}
            {payments.map((payment: any) => (
              <tr key={payment.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-6 py-4 font-medium text-white">{payment.parentName}</td>
                <td className="px-6 py-4 font-medium text-slate-200">₦{Number(payment.amount).toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide
                    ${payment.status === 'paid' ? 'bg-emerald-500/20 text-emerald-400' : 
                      payment.status === 'overdue' ? 'bg-rust/20 text-rust' : 
                      'bg-brass/20 text-brass'}`}>
                    {payment.status === 'paid' ? <CheckCircle2 size={12}/> : <Clock size={12}/>}
                    {payment.status}
                  </span>
                </td>
                <td className="px-6 py-4">{new Date(payment.dueDate).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-400 hover:text-white transition-colors p-1"><MoreVertical size={16}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
