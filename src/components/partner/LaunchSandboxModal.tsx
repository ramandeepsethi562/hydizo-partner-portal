import React, { useState } from 'react';
import { usePortal } from '../../context/PortalContext';
import { X, Server, Cloud, Shield, CheckCircle, Sparkles } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  defaultDemoTitle?: string;
}

export const LaunchSandboxModal: React.FC<Props> = ({
  isOpen,
  onClose,
  defaultDemoTitle,
}) => {
  const { launchSandbox, demos } = usePortal();

  const [selectedDemo, setSelectedDemo] = useState(
    defaultDemoTitle || demos[0]?.title || 'Hydizo Shield SecOps: Live Ransomware Containment Sandbox'
  );
  const [clientName, setClientName] = useState('');
  const [cloudProvider, setCloudProvider] = useState<'AWS' | 'GCP' | 'Azure'>('AWS');
  const [duration, setDuration] = useState('14-Day Free POC');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim()) return;

    launchSandbox(selectedDemo, clientName, duration);
    onClose();
    setClientName('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-800/60 flex items-center justify-center text-cyan-400">
              <Server className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Provision Dedicated Demo Sandbox</h3>
              <p className="text-[11px] text-slate-400">Live isolated customer trial environment</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Select Demo / Sandbox Scenario
            </label>
            <select
              value={selectedDemo}
              onChange={(e) => setSelectedDemo(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              {demos
                .filter((d) => d.sandboxAvailable)
                .map((d) => (
                  <option key={d.id} value={d.title}>
                    {d.title}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Prospective Client Name *
            </label>
            <input
              type="text"
              required
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="e.g. Apex Health Systems"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Simulated Target Cloud
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['AWS', 'GCP', 'Azure'] as const).map((cloud) => (
                <button
                  key={cloud}
                  type="button"
                  onClick={() => setCloudProvider(cloud)}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all text-center flex items-center justify-center gap-1.5 ${
                    cloudProvider === cloud
                      ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <Cloud className="w-3.5 h-3.5" />
                  <span>{cloud}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Sandbox License Window
            </label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              <option value="7-Day Quick Evaluation">7-Day Quick Evaluation</option>
              <option value="14-Day Free POC">14-Day Free POC (Recommended)</option>
              <option value="30-Day Enterprise Pilot">30-Day Enterprise Pilot</option>
            </select>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-[11px] text-slate-400 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <span>
              Pre-loaded with realistic synthetic enterprise workloads and zero-configuration telemetry agents.
            </span>
          </div>

          <div className="pt-2 border-t border-slate-800 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs transition-all shadow-md shadow-cyan-600/20"
            >
              Launch Sandbox
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
