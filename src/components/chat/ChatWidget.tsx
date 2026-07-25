"use client";
import { useState } from "react";
import { Send, Bot } from "lucide-react";

export default function ChatWidget() {
  const [messages, setMessages] = useState([
    { id: '1', sender: 'agent', text: 'Hi there! I am the Admissions Assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;
    const currentInput = input;
    setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'parent', text: currentInput }]);
    setInput("");
    
    try {
      await fetch('/api/chat/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          sessionId: "test-session-123", 
          message: currentInput,
          parentName: "New Parent" // We hardcode for testing
        })
      });
      // Note: We don't push a simulated AI reply here anymore.
      // The AI reply will come back via the /api/webhooks/agent-reply 
      // when Make.com finishes processing!
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="ledger-card h-[500px] flex flex-col overflow-hidden bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl relative z-10">
      
      {/* Header */}
      <div className="p-4 border-b border-white/10 bg-white/5 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-brass flex items-center justify-center shadow-lg">
          <Bot size={20} className="text-white" />
        </div>
        <div>
          <h2 className="font-semibold text-white">Admissions Assistant</h2>
          <p className="text-xs text-emerald-400 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Online
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.sender === 'parent' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${m.sender === 'parent' ? 'bg-brass text-white rounded-br-sm' : 'bg-white/10 text-slate-200 rounded-bl-sm'}`}>
              {m.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/10 bg-white/5">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="w-full bg-black/50 border border-white/10 rounded-full pl-4 pr-12 py-3 text-sm text-white focus:outline-none focus:border-brass transition-all"
          />
          <button 
            onClick={handleSend}
            className="absolute right-2 w-8 h-8 bg-brass hover:bg-violet-500 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <Send size={14} className="ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
