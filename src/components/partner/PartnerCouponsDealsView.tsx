import React, { useState } from 'react';
import { usePortal } from '../../context/PortalContext';
import {
  TicketPercent,
  ShieldCheck,
  Copy,
  Check,
  PlusCircle,
  Clock,
  Sparkles,
  Search,
  Filter,
  DollarSign,
  AlertCircle,
  Award,
  Share2,
  QrCode,
  ExternalLink,
  X,
} from 'lucide-react';
import { RegisterDealModal } from './RegisterDealModal';
import { PartnerCoupon } from '../../types';

export const PartnerCouponsDealsView: React.FC = () => {
  const { currentPartner, coupons, deals, mdfRequests, showToast } = usePortal();

  const [activeTab, setActiveTab] = useState<'coupons' | 'deals' | 'mdf'>('coupons');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [isRegisterDealOpen, setIsRegisterDealOpen] = useState(false);
  const [dealFilter, setDealFilter] = useState('All');
  const [shareCoupon, setShareCoupon] = useState<PartnerCoupon | null>(null);
  const [copiedShareUrl, setCopiedShareUrl] = useState(false);

  const partnerCoupons = coupons.filter(
    (c) => c.partnerId === currentPartner.id || c.partnerId === 'GLOBAL'
  );

  const partnerDeals = deals.filter((d) => {
    const isPartner = d.partnerId === currentPartner.id;
    if (!isPartner) return false;
    if (dealFilter === 'All') return true;
    return d.status === dealFilter;
  });

  const partnerMDF = mdfRequests.filter((m) => m.partnerId === currentPartner.id);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    showToast('Coupon Code Copied', `"${code}" copied to clipboard. Ready to send to client prospect.`, 'success');
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const getProposalUrl = (couponCode: string) => {
    return `https://hydizo.io/proposal/${currentPartner.id}?code=${couponCode}&spiff=true`;
  };

  const handleCopyProposalUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedShareUrl(true);
    showToast('Proposal Link Copied', 'Client checkout & onboarding link copied.', 'success');
    setTimeout(() => setCopiedShareUrl(false), 2500);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <TicketPercent className="w-5 h-5 text-cyan-400" />
            Partner Coupons, Discounts &amp; Deal Registrations
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Generate and distribute client discounts, track redemption quotas, and protect deal margins
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('coupons')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'coupons'
                  ? 'bg-cyan-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Active Coupons ({partnerCoupons.length})
            </button>
            <button
              onClick={() => setActiveTab('deals')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'deals'
                  ? 'bg-cyan-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Registered Deals ({deals.filter((d) => d.partnerId === currentPartner.id).length})
            </button>
            <button
              onClick={() => setActiveTab('mdf')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'mdf'
                  ? 'bg-cyan-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Co-Op MDF Funds ({partnerMDF.length})</span>
            </button>
          </div>

          <button
            onClick={() => setIsRegisterDealOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-semibold text-xs transition-all shadow-md shadow-emerald-700/20 flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Register Deal</span>
          </button>
        </div>
      </div>

      {/* COUPONS TAB */}
      {activeTab === 'coupons' && (
        <div className="space-y-4">
          {/* Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-slate-900 border border-purple-800/30 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-900 text-purple-200 border border-purple-700 uppercase">
                Partner Co-Op Marketing Pool
              </span>
              <h3 className="text-sm font-bold text-white mt-1">
                Your Co-Op Incentive Budget: ${currentPartner.coOpFundsAvailable.toLocaleString()}
              </h3>
              <p className="text-xs text-slate-300">
                Coupons can be attached to client proposals. Discounts do NOT reduce your protected {currentPartner.commissionRate}% margin rate.
              </p>
            </div>
          </div>

          {/* Coupons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {partnerCoupons.map((coupon) => {
              const isGlobal = coupon.partnerId === 'GLOBAL';
              const isCopied = copiedCode === coupon.code;
              const isExpired = coupon.status === 'expired';

              return (
                <div
                  key={coupon.id}
                  className={`p-5 rounded-2xl border transition-all flex flex-col justify-between shadow-md ${
                    isExpired
                      ? 'bg-slate-950/40 border-slate-800 opacity-60'
                      : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          isGlobal
                            ? 'bg-blue-950 text-blue-300 border border-blue-800'
                            : 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                        }`}
                      >
                        {isGlobal ? 'Global Spiff' : `${currentPartner.name} Exclusive`}
                      </span>

                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          coupon.status === 'active'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/40'
                            : 'bg-rose-950 text-rose-400 border border-rose-800/40'
                        }`}
                      >
                        {coupon.status.toUpperCase()}
                      </span>
                    </div>

                    {/* Code pill */}
                    <div className="mt-3 p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-cyan-300 tracking-wider">
                        {coupon.code}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleCopyCode(coupon.code)}
                          className={`p-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 ${
                            isCopied
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                          }`}
                          title="Copy coupon code"
                        >
                          {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          <span className="text-[10px]">{isCopied ? 'Copied' : 'Copy'}</span>
                        </button>

                        <button
                          onClick={() => setShareCoupon(coupon)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
                          title="Generate Shareable Proposal Link & QR"
                        >
                          <Share2 className="w-3.5 h-3.5 text-cyan-400" />
                        </button>
                      </div>
                    </div>

                    <h4 className="text-sm font-bold text-white mt-3">{coupon.title}</h4>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {coupon.description}
                    </p>

                    <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-1.5 text-xs">
                      <div className="flex justify-between text-slate-400">
                        <span>Discount Value:</span>
                        <span className="font-bold text-emerald-400 font-mono">
                          {coupon.discountType === 'percentage'
                            ? `${coupon.discountValue}% OFF`
                            : `$${coupon.discountValue.toLocaleString()} CREDIT`}
                        </span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Product Scope:</span>
                        <span className="text-slate-300 font-medium truncate max-w-[150px]">
                          {coupon.productScope}
                        </span>
                      </div>
                      {coupon.minDealSize && (
                        <div className="flex justify-between text-slate-400">
                          <span>Min Deal Size:</span>
                          <span className="text-slate-300 font-mono">
                            ${coupon.minDealSize.toLocaleString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                    <span>
                      Redeemed: <strong className="text-slate-300">{coupon.usageCount}</strong> / {coupon.maxUses}
                    </span>
                    <span>Expires: {coupon.expiresAt}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* DEALS TAB */}
      {activeTab === 'deals' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-400">Filter Status:</span>
              {(['All', 'Approved', 'Pending Review', 'Closed-Won'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setDealFilter(st)}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                    dealFilter === st
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            <span className="text-xs text-slate-400">
              Showing {partnerDeals.length} Deal Registrations
            </span>
          </div>

          <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/60">
                    <th className="py-3 px-4 font-semibold">Deal ID &amp; Client</th>
                    <th className="py-3 px-4 font-semibold">Industry</th>
                    <th className="py-3 px-4 font-semibold">Product Requested</th>
                    <th className="py-3 px-4 font-semibold">Estimated ARR</th>
                    <th className="py-3 px-4 font-semibold">Close Target</th>
                    <th className="py-3 px-4 font-semibold">Status</th>
                    <th className="py-3 px-4 font-semibold">Price Protection Lock</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {partnerDeals.map((deal) => (
                    <tr key={deal.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-white">
                        <span className="font-mono text-[10px] text-cyan-400 block">
                          #{deal.id}
                        </span>
                        {deal.clientName}
                      </td>
                      <td className="py-3.5 px-4 text-slate-300">{deal.clientIndustry}</td>
                      <td className="py-3.5 px-4 text-slate-300 max-w-[200px] truncate">
                        {deal.productInterested}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-white font-bold">
                        ${deal.estimatedValue.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4 text-slate-300">{deal.closingTimeline}</td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
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
                      <td className="py-3.5 px-4 font-mono text-xs text-slate-300">
                        {deal.protectedUntil}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* MDF CO-OP FUNDS TAB */}
      {activeTab === 'mdf' && (
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <h3 className="text-sm font-bold text-white mb-1">Market Development Funds (MDF) Claims Ledger</h3>
            <p className="text-xs text-slate-400 mb-4">
              Track co-op marketing applications and reimbursement payouts for {currentPartner.name}
            </p>

            <div className="space-y-3">
              {partnerMDF.map((mdf) => (
                <div key={mdf.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-xs">{mdf.activityTitle}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-cyan-300">{mdf.category}</span>
                      <span className="text-[10px] text-slate-500 font-mono">#{mdf.id}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{mdf.notes}</p>
                    <span className="text-[10px] text-slate-500">Submitted: {mdf.submissionDate} • Expected Pipeline: {mdf.expectedLeads} Enterprise Leads</span>
                  </div>

                  <div className="text-right self-end sm:self-auto">
                    <span className="text-base font-bold text-emerald-400 font-mono block">
                      ${mdf.requestedAmount.toLocaleString()}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                      {mdf.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Client Proposal Link & QR Modal */}
      {shareCoupon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Share2 className="w-4 h-4 text-cyan-400" />
                Client Proposal &amp; Checkout Link
              </h3>
              <button onClick={() => setShareCoupon(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-center">
              {/* QR Code graphic */}
              <div className="w-36 h-36 mx-auto p-3 bg-white rounded-2xl shadow-xl flex items-center justify-center">
                <div className="w-full h-full border-4 border-slate-950 p-2 flex flex-col items-center justify-center">
                  <QrCode className="w-20 h-20 text-slate-950" />
                  <span className="text-[8px] font-bold text-slate-900 font-mono">SCAN TO ACTIVATE</span>
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-white">{shareCoupon.title}</p>
                <span className="font-mono text-xs font-bold text-cyan-400 px-2.5 py-1 rounded bg-slate-950 border border-slate-800 mt-1 inline-block">
                  {shareCoupon.code}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-left flex items-center justify-between">
                <span className="truncate text-slate-300 mr-2">{getProposalUrl(shareCoupon.code)}</span>
                <button
                  onClick={() => handleCopyProposalUrl(getProposalUrl(shareCoupon.code))}
                  className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs shrink-0 flex items-center gap-1"
                >
                  {copiedShareUrl ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedShareUrl ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <p className="text-[11px] text-slate-400">
                Directs clients to the branded checkout portal with your partner tag embedded to automatically credit your {currentPartner.commissionRate}% margin payout.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Register Deal Modal */}
      <RegisterDealModal
        isOpen={isRegisterDealOpen}
        onClose={() => setIsRegisterDealOpen(false)}
      />
    </div>
  );
};
