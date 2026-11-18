import React, { useState } from 'react';
import { usePortal } from '../../context/PortalContext';
import {
  ShieldCheck,
  Building2,
  Lock,
  Mail,
  KeyRound,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Users,
  ShieldAlert,
  HelpCircle,
} from 'lucide-react';
import { PortalRole } from '../../types';

export const LoginPage: React.FC = () => {
  const { login, showToast } = usePortal();

  const [selectedRole, setSelectedRole] = useState<PortalRole>('partner');
  const [email, setEmail] = useState('alex@apexcloud.io');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      login(email, password, selectedRole);
      setIsSubmitting(false);
    }, 600);
  };

  const handleQuickLogin = (demoEmail: string, demoRole: PortalRole) => {
    setEmail(demoEmail);
    setSelectedRole(demoRole);
    setPassword('demoPass2026!');
    setIsSubmitting(true);
    setTimeout(() => {
      login(demoEmail, 'demoPass2026!', demoRole);
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
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

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
                Access Gate
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Enterprise Cloud &amp; Security Ecosystem
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
          <span>SSO / FIDO2 Active</span>
        </div>
      </header>

      {/* Center Main Login Card */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 z-10">
        <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative">
          {/* Role Mode Selector Tab */}
          <div className="flex bg-slate-950 p-1.5 rounded-2xl border border-slate-800/80 mb-6">
            <button
              type="button"
              onClick={() => {
                setSelectedRole('partner');
                setEmail('alex@apexcloud.io');
              }}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                selectedRole === 'partner'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Partner Login</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedRole('admin');
                setEmail('admin@hydizo.com');
              }}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                selectedRole === 'admin'
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md shadow-purple-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Admin Portal Login</span>
            </button>
          </div>

          <div className="mb-6">
            <h1 className="text-xl font-bold text-white">
              {selectedRole === 'partner' ? 'Sign in to Partner Portal' : 'Hydizo Channel Ops Console'}
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              {selectedRole === 'partner'
                ? 'Access registered deals, pricing margins, demo sandboxes, and dedicated POC line.'
                : 'Hydizo Channel Operations & Alliance Management authentication portal.'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Work Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
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
                <span>Remember this workstation</span>
              </label>

              <span className="text-[11px] text-emerald-400 font-medium">SSL Encrypted</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 rounded-xl font-bold text-xs transition-all shadow-lg flex items-center justify-center gap-2 ${
                selectedRole === 'admin'
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white shadow-purple-900/30'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-cyan-900/30'
              } disabled:opacity-50`}
            >
              {isSubmitting ? (
                <span>Authenticating Identity...</span>
              ) : (
                <>
                  <span>Sign In to {selectedRole === 'admin' ? 'Admin Ops' : 'Partner Portal'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Demo One-Click Access Cards */}
          <div className="mt-6 pt-5 border-t border-slate-800/80">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
              Quick Test Demo Credentials:
            </span>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => handleQuickLogin('alex@apexcloud.io', 'partner')}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800/60 transition-all text-left flex items-center justify-between group"
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white group-hover:text-cyan-300">Alex Rivera</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
                      Gold Partner (Apex)
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">alex@apexcloud.io</span>
                </div>
                <span className="text-[11px] text-cyan-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  1-Click <ArrowRight className="w-3 h-3" />
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('admin@hydizo.com', 'admin')}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/50 hover:bg-slate-800/60 transition-all text-left flex items-center justify-between group"
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white group-hover:text-purple-300">Elena Rostova</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 font-semibold">
                      Admin (Channel Ops)
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">admin@hydizo.com</span>
                </div>
                <span className="text-[11px] text-purple-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  1-Click <ArrowRight className="w-3 h-3" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2 border-t border-slate-900 z-10">
        <div>© 2026 Hydizo Inc. All rights reserved. Zero-Trust Access Protected.</div>
        <div className="flex items-center gap-4 text-[11px]">
          <span>SOC 2 Type II Certified</span>
          <span>•</span>
          <span>ISO 27001</span>
          <span>•</span>
          <span>FIDO2 WebAuthn Ready</span>
        </div>
      </footer>
    </div>
  );
};
