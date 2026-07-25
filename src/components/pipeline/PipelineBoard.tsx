"use client";
import { MoreHorizontal, Calendar, ArrowRight } from "lucide-react";

export default function PipelineBoard({ initialColumns = [] }: any) {
  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'INQUIRY': return 'bg-slate-500';
      case 'TOUR_BOOKED': return 'bg-blue-500';
      case 'TOUR_COMPLETED': return 'bg-indigo-500';
      case 'APPLICATION_SUBMITTED': return 'bg-brass';
      case 'FEE_PENDING': return 'bg-orange-500';
      case 'ENROLLED': return 'bg-emerald-500';
      case 'LOST': return 'bg-rust';
      default: return 'bg-slate-500';
    }
  };

  return (
    <div className="h-full p-8 overflow-x-auto flex gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {initialColumns.map((col: any) => (
        <div key={col.stage} className="flex flex-col w-[320px] shrink-0">
          <div className="flex items-center justify-between mb-4 px-1">
            <div className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full ${getStageColor(col.stage)} shadow-[0_0_8px_currentColor] opacity-80`}></div>
              <h3 className="font-semibold text-white text-sm tracking-wide">{col.stage.replace(/_/g, ' ')}</h3>
              <span className="text-xs bg-white/10 text-slate-300 px-2 py-0.5 rounded-full ml-1">{col.applicants.length}</span>
            </div>
            <button className="text-slate-400 hover:text-white"><MoreHorizontal size={16}/></button>
          </div>
          
          <div className="flex flex-col gap-3">
            {col.applicants.map((item: any) => (
              <div key={item.id} className="ledger-card p-4 cursor-grab active:cursor-grabbing group">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-sm font-medium text-white truncate pr-2">{item.parentName || "Unknown"}</h4>
                  <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-slate-400 text-xs font-medium shrink-0">
                    {(item.parentName || "U").charAt(0)}
                  </div>
                </div>
                <p className="text-xs text-slate-400 mb-4 truncate">
                  Child: {item.childName || "N/A"}
                </p>
                <div className="flex justify-between items-center pt-3 border-t border-line/10">
                  <div className="flex items-center gap-1 text-[10px] text-slate-500 font-medium truncate">
                    <Calendar size={12} /> {new Date(item.updatedAt).toLocaleDateString()}
                  </div>
                  <button className="text-[10px] font-medium text-brass flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    View <ArrowRight size={10} />
                  </button>
                </div>
              </div>
            ))}
            
            <div className="h-20 rounded-xl border-2 border-dashed border-white/5 bg-white/[0.02] flex items-center justify-center text-slate-500 text-xs font-medium mt-1">
              + Drop candidate here
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
