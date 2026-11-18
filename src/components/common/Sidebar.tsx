import React from 'react';
import { usePortal } from '../../context/PortalContext';
import {
  LayoutDashboard,
  Box,
  FolderGit2,
  PhoneCall,
  TicketPercent,
  Users,
  ShieldAlert,
  BarChart3,
  BadgePercent,
  Sparkles,
  ExternalLink,
  LifeBuoy,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { role, activeTab, setActiveTab, currentPartner, coupons, deals } = usePortal();

  const partnerNavItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: undefined,
    },
    {
      id: 'products',
      label: 'Products & Pricing',
      icon: Box,
      badge: '5 Suites',
    },
    {
      id: 'resources',
      label: 'Resources & Demos',
      icon: FolderGit2,
      badge: 'New Sandbox',
    },
    {
      id: 'contact-poc',
      label: 'Contact Your POC',
      icon: PhoneCall,
      badge: 'Online',
    },
    {
      id: 'coupons-deals',
      label: 'Coupons & Deals',
      icon: TicketPercent,
      badge: `${coupons.filter((c) => c.status === 'active' && (c.partnerId === currentPartner.id || c.partnerId === 'GLOBAL')).length} Active`,
    },
  ];

  const adminNavItems = [
    {
      id: 'admin-dashboard',
      label: 'Admin Overview',
      icon: BarChart3,
      badge: undefined,
    },
    {
      id: 'admin-partners',
      label: 'Manage Partners',
      icon: Users,
      badge: '5 Active',
    },
    {
      id: 'admin-coupons',
      label: 'Partner Coupons',
      icon: BadgePercent,
      badge: `${coupons.length} Total`,
    },
    {
      id: 'admin-deals',
      label: 'Deal Registrations',
      icon: ShieldAlert,
      badge: `${deals.filter((d) => d.status === 'Pending Review').length} Pending`,
    },
  ];

  const navItems = role === 'admin' ? adminNavItems : partnerNavItems;

  return (
    <aside className="w-64 shrink-0 bg-slate-950/70 border-r border-slate-800/80 p-4 flex flex-col justify-between hidden md:flex min-h-[calc(100vh-4rem)]">
      <div className="space-y-6">
        {/* Navigation Category Label */}
        <div className="px-3 pt-2">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            {role === 'admin' ? 'Channel Admin Center' : 'Partner Portal Navigation'}
          </p>
        </div>

        {/* Navigation List */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 group ${
                  isActive
                    ? role === 'admin'
                      ? 'bg-gradient-to-r from-indigo-900/60 to-purple-900/60 text-white border border-indigo-700/50 shadow-md shadow-indigo-950/40'
                      : 'bg-gradient-to-r from-cyan-950/80 to-blue-950/80 text-cyan-300 border border-cyan-700/50 shadow-md shadow-cyan-950/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive
                        ? role === 'admin'
                          ? 'text-purple-300'
                          : 'text-cyan-400'
                        : 'text-slate-500 group-hover:text-slate-300'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      isActive
                        ? role === 'admin'
                          ? 'bg-purple-900/80 text-purple-200 border border-purple-700/50'
                          : 'bg-cyan-900/80 text-cyan-200 border border-cyan-700/50'
                        : 'bg-slate-900 text-slate-400 border border-slate-800'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Context Card */}
      <div className="pt-4 border-t border-slate-800/80 space-y-3">
        {role === 'partner' ? (
          <div className="p-3.5 rounded-xl bg-gradient-to-b from-slate-900 to-slate-900/60 border border-slate-800 relative overflow-hidden">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                {currentPartner.tier} Tier
              </span>
              <span className="text-[11px] text-emerald-400 font-bold">
                {currentPartner.commissionRate}% Margin
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-snug">
              Annual Channel Revenue: ${(currentPartner.totalRevenue / 1000).toFixed(0)}k / $1M to Platinum
            </p>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-cyan-400 to-amber-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (currentPartner.totalRevenue / 1000000) * 100)}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="p-3.5 rounded-xl bg-gradient-to-b from-slate-900 to-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-2 text-xs font-semibold text-purple-300 mb-1">
              <LifeBuoy className="w-3.5 h-3.5 text-purple-400" />
              <span>Admin SLA Monitor</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Avg Deal Review Time: <strong className="text-white">4.2 hours</strong>
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              Co-Op Fund Allocation: <strong className="text-emerald-400">$82,000 / $150k</strong>
            </p>
          </div>
        )}

        <div className="text-[11px] text-slate-500 text-center flex items-center justify-center gap-1">
          <span>Hydizo v4.8 Enterprise</span>
          <span>•</span>
          <span className="text-emerald-400 font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-ping" />
            Live
          </span>
        </div>
      </div>
    </aside>
  );
};
