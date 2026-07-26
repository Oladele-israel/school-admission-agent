"use client";
import { AlertCircle, CheckCircle2, Clock, ArrowRight } from "lucide-react";

export default function EscalationsClient({ initialItems = [], currentRole, calendarLink = "" }: any) {
  const escalations = initialItems;

  const openCount = escalations.filter((e: any) => e.status !== "RESOLVED").length;

  return (
    <div className="p-8 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="ledger-card p-5 border-t-2 border-t-rust">
          <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Needs Action</div>
          <div className="text-3xl font-display font-bold text-white">{openCount}</div>
        </div>
        <div className="ledger-card p-5 border-t-2 border-t-emerald-500">
          <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Total Found</div>
          <div className="text-3xl font-display font-bold text-white">{escalations.length}</div>
        </div>
        <div className="ledger-card p-5 border-t-2 border-t-brass">
          <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Avg Resolution</div>
          <div className="text-3xl font-display font-bold text-white">-- h</div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-white mb-4">Escalations</h2>
        {escalations.length === 0 && <p className="text-slate-400">No active escalations.</p>}
        {escalations.map((esc: any) => (
          <div key={esc.id} className="ledger-card p-6 flex flex-col sm:flex-row gap-6 justify-between items-start">
            <div className="flex gap-4">
              <div className="mt-1 shrink-0">
                {esc.status === 'OPEN' || !esc.status ? (
                  <AlertCircle className="text-rust" size={24} />
                ) : (
                  <CheckCircle2 className="text-emerald-500" size={24} />
                )}
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-sm font-semibold text-white">{esc.parentName}</h3>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${esc.reason === 'FEE_NEGOTIATION' ? 'bg-orange-500/20 text-orange-400' : 'bg-blue-500/20 text-blue-400'}`}>
                    {esc.reason}
                  </span>
                  <span className="text-xs text-slate-500 flex items-center gap-1"><Clock size={12}/> {new Date(esc.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="bg-black/30 border border-white/5 rounded-lg p-3 mb-3">
                  <p className="text-sm text-slate-300 italic">"{esc.triggerSnippet}"</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span>Assigned to: <strong className="text-slate-200">{esc.assignedRole.replace('_', ' ')}</strong></span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 shrink-0 w-64">
              <textarea 
                id={`reply-${esc.id}`}
                placeholder="Type your resolution or instructions for the AI..."
                className="bg-black/50 border border-white/10 rounded-md p-2 text-xs text-white resize-none h-16 focus:outline-none focus:border-brass"
                defaultValue={esc.suggestedReply || `Please ask the parent to schedule a Google Meet with me using my calendar link: ${calendarLink || 'https://calendar.app.google/...'}`}
              />
              <button 
                onClick={async () => {
                  const resolutionText = (document.getElementById(`reply-${esc.id}`) as HTMLTextAreaElement).value;
                  await fetch(`/api/escalations/${esc.id}/resolve`, { 
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                      action: 'approve', 
                      resolution: resolutionText 
                    })
                  });
                  window.location.reload();
                }}
                className="btn-secondary whitespace-nowrap text-xs gap-2 justify-center"
              >
                Resolve Ticket <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
