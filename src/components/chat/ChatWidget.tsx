"use client";
import { useState, useEffect } from "react";
import { Send, Bot } from "lucide-react";

export default function ChatWidget() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [sessionId] = useState(() => "session-" + Math.random().toString(36).substring(2, 9));

  // Poll for new messages every 3 seconds
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(`/api/chat/${sessionId}/messages`);
        if (res.ok) {
          const data = await res.json();
          if (data.messages && data.messages.length > 0) {
            setMessages(
              data.messages.map((m: any) => ({
                id: m.id,
                sender: m.sender,
                text: m.body,
              }))
            );
          }
        }
      } catch (e) {
        console.error("Polling error", e);
      }
    };

    fetchMessages(); // fetch immediately
    const interval = setInterval(fetchMessages, 3000); // then every 3s
    return () => clearInterval(interval);
  }, [sessionId]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const currentInput = input;
    // Optimistically add to UI
    setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'parent', text: currentInput }]);
    setInput("");

    try {
      await fetch('/api/chat/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: sessionId,
          message: currentInput,
          parentName: "Parent-" + sessionId.slice(-4) // Random name
        })
      });
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
        {messages.map((m) => {
          // Parse URLs and make them clickable
          const textWithLinks = m.text.replace(
            /(https?:\/\/[^\s]+)/g,
            '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:text-blue-300 underline">$1</a>'
          );

          return (
            <div key={m.id} className={`flex ${m.sender === 'parent' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[80%] p-3 rounded-2xl text-sm ${m.sender === 'parent' ? 'bg-brass text-white rounded-br-sm' : 'bg-white/10 text-slate-200 rounded-bl-sm'}`}
                dangerouslySetInnerHTML={{ __html: textWithLinks }}
              />
            </div>
          );
        })}
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
