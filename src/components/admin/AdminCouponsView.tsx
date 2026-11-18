import React, { useState } from 'react';
import { usePortal } from '../../context/PortalContext';
import {
  BadgePercent,
  PlusCircle,
  Copy,
  Check,
  Search,
  Filter,
  DollarSign,
  AlertCircle,
  Clock,
  RotateCcw,
  Ban,
  CheckCircle2,
} from 'lucide-react';
import { PartnerCoupon } from '../../types';
import { CreateCouponModal } from './CreateCouponModal';

export const AdminCouponsView: React.FC = () => {
  const { coupons, updateCouponStatus, showToast } = usePortal();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCoupons = coupons.filter((c) => {
    const matchesSearch =
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.partnerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    showToast('Code Copied', `"${code}" copied to clipboard.`, 'info');
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <BadgePercent className="w-5 h-5 text-purple-400" />
            Partner Coupons &amp; Discount Campaign Operations
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Issue global incentives or partner-exclusive promo codes, monitor redemption rates, and manage expiration windows
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-semibold text-xs transition-all shadow-md shadow-purple-600/30 flex items-center gap-1.5"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create Coupon Campaign</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-semibold text-slate-400">Status Filter:</span>
          {(['All', 'active', 'expired', 'revoked'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                statusFilter === st
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/50'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search code, title, partner..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/60">
                <th className="py-3 px-4 font-semibold">Coupon Code &amp; Title</th>
                <th className="py-3 px-4 font-semibold">Target Partner Scope</th>
                <th className="py-3 px-4 font-semibold">Discount Value</th>
                <th className="py-3 px-4 font-semibold">Applicable Product</th>
                <th className="py-3 px-4 font-semibold">Redemptions</th>
                <th className="py-3 px-4 font-semibold">Expiration</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredCoupons.map((coupon) => {
                const isCopied = copiedCode === coupon.code;
                const percentUsed = Math.min(100, Math.round((coupon.usageCount / coupon.maxUses) * 100));

                return (
                  <tr key={coupon.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-cyan-300 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                          {coupon.code}
                        </span>
                        <button
                          onClick={() => handleCopy(coupon.code)}
                          className="text-slate-500 hover:text-white p-1 rounded transition-colors"
                          title="Copy Code"
                        >
                          {isCopied ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                      <div className="font-semibold text-white mt-1">{coupon.title}</div>
                      <span className="text-[10px] text-slate-400 line-clamp-1">
                        {coupon.description}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-medium text-slate-300">
                      {coupon.partnerName}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-mono text-sm font-bold text-emerald-400">
                        {coupon.discountType === 'percentage'
                          ? `${coupon.discountValue}% OFF`
                          : `$${coupon.discountValue.toLocaleString()} CREDIT`}
                      </span>
                      {coupon.minDealSize && (
                        <span className="block text-[10px] text-slate-500 font-mono">
                          Min: ${coupon.minDealSize.toLocaleString()}
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-slate-300 max-w-[150px] truncate">
                      {coupon.productScope}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center justify-between text-[11px] text-slate-300 mb-1">
                        <span>{coupon.usageCount} / {coupon.maxUses}</span>
                        <span className="text-[10px] text-slate-500">{percentUsed}%</span>
                      </div>
                      <div className="w-24 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-purple-400 h-full rounded-full"
                          style={{ width: `${percentUsed}%` }}
                        />
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-slate-400 text-xs">
                      {coupon.expiresAt}
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          coupon.status === 'active'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/40'
                            : coupon.status === 'revoked'
                            ? 'bg-rose-950 text-rose-400 border border-rose-800/40'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {coupon.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      {coupon.status === 'active' ? (
                        <button
                          onClick={() => updateCouponStatus(coupon.id, 'revoked')}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-rose-950 text-slate-300 hover:text-rose-400 text-[11px] font-semibold transition-colors"
                        >
                          Revoke
                        </button>
                      ) : (
                        <button
                          onClick={() => updateCouponStatus(coupon.id, 'active')}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-emerald-950 text-slate-300 hover:text-emerald-400 text-[11px] font-semibold transition-colors"
                        >
                          Re-activate
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <CreateCouponModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};
