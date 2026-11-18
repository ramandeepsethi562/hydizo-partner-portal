import React, { useState } from 'react';
import { usePortal } from '../../context/PortalContext';
import {
  ShieldCheck,
  Building2,
  Lock,
  ChevronDown,
  Sparkles,
  PhoneCall,
  Bell,
  CheckCircle,
  Video,
  Search,
  Command,
  LogOut,
  User,
  Shield,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    user,
    logout,
    role,
    currentPartner,
    setCurrentPartner,
    partners,
    pocs,
    deals,
    setIsCommandPaletteOpen,
    setActiveVideoCallPOC,
  } = usePortal();

  const [partnerDropdownOpen, setPartnerDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const assignedPAM = pocs.find((p) => p.id === currentPartner.assignedPOCId) || pocs[0];
  const pendingDealsCount = deals.filter((d) => d.status === 'Pending Review').length;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand & Platform Badge */}
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg ring-1 ${
              role === 'admin'
                ? 'bg-gradient-to-tr from-indigo-500 via-purple-600 to-pink-600 shadow-purple-500/20 ring-purple-400/30'
                : 'bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 shadow-cyan-500/20 ring-cyan-400/30'
            }`}
          >
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-cyan-300 bg-clip-text text-transparent">
                HYDIZO
              </span>
              <span
                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border uppercase tracking-wider ${
                  role === 'admin'
                    ? 'bg-purple-950/80 text-purple-300 border-purple-800/60'
                    : 'bg-cyan-950/80 text-cyan-400 border-cyan-800/50'
                }`}
              >
                {role === 'admin' ? 'Channel Admin Center' : 'Partner Portal'}
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              {role === 'admin' ? 'Internal Channel Operations & Alliances' : 'Enterprise Partner Enablement & Margins'}
            </p>
          </div>
        </div>

        {/* Global Search / Command Palette Trigger */}
        <button
          onClick={() => setIsCommandPaletteOpen(true)}
          className="hidden md:flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 text-xs transition-all w-60 lg:w-72"
        >
          <Search className="w-3.5 h-3.5 text-slate-500" />
          <span className="flex-1 text-left truncate">
            {role === 'admin' ? 'Search partners, coupons, deals...' : 'Search products, coupons, POC...'}
          </span>
          <kbd className="text-[10px] bg-slate-950 px-1.5 py-0.5 rounded text-slate-500 font-mono border border-slate-800">
            Ctrl+K
          </kbd>
        </button>

        {/* Center: Dedicated Info Badge (NO Switcher for Partners) */}
        {role === 'partner' ? (
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
            <Building2 className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-slate-200 font-semibold">{currentPartner.name}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
              {currentPartner.tier} Tier ({currentPartner.commissionRate}% Margin)
            </span>
          </div>
        ) : (
          <div className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-indigo-950/60 border border-indigo-800/50 text-xs shadow-inner">
            <Lock className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-white font-bold">Channel Operations Admin Console</span>
            {pendingDealsCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[10px] font-bold">
                {pendingDealsCount} Pending Deals
              </span>
            )}
          </div>
        )}

        {/* Right Action Cluster */}
        <div className="flex items-center gap-3">
          {/* Partner Organization Selector (When in partner view) */}
          {role === 'partner' && (
            <div className="relative">
              <button
                onClick={() => setPartnerDropdownOpen(!partnerDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs text-slate-200 hover:text-white transition-all shadow-sm"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-medium max-w-[130px] truncate">{currentPartner.name}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
                  {currentPartner.tier}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {partnerDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setPartnerDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 z-40 animate-fade-in">
                    <div className="px-3 py-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800/80">
                      Active Partner Organization
                    </div>
                    <div className="mt-1 space-y-1">
                      {partners.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => {
                            setCurrentPartner(p);
                            setPartnerDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors ${
                            currentPartner.id === p.id
                              ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30'
                              : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                          }`}
                        >
                          <div className="text-left">
                            <p className="font-medium">{p.name}</p>
                            <p className="text-[10px] text-slate-400">{p.region}</p>
                          </div>
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                              p.tier === 'Platinum'
                                ? 'bg-purple-950 text-purple-300 border border-purple-800'
                                : p.tier === 'Gold'
                                ? 'bg-amber-950 text-amber-300 border border-amber-800'
                                : 'bg-slate-800 text-slate-300'
                            }`}
                          >
                            {p.tier}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Quick POC Hotline (Partner View only) */}
          {role === 'partner' && (
            <div className="hidden lg:flex items-center gap-1.5">
              <button
                onClick={() => setActiveVideoCallPOC(assignedPAM)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/50 hover:bg-cyan-900/60 border border-cyan-700/50 text-cyan-300 text-xs font-semibold transition-all group"
                title="Launch instant live Video Room with Sarah Jenkins"
              >
                <Video className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span>Call POC</span>
              </button>
            </div>
          )}

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
              title="Recent Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-cyan-400" />
            </button>

            {notificationsOpen && (
              <>
                <div
                  className="fixed inset-0 z-30"
                  onClick={() => setNotificationsOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-3 z-40">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      {role === 'admin' ? 'Channel Admin Alerts' : 'Partner Ecosystem Updates'}
                    </span>
                    <span className="text-[10px] text-cyan-400">Live</span>
                  </div>
                  <div className="mt-2 space-y-2.5 max-h-64 overflow-y-auto">
                    <div className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/50 text-xs">
                      <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                        <CheckCircle className="w-3.5 h-3.5" /> Deal Protection Approved
                      </div>
                      <p className="text-slate-300 text-[11px] mt-1">
                        Global FinStream Capital deal registration locked for 90 days.
                      </p>
                      <span className="text-[9px] text-slate-500">2 hours ago</span>
                    </div>

                    <div className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/50 text-xs">
                      <div className="flex items-center gap-1.5 text-cyan-400 font-semibold">
                        <Sparkles className="w-3.5 h-3.5" /> Q4 Spiff Incentive Active
                      </div>
                      <p className="text-slate-300 text-[11px] mt-1">
                        Hydizo Shield SecOps partner margins increased to 35% through Dec 31.
                      </p>
                      <span className="text-[9px] text-slate-500">Yesterday</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* User profile dropdown & Sign out */}
          <div className="relative pl-2 border-l border-slate-800">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-900 transition-colors"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ring-1 ${
                  role === 'admin'
                    ? 'bg-gradient-to-tr from-purple-600 to-indigo-700 ring-purple-500/40'
                    : 'bg-gradient-to-tr from-cyan-600 to-blue-700 ring-cyan-500/40'
                }`}
              >
                {user ? user.name.split(' ').map((n) => n[0]).join('') : 'U'}
              </div>
              <div className="hidden xl:block text-left">
                <p className="text-xs font-semibold text-white">
                  {user?.name || (role === 'admin' ? 'Elena Rostova' : 'Alex Rivera')}
                </p>
                <p className="text-[10px] text-slate-400">
                  {user?.companyName || (role === 'admin' ? 'Hydizo Global HQ' : currentPartner.name)}
                </p>
              </div>
              <ChevronDown className="w-3 h-3 text-slate-400 hidden xl:block" />
            </button>

            {userMenuOpen && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setUserMenuOpen(false)} />
                <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-2 z-40 animate-fade-in">
                  <div className="px-3 py-2 border-b border-slate-800">
                    <p className="text-xs font-bold text-white">{user?.name || 'Authorized User'}</p>
                    <p className="text-[10px] text-slate-400 font-mono truncate">{user?.email}</p>
                    <span
                      className={`inline-block text-[9px] uppercase font-bold px-1.5 py-0.2 rounded border mt-1 ${
                        role === 'admin'
                          ? 'bg-purple-950 text-purple-300 border-purple-800'
                          : 'bg-cyan-950 text-cyan-300 border-cyan-800'
                      }`}
                    >
                      {role === 'admin' ? 'Admin Access' : `${currentPartner.tier} Partner Tier`}
                    </span>
                  </div>

                  <div className="mt-1 pt-1">
                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
