"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Inbox, Book, ListTree, AlertCircle, CreditCard, Settings, LogOut } from "lucide-react";

export default function Sidebar({ user }: { user?: any }) {
  const pathname = usePathname();
  
  const navItems = [
    { name: "Inbox", href: "/inbox", icon: Inbox },
    { name: "Pipeline", href: "/pipeline", icon: ListTree },
    { name: "Escalations", href: "/escalations", icon: AlertCircle },
    { name: "Payments", href: "/bursar/payments", icon: CreditCard, role: "BURSAR" },
    { name: "Knowledge Base", href: "/knowledge-base", icon: Book },
    { name: "Settings", href: "/settings", icon: Settings, role: "ADMIN" },
  ];

  return (
    <aside className="w-[280px] h-screen bg-paper/50 backdrop-blur-xl border-r border-line/30 flex flex-col transition-all duration-300">
      {/* Brand area */}
      <div className="p-6 border-b border-line/20 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brass to-violet-600 flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.5)]">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
          </svg>
        </div>
        <span className="font-display font-bold text-lg tracking-tight text-white">Admissions<span className="text-brass">OS</span></span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 mt-2 px-3">Menu</div>
        {navItems.map((item) => {
          if (item.role && user?.role !== "ADMIN" && user?.role !== item.role) return null;
          
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative overflow-hidden ${
                isActive 
                  ? "bg-brass/10 text-white" 
                  : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
              }`}
            >
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-brass shadow-[0_0_10px_rgba(139,92,246,0.8)]"></div>
              )}
              <Icon size={18} className={isActive ? "text-brass" : "group-hover:text-brass transition-colors"} />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* User profile area */}
      <div className="p-4 border-t border-line/20">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm transition-colors hover:bg-white/10 cursor-pointer">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-slate-700 to-slate-600 flex items-center justify-center text-white font-semibold text-sm border border-slate-500/50">
            {user?.name?.charAt(0) || "U"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{user?.name || "User"}</p>
            <p className="text-xs text-slate-400 truncate">{user?.role?.replace("_", " ")}</p>
          </div>
          <Link href="/api/logout" className="text-slate-400 hover:text-rust transition-colors p-1" title="Sign out">
            <LogOut size={16} />
          </Link>
        </div>
      </div>
    </aside>
  );
}
