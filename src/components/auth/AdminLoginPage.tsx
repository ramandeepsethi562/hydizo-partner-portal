import React, { useState } from 'react';
import { usePortal } from '../../context/PortalContext';
import {
  ShieldAlert,
  Lock,
  Mail,
  KeyRound,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  ChevronLeft,
  Users,
} from 'lucide-react';

interface Props {
  onGoToPartner: () => void;
}

export const AdminLoginPage: React.FC<Props> = ({ onGoToPartner }) => {
  const { login, showToast } = usePortal();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      login(email, password, 'admin');
      setIsSubmitting(false);
    }, 500);
  };

  const handleQuickAdminLogin = () => {
    setEmail('admin@hydizo.com');
    setPassword('adminSecurity2026!');
    setIsSubmitting(true);
    setTimeout(() => {
      login('admin@hydizo.com', 'adminSecurity2026!', 'admin');
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#06070f] text-slate-100 flex flex-col justify-between selection:bg-purple-500/30 selection:text-purple-200 relative overflow-hidden">
      {/* Ambient purple glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Header */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/20 ring-1 ring-purple-400/30">
            <Lock className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-purple-100 to-indigo-300 bg-clip-text text-transparent">
                HYDIZO
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800 uppercase tracking-wider">
                Internal Ops Gate
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Global Channel Operations &amp; Partner Management
            </p>
          </div>
        </div>

        <button
          onClick={onGoToPartner}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white text-xs font-semibold transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Return to Partner Portal Login</span>
        </button>
      </header>

      {/* Main Admin Login Card */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 z-10">
        <div className="w-full max-w-md bg-slate-900/90 border border-purple-900/40 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-800/40 text-rose-300 text-xs font-semibold mb-3">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
              <span>Restricted • Hydizo Personnel Only</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Channel Operations Admin
            </h1>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              Authenticate with your internal enterprise credentials to manage partner tiers, approve deals, and issue global promotional coupons.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Staff Corporate Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@hydizo.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Internal Security Passcode
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500 transition-colors font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1 text-slate-400">
              <span className="text-[11px] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>2FA / WebAuthn Enforced</span>
              </span>
              <span className="text-[11px] font-mono text-purple-300">Audited IP Session</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl font-bold text-xs transition-all shadow-lg bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-purple-900/40 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Validating Staff Tokens...</span>
              ) : (
                <>
                  <span>Sign In to Channel Ops Admin</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Admin Demo Access */}
          <div className="mt-6 pt-5 border-t border-slate-800/80">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
              1-Click Internal Staff Access:
            </span>
            <button
              type="button"
              onClick={handleQuickAdminLogin}
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/50 hover:bg-slate-800/60 transition-all text-left flex items-center justify-between group"
            >
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-white group-hover:text-purple-300">Elena Rostova</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 font-semibold">
                    VP of Channels &amp; Ecosystem
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">admin@hydizo.com • Full Ops Clearance</span>
              </div>
              <span className="text-[11px] text-purple-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Enter <ArrowRight className="w-3 h-3" />
              </span>
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2 border-t border-slate-900 z-10">
        <div>© 2026 Hydizo Global HQ. Internal Security Compliance.</div>
        <button
          onClick={onGoToPartner}
          className="text-cyan-400 hover:text-cyan-300 font-semibold underline underline-offset-2"
        >
          ← Looking for Partner Portal? Sign In Here
        </button>
      </footer>
    </div>
  );
};
