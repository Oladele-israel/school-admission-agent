"use client";
import { Search, Plus, Edit2, Trash2, FileText } from "lucide-react";
import { useState } from "react";

export default function KnowledgeBaseClient({ initialItems = [] }: { initialItems?: any[] }) {
  const [search, setSearch] = useState("");
  const items = initialItems;

  return (
    <div className="p-8 max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search knowledge base..." 
            className="input-field !pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="btn-primary gap-2 w-full sm:w-auto">
          <Plus size={16} />
          Add Article
        </button>
      </div>

      <div className="grid gap-4">
        {items.length === 0 && <p className="text-slate-400 text-center py-10">No articles found.</p>}
        {items.map((item: any) => (
          <div key={item.id} className="ledger-card p-5 group flex flex-col sm:flex-row gap-4 justify-between items-start">
            <div className="flex gap-4">
              <div className="mt-1 p-2 bg-white/5 rounded-lg text-brass border border-white/10 shrink-0">
                <FileText size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-brass/20 text-brass uppercase tracking-wider">{item.category}</span>
                  <span className="text-xs text-slate-500">Updated {new Date(item.updatedAt).toLocaleDateString()}</span>
                </div>
                <h3 className="text-lg font-medium text-white mb-2">{item.question}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.answer}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-2 rounded-lg bg-white/5 text-slate-300 hover:text-brass hover:bg-brass/10 transition-colors">
                <Edit2 size={16} />
              </button>
              <button className="p-2 rounded-lg bg-white/5 text-slate-300 hover:text-rust hover:bg-rust/10 transition-colors">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
