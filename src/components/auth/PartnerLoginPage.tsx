import React, { useState } from 'react';
import { usePortal } from '../../context/PortalContext';
import {
  ShieldCheck,
  Building2,
  Mail,
  KeyRound,
  Eye,
  EyeOff,
  ArrowRight,
  Lock,
} from 'lucide-react';

interface Props {
  onGoToAdmin: () => void;
}

export const PartnerLoginPage: React.FC<Props> = ({ onGoToAdmin }) => {
  const { login, showToast } = usePortal();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      login(email, password, 'partner');
      setIsSubmitting(false);
    }, 500);
  };

  const handleQuickLogin = (partnerEmail: string) => {
    setEmail(partnerEmail);
    setPassword('demoPass2026!');
    setIsSubmitting(true);
    setTimeout(() => {
      login(partnerEmail, 'demoPass2026!', 'partner');
      setIsSubmitting(false);
    }, 400);
  };

  const handleForgotPassword = () => {
    showToast(
      'Password Reset Link Dispatched',
      `A zero-trust cryptographic reset link was sent to ${email || 'your email'}.`,
      'info'
    );
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col justify-between selection:bg-cyan-500/30 selection:text-cyan-200 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Header */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 ring-1 ring-cyan-400/30">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-cyan-300 bg-clip-text text-transparent">
                HYDIZO
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-400 border border-cyan-800/50 uppercase tracking-wider">
                Partner Portal
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Enterprise Channel &amp; Alliance Partner Ecosystem
            </p>
          </div>
        </div>

        <button
          onClick={onGoToAdmin}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-purple-600/50 hover:bg-slate-800 text-slate-400 hover:text-purple-300 text-xs font-semibold transition-all"
        >
          <Lock className="w-3.5 h-3.5 text-purple-400" />
          <span>Hydizo Staff Admin Gate</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </header>

      {/* Main Login Card */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 z-10">
        <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/50 text-cyan-400 text-xs font-semibold mb-3">
              <Building2 className="w-3.5 h-3.5" />
              <span>Authorized Channel Partners Only</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Sign in to Partner Portal
            </h1>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              Access registered client deals, protected pricing margins, demo sandboxes, and your dedicated Hydizo POC line.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Partner Work Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@partnercompany.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-semibold text-slate-300">
                  Password
                </label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-[11px] text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <KeyRound className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors font-mono"
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

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-400 hover:text-slate-200">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded bg-slate-950 border-slate-800 text-cyan-500 focus:ring-0 cursor-pointer"
                />
                <span>Remember this session</span>
              </label>

              <span className="text-[11px] text-emerald-400 font-medium">SSL Encrypted</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl font-bold text-xs transition-all shadow-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-cyan-900/30 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Verifying Partner Credentials...</span>
              ) : (
                <>
                  <span>Sign In to Partner Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Partner Demo Profiles for All Tiers */}
          <div className="mt-6 pt-5 border-t border-slate-800/80">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
              1-Click Demo Partner Access (Select Tier):
            </span>
            <div className="space-y-2">
              {/* Platinum Tier Card */}
              <button
                type="button"
                onClick={() => handleQuickLogin('marcus@cybernova.com')}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/60 hover:bg-slate-800/60 transition-all text-left flex items-center justify-between group"
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white group-hover:text-purple-300">Marcus Vance</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold">
                      Platinum Tier (35% Margin)
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400">CyberNova Technologies • marcus@cybernova.com</span>
                </div>
                <span className="text-[11px] text-purple-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Enter <ArrowRight className="w-3 h-3" />
                </span>
              </button>

              {/* Gold Tier Card */}
              <button
                type="button"
                onClick={() => handleQuickLogin('alex@apexcloud.io')}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/60 hover:bg-slate-800/60 transition-all text-left flex items-center justify-between group"
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white group-hover:text-amber-300">Alex Rivera</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                      Gold Tier (28% Margin)
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400">Apex Cloud Solutions • alex@apexcloud.io</span>
                </div>
                <span className="text-[11px] text-amber-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Enter <ArrowRight className="w-3 h-3" />
                </span>
              </button>

              {/* Silver Tier Card */}
              <button
                type="button"
                onClick={() => handleQuickLogin('priya@nexusdigital.net')}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-500/60 hover:bg-slate-800/60 transition-all text-left flex items-center justify-between group"
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white group-hover:text-slate-200">Priya Sharma</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 border border-slate-600 font-bold">
                      Silver Tier (22% Margin)
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400">Nexus Digital Systems • priya@nexusdigital.net</span>
                </div>
                <span className="text-[11px] text-slate-300 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Enter <ArrowRight className="w-3 h-3" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2 border-t border-slate-900 z-10">
        <div>© 2026 Hydizo Inc. Partner Ecosystem Network.</div>
        <div className="flex items-center gap-2">
          <span>Are you Hydizo Internal Staff?</span>
          <button
            onClick={onGoToAdmin}
            className="text-purple-400 hover:text-purple-300 font-semibold underline underline-offset-2"
          >
            Access Channel Operations Admin Gate
          </button>
        </div>
      </footer>
    </div>
  );
};
