import React, { useState } from 'react';
import { usePortal } from '../../context/PortalContext';
import {
  BarChart3,
  DollarSign,
  Users,
  ShieldCheck,
  BadgePercent,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  PlusCircle,
  ArrowUpRight,
  Sparkles,
  Layers,
  ChevronRight,
  Globe,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { CreateCouponModal } from './CreateCouponModal';
import { AddPartnerModal } from './AddPartnerModal';
import { ECOSYSTEM_GROWTH_DATA } from '../../data/mockData';

export const AdminDashboard: React.FC = () => {
  const {
    partners,
    deals,
    coupons,
    mdfRequests,
    updateDealStatus,
    updateMDFStatus,
    setActiveTab,
  } = usePortal();

  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);

  // Compute metrics
  const totalEcosystemARR = partners.reduce((sum, p) => sum + p.totalRevenue, 0);
  const totalPipeline = deals.reduce((sum, d) => sum + d.estimatedValue, 0);
  const activeCouponsCount = coupons.filter((c) => c.status === 'active').length;
  const pendingDeals = deals.filter((d) => d.status === 'Pending Review');
  const pendingMDF = mdfRequests.filter((m) => m.status === 'Pending Review');

  const tierCounts = {
    Platinum: partners.filter((p) => p.tier === 'Platinum').length,
    Gold: partners.filter((p) => p.tier === 'Gold').length,
    Silver: partners.filter((p) => p.tier === 'Silver').length,
    Registered: partners.filter((p) => p.tier === 'Registered').length,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 p-6 shadow-xl">
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <BarChart3 className="w-3.5 h-3.5 text-indigo-400" />
                Global Channel Command
              </span>
              <span className="text-xs text-slate-400">All Regions &amp; Tiers</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Hydizo Partner Ecosystem &amp; Coupon Operations
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Oversee {partners.length} partner organizations, approve deal registrations with margin guarantees, and distribute co-op promotional coupon codes.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCouponModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-semibold text-xs transition-all shadow-md shadow-purple-600/30 flex items-center gap-1.5"
            >
              <BadgePercent className="w-4 h-4" />
              <span>Issue New Coupon</span>
            </button>
            <button
              onClick={() => setIsPartnerModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 border border-slate-700"
            >
              <Users className="w-4 h-4 text-cyan-400" />
              <span>Onboard Partner</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Total Ecosystem Revenue
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-950 text-emerald-400 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-white font-mono">
              ${(totalEcosystemARR).toLocaleString()}
            </span>
          </div>
          <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +34% YoY Channel Growth
          </p>
        </div>

        {/* Metric 2 */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Active Partner Accounts
            </span>
            <div className="w-8 h-8 rounded-lg bg-indigo-950 text-indigo-400 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-white font-mono">
              {partners.length}
            </span>
            <span className="text-xs text-slate-400">organizations</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            {tierCounts.Platinum} Platinum • {tierCounts.Gold} Gold • {tierCounts.Silver} Silver
          </p>
        </div>

        {/* Metric 3 */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Total Channel Pipeline
            </span>
            <div className="w-8 h-8 rounded-lg bg-cyan-950 text-cyan-400 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-white font-mono">
              ${(totalPipeline).toLocaleString()}
            </span>
          </div>
          <p className="text-[11px] text-cyan-400 mt-1">
            {deals.length} deals in active stages
          </p>
        </div>

        {/* Metric 4 */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Live Partner Coupons
            </span>
            <div className="w-8 h-8 rounded-lg bg-purple-950 text-purple-400 flex items-center justify-center">
              <BadgePercent className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-white font-mono">
              {activeCouponsCount}
            </span>
            <span className="text-xs text-slate-400">active campaigns</span>
          </div>
          <p className="text-[11px] text-purple-300 mt-1">
            {coupons.reduce((sum, c) => sum + c.usageCount, 0)} total redemptions logged
          </p>
        </div>
      </div>

      {/* ARR Growth Visual Chart Row */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-indigo-400" />
              Global Partner Ecosystem ARR Trajectory
            </h3>
            <p className="text-xs text-slate-400">
              Aggregated monthly contracted recurring revenue across all authorized partners ($ Millions)
            </p>
          </div>
          <div className="text-right">
            <span className="text-sm font-bold text-emerald-400 font-mono">$14.2M Current</span>
          </div>
        </div>

        <div className="h-60 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={ECOSYSTEM_GROWTH_DATA}>
              <defs>
                <linearGradient id="colorArr" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={11} tickLine={false} tickFormatter={(val) => `$${val}M`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '0.75rem',
                  fontSize: '11px',
                }}
                formatter={(value: any) => [`$${value}M ARR`, '']}
              />
              <Area type="monotone" dataKey="arr" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorArr)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Main Grid: Pending Approvals Queue + Partner Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Pending Deal Registrations Approval Queue */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  Deal Registration Review Queue
                  {pendingDeals.length > 0 && (
                    <span className="px-2 py-0.2 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold">
                      {pendingDeals.length} Action Needed
                    </span>
                  )}
                </h3>
                <p className="text-xs text-slate-400">
                  Approve to activate 90-day exclusive price protection and partner margin lock
                </p>
              </div>

              <button
                onClick={() => setActiveTab('admin-deals')}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
              >
                All Deals <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {pendingDeals.length === 0 ? (
              <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 text-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                <p className="text-xs font-semibold text-white">All Deal Registrations Cleared</p>
                <p className="text-[11px] text-slate-500">No partner deals are awaiting review right now.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {pendingDeals.map((deal) => (
                  <div
                    key={deal.id}
                    className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-xs">{deal.clientName}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-cyan-300 font-medium">
                          {deal.partnerName}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">#{deal.id}</span>
                      </div>
                      <p className="text-xs text-slate-300 mt-1">
                        {deal.productInterested} • Target: <span className="text-slate-400">{deal.closingTimeline}</span>
                      </p>
                      {deal.notes && (
                        <p className="text-[11px] text-slate-400 mt-1 italic">
                          "{deal.notes}"
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-auto">
                      <div className="text-right">
                        <span className="text-xs font-mono font-bold text-white block">
                          ${deal.estimatedValue.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-amber-400 font-semibold">Under Review</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => updateDealStatus(deal.id, 'Approved', 'Approved by Channel Ops with 90-day margin lock')}
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors flex items-center gap-1"
                          title="Approve Deal & Lock Margin"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Approve</span>
                        </button>
                        <button
                          onClick={() => updateDealStatus(deal.id, 'Rejected', 'Conflict with direct enterprise account')}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-400 font-semibold text-xs transition-colors"
                          title="Reject Registration"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pending MDF Claims Queue */}
          {pendingMDF.length > 0 && (
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Co-Op Marketing (MDF) Approval Queue ({pendingMDF.length})
              </h3>
              <div className="space-y-2">
                {pendingMDF.map((mdf) => (
                  <div key={mdf.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-white">{mdf.activityTitle}</p>
                      <span className="text-[10px] text-slate-400">{mdf.partnerName} • {mdf.category}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-bold text-emerald-400">
                        ${mdf.requestedAmount.toLocaleString()}
                      </span>
                      <button
                        onClick={() => updateMDFStatus(mdf.id, 'Approved')}
                        className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-semibold"
                      >
                        Approve Funds
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right 1 Col: Top Performing Partners Leaderboard */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-cyan-400" />
                Partner Leaderboard
              </h3>
              <span className="text-[10px] text-slate-400">By Channel ARR</span>
            </div>

            <div className="space-y-3">
              {partners
                .slice()
                .sort((a, b) => b.totalRevenue - a.totalRevenue)
                .map((p, idx) => (
                  <div
                    key={p.id}
                    className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-slate-800 text-[10px] font-bold text-slate-300 flex items-center justify-center font-mono">
                        {idx + 1}
                      </span>
                      <div>
                        <h4 className="text-xs font-bold text-white">{p.name}</h4>
                        <div className="flex items-center gap-1.5 text-[10px]">
                          <span
                            className={`font-semibold ${
                              p.tier === 'Platinum'
                                ? 'text-purple-300'
                                : p.tier === 'Gold'
                                ? 'text-amber-300'
                                : 'text-slate-400'
                            }`}
                          >
                            {p.tier} Tier
                          </span>
                          <span className="text-slate-500">•</span>
                          <span className="text-emerald-400">{p.commissionRate}% Margin</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-mono font-bold text-white block">
                        ${(p.totalRevenue / 1000).toFixed(0)}k
                      </span>
                      <span className="text-[10px] text-slate-500">
                        {p.dealsClosed} deals won
                      </span>
                    </div>
                  </div>
                ))}
            </div>

            <button
              onClick={() => setActiveTab('admin-partners')}
              className="mt-4 w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-semibold transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Manage All Partner Profiles</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <CreateCouponModal
        isOpen={isCouponModalOpen}
        onClose={() => setIsCouponModalOpen(false)}
      />
      <AddPartnerModal
        isOpen={isPartnerModalOpen}
        onClose={() => setIsPartnerModalOpen(false)}
      />
    </div>
  );
};
