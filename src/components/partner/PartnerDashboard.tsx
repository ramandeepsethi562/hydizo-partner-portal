import React, { useState } from 'react';
import { usePortal } from '../../context/PortalContext';
import {
  Sparkles,
  TrendingUp,
  DollarSign,
  ShieldCheck,
  TicketPercent,
  Calendar,
  PhoneCall,
  ArrowUpRight,
  PlusCircle,
  FileText,
  Calculator,
  PlayCircle,
  Clock,
  Layers,
  ChevronRight,
  AlertCircle,
  Award,
  Video,
  BarChart2,
  PieChart,
  X,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { QuoteCalculatorModal } from './QuoteCalculatorModal';
import { RegisterDealModal } from './RegisterDealModal';
import { LaunchSandboxModal } from './LaunchSandboxModal';
import { MONTHLY_REVENUE_TREND } from '../../data/mockData';

export const PartnerDashboard: React.FC = () => {
  const {
    currentPartner,
    pocs,
    deals,
    coupons,
    setActiveTab,
    setActiveVideoCallPOC,
    mdfRequests,
    addMDFRequest,
  } = usePortal();

  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isRegisterDealOpen, setIsRegisterDealOpen] = useState(false);
  const [isLaunchSandboxOpen, setIsLaunchSandboxOpen] = useState(false);
  const [isMdfModalOpen, setIsMdfModalOpen] = useState(false);

  // MDF form state
  const [mdfTitle, setMdfTitle] = useState('');
  const [mdfAmount, setMdfAmount] = useState('5000');
  const [mdfCategory, setMdfCategory] = useState<any>('Event / CISO Dinner');
  const [mdfNotes, setMdfNotes] = useState('');

  const assignedPAM = pocs.find((p) => p.id === currentPartner.assignedPOCId) || pocs[0];
  const assignedSE = pocs.find((p) => p.id === currentPartner.assignedSEId) || pocs[1];

  const partnerDeals = deals.filter((d) => d.partnerId === currentPartner.id);
  const partnerCoupons = coupons.filter(
    (c) => c.status === 'active' && (c.partnerId === currentPartner.id || c.partnerId === 'GLOBAL')
  );

  const totalEarnedCommission = Math.round(
    (currentPartner.totalRevenue * currentPartner.commissionRate) / 100
  );

  const handleMdfSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mdfTitle.trim()) return;

    addMDFRequest({
      activityTitle: mdfTitle,
      category: mdfCategory,
      requestedAmount: Number(mdfAmount) || 5000,
      expectedLeads: 25,
      notes: mdfNotes,
    });

    setIsMdfModalOpen(false);
    setMdfTitle('');
    setMdfNotes('');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Welcome & Tier Status Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 border border-slate-800 p-6 shadow-xl">
        <div className="absolute right-0 top-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                {currentPartner.tier} Partner
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/40 text-xs font-semibold">
                {currentPartner.commissionRate}% Payout Margin
              </span>
              <span className="text-xs text-slate-400">• {currentPartner.region}</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Welcome back, <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">{currentPartner.name}</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Track your enterprise deals, generate customer incentives, spin up isolated client demo sandboxes, and collaborate with your dedicated Hydizo POC team.
            </p>
          </div>

          {/* Tier Progression Progress Bar */}
          <div className="bg-slate-950/80 border border-slate-800/90 rounded-xl p-4 w-full lg:w-80 shrink-0">
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="text-slate-400 font-medium">Path to Platinum Tier</span>
              <span className="text-cyan-400 font-bold">74%</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-cyan-500 to-indigo-500 h-full rounded-full"
                style={{ width: '74%' }}
              />
            </div>
            <div className="flex justify-between items-center text-[11px] text-slate-500 mt-2">
              <span>${(currentPartner.totalRevenue / 1000).toFixed(0)}k YTD</span>
              <span className="text-slate-400">$1,000k Target (35% Margin)</span>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800/80 hover:border-slate-700 transition-all shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Total Channel Revenue
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-950/70 text-blue-400 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-white font-mono">
              ${(currentPartner.totalRevenue).toLocaleString()}
            </span>
          </div>
          <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1 font-medium">
            <TrendingUp className="w-3.5 h-3.5" /> +28% YoY growth
          </p>
        </div>

        {/* Metric 2 */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800/80 hover:border-slate-700 transition-all shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Commissions Earned
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-950/70 text-emerald-400 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-emerald-400 font-mono">
              ${totalEarnedCommission.toLocaleString()}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Locked at {currentPartner.commissionRate}% partner margin
          </p>
        </div>

        {/* Metric 3 */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800/80 hover:border-slate-700 transition-all shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Active Deal Pipeline
            </span>
            <div className="w-8 h-8 rounded-lg bg-indigo-950/70 text-indigo-400 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-white font-mono">
              ${currentPartner.activePipeline.toLocaleString()}
            </span>
          </div>
          <p className="text-[11px] text-cyan-400 mt-1">
            {partnerDeals.length} active registered accounts
          </p>
        </div>

        {/* Metric 4 */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800/80 hover:border-slate-700 transition-all shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Active Coupons &amp; Spiffs
            </span>
            <div className="w-8 h-8 rounded-lg bg-purple-950/70 text-purple-400 flex items-center justify-center">
              <TicketPercent className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-white font-mono">
              {partnerCoupons.length} Available
            </span>
          </div>
          <p className="text-[11px] text-purple-300 mt-1">
            Includes 25% exclusive Apex Q4 coupon
          </p>
        </div>
      </div>

      {/* Visual Analytics Row: Monthly Revenue & Commission Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-cyan-400" />
                Channel Revenue &amp; Commission Growth Trend
              </h3>
              <p className="text-xs text-slate-400">
                Monthly closed revenue vs partner margin disbursements
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-cyan-500" />
                <span className="text-slate-300">Revenue</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-slate-300">Net Commission</span>
              </div>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MONTHLY_REVENUE_TREND}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorComm" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} tickFormatter={(val) => `$${val / 1000}k`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '0.75rem',
                    fontSize: '11px',
                  }}
                  formatter={(value: any) => [`$${Number(value).toLocaleString()}`, '']}
                />
                <Area type="monotone" dataKey="revenue" stroke="#06b6d4" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRev)" />
                <Area type="monotone" dataKey="commission" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorComm)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Co-Op Marketing Funds (MDF) Status Card */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Co-Op Marketing Fund (MDF)
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                Active Pool
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Available Joint Funds</span>
              <p className="text-2xl font-black text-emerald-400 font-mono mt-0.5">
                ${currentPartner.coOpFundsAvailable.toLocaleString()}
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                Co-funding available for client executive dinners, digital campaigns, and conference sponsorships.
              </p>
            </div>

            <div className="mt-4 space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Recent MDF Claims:
              </span>
              {mdfRequests.slice(0, 2).map((mdf) => (
                <div key={mdf.id} className="p-2 rounded-lg bg-slate-950 border border-slate-800/70 text-xs flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-white truncate max-w-[140px]">{mdf.activityTitle}</p>
                    <span className="text-[10px] text-slate-400 font-mono">${mdf.requestedAmount.toLocaleString()}</span>
                  </div>
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                      mdf.status === 'Approved'
                        ? 'bg-emerald-950 text-emerald-400'
                        : 'bg-amber-950 text-amber-300'
                    }`}
                  >
                    {mdf.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setIsMdfModalOpen(true)}
            className="mt-4 w-full py-2 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-semibold text-xs transition-all shadow-md shadow-orange-950/30 flex items-center justify-center gap-1.5"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Apply for Co-Op Funds</span>
          </button>
        </div>
      </div>

      {/* Fast Action Shortcuts Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setIsRegisterDealOpen(true)}
          className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800/70 text-left transition-all group flex items-center gap-3"
        >
          <div className="w-9 h-9 rounded-lg bg-cyan-950 border border-cyan-800/50 text-cyan-400 flex items-center justify-center group-hover:scale-105 transition-transform">
            <PlusCircle className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-white group-hover:text-cyan-300">Register New Deal</p>
            <p className="text-[10px] text-slate-400">Lock 90-day margin protection</p>
          </div>
        </button>

        <button
          onClick={() => setIsCalculatorOpen(true)}
          className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-800/70 text-left transition-all group flex items-center gap-3"
        >
          <div className="w-9 h-9 rounded-lg bg-blue-950 border border-blue-800/50 text-blue-400 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-white group-hover:text-blue-300">Quote &amp; ROI Calculator</p>
            <p className="text-[10px] text-slate-400">Model partner commission</p>
          </div>
        </button>

        <button
          onClick={() => setIsLaunchSandboxOpen(true)}
          className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-800/70 text-left transition-all group flex items-center gap-3"
        >
          <div className="w-9 h-9 rounded-lg bg-emerald-950 border border-emerald-800/50 text-emerald-400 flex items-center justify-center group-hover:scale-105 transition-transform">
            <PlayCircle className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-white group-hover:text-emerald-300">Launch Client Sandbox</p>
            <p className="text-[10px] text-slate-400">14-Day isolated POC demo</p>
          </div>
        </button>

        <button
          onClick={() => setActiveVideoCallPOC(assignedPAM)}
          className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-purple-500/50 hover:bg-slate-800/70 text-left transition-all group flex items-center gap-3"
        >
          <div className="w-9 h-9 rounded-lg bg-purple-950 border border-purple-800/50 text-purple-400 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Video className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-white group-hover:text-purple-300">Call Your POC</p>
            <p className="text-[10px] text-slate-400">Instant Strategy Video Room</p>
          </div>
        </button>
      </div>

      {/* Main Grid: Pipeline & POC Quick Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Deal Registrations Pipeline */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  Registered Client Pipeline
                </h3>
                <p className="text-xs text-slate-400">
                  Deals submitted by {currentPartner.name} with price protection status
                </p>
              </div>
              <button
                onClick={() => setActiveTab('coupons-deals')}
                className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
              >
                View All Deals <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="pb-2.5 font-semibold">Client Organization</th>
                    <th className="pb-2.5 font-semibold">Interested Suite</th>
                    <th className="pb-2.5 font-semibold">Deal Value</th>
                    <th className="pb-2.5 font-semibold">Status</th>
                    <th className="pb-2.5 font-semibold">Protection Lock</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {partnerDeals.slice(0, 4).map((deal) => (
                    <tr key={deal.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3 font-semibold text-white">
                        {deal.clientName}
                        <span className="block text-[10px] text-slate-400 font-normal">
                          {deal.clientIndustry}
                        </span>
                      </td>
                      <td className="py-3 text-slate-300 max-w-[170px] truncate">
                        {deal.productInterested}
                      </td>
                      <td className="py-3 font-mono text-white font-semibold">
                        ${deal.estimatedValue.toLocaleString()}
                      </td>
                      <td className="py-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            deal.status === 'Approved'
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/50'
                              : deal.status === 'Closed-Won'
                              ? 'bg-cyan-950 text-cyan-300 border border-cyan-800/50'
                              : 'bg-amber-950 text-amber-300 border border-amber-800/50'
                          }`}
                        >
                          {deal.status}
                        </span>
                      </td>
                      <td className="py-3 text-slate-400 text-[11px] font-mono">
                        {deal.protectedUntil}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Active Partner Coupons Snapshot */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <TicketPercent className="w-4 h-4 text-purple-400" />
                Featured Client Discount Codes &amp; Credits
              </h3>
              <button
                onClick={() => setActiveTab('coupons-deals')}
                className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1"
              >
                Coupon Center <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {partnerCoupons.slice(0, 2).map((coupon) => (
                <div
                  key={coupon.id}
                  className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/60">
                        {coupon.code}
                      </span>
                      <span className="text-[10px] text-emerald-400 font-semibold">
                        {coupon.discountType === 'percentage'
                          ? `${coupon.discountValue}% OFF`
                          : `$${coupon.discountValue.toLocaleString()} CREDIT`}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-white mt-2">{coupon.title}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">
                      {coupon.description}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500">
                    <span>Used: {coupon.usageCount} / {coupon.maxUses}</span>
                    <span>Expires: {coupon.expiresAt}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Dedicated Hydizo POC Card */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-900/80 border border-slate-800 shadow-lg">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-cyan-400" />
                Your Hydizo POC Team
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/40 text-[10px] font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Active Direct Line
              </span>
            </div>

            {/* Primary PAM */}
            <div className="pt-4 flex items-start gap-3">
              <img
                src={assignedPAM.avatar}
                alt={assignedPAM.name}
                className="w-12 h-12 rounded-xl object-cover ring-2 ring-cyan-500/40 shrink-0"
              />
              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-bold text-white">{assignedPAM.name}</h4>
                <p className="text-xs text-cyan-400 font-medium">{assignedPAM.role}</p>
                <p className="text-[11px] text-slate-400 mt-1">{assignedPAM.email}</p>
                <p className="text-[10px] text-slate-500">{assignedPAM.timezone}</p>
              </div>
            </div>

            {/* Technical SE */}
            <div className="mt-4 pt-3 border-t border-slate-800/70 flex items-start gap-3">
              <img
                src={assignedSE.avatar}
                alt={assignedSE.name}
                className="w-10 h-10 rounded-xl object-cover ring-1 ring-blue-500/40 shrink-0"
              />
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-white">{assignedSE.name}</h4>
                <p className="text-[11px] text-blue-400 font-medium">{assignedSE.role}</p>
                <p className="text-[10px] text-slate-400">{assignedSE.email}</p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-5 space-y-2">
              <button
                onClick={() => setActiveVideoCallPOC(assignedPAM)}
                className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs transition-all shadow-md shadow-cyan-600/20 flex items-center justify-center gap-2"
              >
                <Video className="w-4 h-4" />
                <span>Join Strategy Room Call</span>
              </button>
              <button
                onClick={() => setActiveTab('contact-poc')}
                className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5 text-cyan-400" />
                <span>Message or Book Calendar Call</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <QuoteCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />
      <RegisterDealModal
        isOpen={isRegisterDealOpen}
        onClose={() => setIsRegisterDealOpen(false)}
      />
      <LaunchSandboxModal
        isOpen={isLaunchSandboxOpen}
        onClose={() => setIsLaunchSandboxOpen(false)}
      />

      {/* MDF Application Modal */}
      {isMdfModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Apply for Co-Op Marketing Funds
              </h3>
              <button onClick={() => setIsMdfModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleMdfSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Activity / Initiative Title *
                </label>
                <input
                  type="text"
                  required
                  value={mdfTitle}
                  onChange={(e) => setMdfTitle(e.target.value)}
                  placeholder="e.g. CISO Advisory Dinner in Austin, TX"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Activity Category
                  </label>
                  <select
                    value={mdfCategory}
                    onChange={(e) => setMdfCategory(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                  >
                    <option value="Event / CISO Dinner">Event / CISO Dinner</option>
                    <option value="Digital Marketing Campaign">Digital Marketing</option>
                    <option value="Sales Spiff Incentive">Sales Rep Spiff</option>
                    <option value="Technical Lab Gear">Technical Lab Gear</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Amount ($) *
                  </label>
                  <input
                    type="number"
                    required
                    min="500"
                    max={currentPartner.coOpFundsAvailable}
                    value={mdfAmount}
                    onChange={(e) => setMdfAmount(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Target Account List &amp; Strategy
                </label>
                <textarea
                  rows={2}
                  value={mdfNotes}
                  onChange={(e) => setMdfNotes(e.target.value)}
                  placeholder="Targeting 15 Fortune 1000 FinTech security architects..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-2 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsMdfModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold text-xs shadow-md shadow-orange-950/30"
                >
                  Submit MDF Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
