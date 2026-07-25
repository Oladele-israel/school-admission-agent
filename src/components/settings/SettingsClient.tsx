"use client";
import { useState } from "react";
import { Bell, Calendar, Shield, Save } from "lucide-react";

export default function SettingsClient({ initialSettings }: any) {
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState(initialSettings || {});

  const handleSave = async () => {
    setLoading(true);
    try {
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Reminders Section */}
      <section className="ledger-card p-6">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-line/10">
          <div className="p-2 bg-brass/20 text-brass rounded-lg"><Bell size={20} /></div>
          <div>
            <h2 className="text-xl font-semibold text-white">Automated Reminders</h2>
            <p className="text-sm text-slate-400">Configure when automated SMS/emails are sent.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-300">Incomplete Application Follow-ups (Days)</label>
            <input type="text" className="input-field" defaultValue="2, 5, 10" />
            <p className="text-xs text-slate-500">Comma-separated days after initial inquiry.</p>
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-300">Overdue Fee Reminders (Days)</label>
            <input type="text" className="input-field" defaultValue="1, 4, 8" />
            <p className="text-xs text-slate-500">Comma-separated days after due date.</p>
          </div>
        </div>
      </section>

      {/* Tour Windows Section */}
      <section className="ledger-card p-6">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-line/10">
          <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg"><Calendar size={20} /></div>
          <div>
            <h2 className="text-xl font-semibold text-white">Tour Scheduling</h2>
            <p className="text-sm text-slate-400">Define available windows for campus tours.</p>
          </div>
        </div>
        
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4">
          <div className="flex-1">
            <div className="text-sm font-medium text-white mb-1">Standard Window</div>
            <div className="text-xs text-slate-400">Monday - Friday • 09:00 AM - 03:00 PM</div>
          </div>
          <button className="btn-secondary text-xs py-1.5 px-4">Edit</button>
        </div>
      </section>

      {/* Routing Section */}
      <section className="ledger-card p-6">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-line/10">
          <div className="p-2 bg-rust/20 text-rust rounded-lg"><Shield size={20} /></div>
          <div>
            <h2 className="text-xl font-semibold text-white">Escalation Routing</h2>
            <p className="text-sm text-slate-400">Manage how AI escalates specific intents to humans.</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between py-2 border-b border-white/5">
            <div>
              <div className="text-sm font-medium text-white">Fee Negotiation</div>
              <div className="text-xs text-slate-400">Routes to Bursar</div>
            </div>
            <select className="input-field !w-auto !py-1.5 text-sm">
              <option>BURSAR</option>
              <option>ADMISSIONS_OFFICER</option>
            </select>
          </div>
          <div className="flex items-center justify-between py-2">
            <div>
              <div className="text-sm font-medium text-white">Complaints</div>
              <div className="text-xs text-slate-400">Routes to Admissions Officer</div>
            </div>
            <select className="input-field !w-auto !py-1.5 text-sm">
              <option>ADMISSIONS_OFFICER</option>
              <option>BURSAR</option>
            </select>
          </div>
        </div>
      </section>

      {/* Actions */}
      <div className="flex justify-end pt-4 pb-12">
        <button onClick={handleSave} className="btn-primary gap-2 w-full md:w-auto">
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              Saving changes...
            </span>
          ) : (
            <>
              <Save size={16} />
              Save Configuration
            </>
          )}
        </button>
      </div>
    </div>
  );
}
