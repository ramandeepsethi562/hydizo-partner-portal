import React, { useState } from 'react';
import { usePortal } from '../../context/PortalContext';
import { X, BadgePercent, Tag, Calendar, DollarSign, Users } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateCouponModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { addCoupon, partners, products } = usePortal();

  const [code, setCode] = useState('');
  const [title, setTitle] = useState('');
  const [targetPartner, setTargetPartner] = useState<'GLOBAL' | string>('GLOBAL');
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed_credit'>('percentage');
  const [discountValue, setDiscountValue] = useState('20');
  const [productScope, setProductScope] = useState('All Products');
  const [expiresAt, setExpiresAt] = useState('2026-12-31');
  const [maxUses, setMaxUses] = useState('50');
  const [minDealSize, setMinDealSize] = useState('25000');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim() || !title.trim()) return;

    const partnerName =
      targetPartner === 'GLOBAL'
        ? 'Global (All Partners)'
        : partners.find((p) => p.id === targetPartner)?.name || 'Assigned Partner';

    addCoupon({
      code: code.trim(),
      title,
      partnerId: targetPartner,
      partnerName,
      discountType,
      discountValue: Number(discountValue) || 20,
      productScope,
      expiresAt,
      maxUses: Number(maxUses) || 50,
      minDealSize: minDealSize ? Number(minDealSize) : undefined,
      description: description || `Official promotional coupon for ${partnerName}`,
    });

    onClose();
    setCode('');
    setTitle('');
    setDescription('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-950 border border-purple-800/60 flex items-center justify-center text-purple-400">
              <BadgePercent className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Create Partner Coupon Campaign</h3>
              <p className="text-[11px] text-slate-400">
                Hydizo Channel Operations Discount Provisioner
              </p>
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
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Coupon Code *
              </label>
              <input
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="e.g. Q4-GROWTH-25"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono uppercase text-cyan-300 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Target Partner Scope
              </label>
              <select
                value={targetPartner}
                onChange={(e) => setTargetPartner(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                <option value="GLOBAL">Global (All Partners)</option>
                {partners.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.tier} Tier)
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Campaign / Incentive Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. End of Year Multi-Cloud Acceleration Spiff"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Discount Mechanism
              </label>
              <select
                value={discountType}
                onChange={(e) => setDiscountType(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                <option value="percentage">Percentage Discount (%)</option>
                <option value="fixed_credit">Fixed Dollar Credit ($)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Value ({discountType === 'percentage' ? '%' : '$'}) *
              </label>
              <input
                type="number"
                required
                min="1"
                value={discountValue}
                onChange={(e) => setDiscountValue(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Applicable Product Scope
              </label>
              <select
                value={productScope}
                onChange={(e) => setProductScope(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                <option value="All Products">All Products Suite</option>
                {products.map((p) => (
                  <option key={p.id} value={p.name}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Expiration Date
              </label>
              <input
                type="date"
                value={expiresAt}
                onChange={(e) => setExpiresAt(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Max Total Redemptions
              </label>
              <input
                type="number"
                min="1"
                value={maxUses}
                onChange={(e) => setMaxUses(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Minimum Deal Size ($)
              </label>
              <input
                type="number"
                min="0"
                value={minDealSize}
                onChange={(e) => setMinDealSize(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Campaign Terms &amp; Description
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Applicable only for new customer acquisitions with 1-year annual prepayment."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            />
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
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-semibold text-xs transition-all shadow-md shadow-purple-600/30"
            >
              Issue Coupon Campaign
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
