"use client";
import { Search, Send, Phone, Mail, MoreVertical } from "lucide-react";
import { useState } from "react";

export default function InboxClient({ initialApplicants = [], currentUserLabel }: any) {
  const [activeChat, setActiveChat] = useState<string | null>(initialApplicants[0]?.id || null);
  const contacts = initialApplicants;

  const activeContact = contacts.find((c: any) => c.id === activeChat);

  return (
    <div className="h-full flex overflow-hidden bg-paper/30 animate-in fade-in duration-500">
      {/* Sidebar */}
      <div className="w-80 border-r border-line/20 flex flex-col bg-white/5 backdrop-blur-md">
        <div className="p-4 border-b border-line/10">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input type="text" placeholder="Search messages..." className="input-field !pl-9 !py-2 !rounded-full !bg-black/20" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {contacts.length === 0 && <p className="text-xs text-slate-500 text-center mt-4">No conversations</p>}
          {contacts.map((c: any) => {
            const isActive = activeChat === c.id;
            const time = new Date(c.lastMessageAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            return (
              <button 
                key={c.id} 
                onClick={() => setActiveChat(c.id)}
                className={`w-full text-left p-3 rounded-xl transition-all flex items-center gap-3 ${isActive ? 'bg-brass/20 border border-brass/30' : 'hover:bg-white/5 border border-transparent'}`}
              >
                <div className="relative shrink-0">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${isActive ? 'bg-brass text-white' : 'bg-slate-700 text-slate-200'}`}>
                    {c.parentName?.charAt(0) || "U"}
                  </div>
                  {c.hasOpenEscalation && <div className="absolute bottom-0 right-0 w-3 h-3 bg-rust border-2 border-paper rounded-full"></div>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-0.5">
                    <span className={`text-sm font-medium truncate ${isActive ? 'text-white' : 'text-slate-200'}`}>{c.parentName}</span>
                    <span className="text-[10px] text-slate-400 shrink-0 ml-2">{time}</span>
                  </div>
                  <p className="text-xs text-slate-400 truncate">{c.lastMessage}</p>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {!activeContact ? (
          <div className="flex-1 flex items-center justify-center text-slate-500">Select a conversation</div>
        ) : (
          <>
            {/* Chat Header */}
            <div className="h-16 border-b border-line/20 px-6 flex items-center justify-between bg-white/5 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-brass flex items-center justify-center font-medium text-white">
                  {activeContact.parentName.charAt(0)}
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-white">{activeContact.parentName}</h2>
                  <p className="text-xs text-slate-400">Child: {activeContact.childName || "N/A"} • Stage: {activeContact.stage}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg hover:bg-white/10 text-slate-300 transition-colors"><Phone size={18}/></button>
                <button className="p-2 rounded-lg hover:bg-white/10 text-slate-300 transition-colors"><Mail size={18}/></button>
                <button className="p-2 rounded-lg hover:bg-white/10 text-slate-300 transition-colors"><MoreVertical size={18}/></button>
              </div>
            </div>

            {/* Chat Messages Placeholder (Real messages require fetching) */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="flex justify-center"><span className="text-xs text-slate-500 bg-white/5 px-3 py-1 rounded-full">Recent</span></div>
              
              <div className="flex items-end gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-medium text-xs text-white">
                  {activeContact.parentName.charAt(0)}
                </div>
                <div className="bg-white/10 text-slate-200 p-3 rounded-2xl rounded-bl-sm max-w-[70%] text-sm">
                  {activeContact.lastMessage}
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-line/20 bg-white/5">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Type your message..." 
                  className="w-full bg-black/30 border border-white/10 rounded-full pl-5 pr-12 py-3 text-sm text-white focus:outline-none focus:border-brass transition-colors"
                  onKeyDown={async (e) => {
                    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                      const input = e.currentTarget;
                      const text = input.value;
                      input.value = '';
                      // Optimistic UI could go here
                      await fetch(`/api/conversations/${activeContact.id}/send`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ body: text })
                      });
                      // Normally we would append the message to the state here or refresh
                    }
                  }}
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-brass rounded-full flex items-center justify-center text-white hover:bg-violet-500 transition-colors shadow-lg">
                  <Send size={14} className="ml-0.5" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
