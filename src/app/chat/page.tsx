import ChatWidget from "@/components/chat/ChatWidget";

export const metadata = { title: "Chat with us — Admissions" };

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-paper flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brass/20 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-md shadow-xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brass">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
              <path d="M6 12v5c3 3 9 3 12 0v-5"/>
            </svg>
          </div>
          <h1 className="font-display text-3xl font-bold text-white tracking-tight mb-2">Ask us anything</h1>
          <p className="text-sm text-slate-400">Tours, applications, fees — we usually reply in under a minute.</p>
        </div>
        <ChatWidget />
      </div>
    </div>
  );
}
