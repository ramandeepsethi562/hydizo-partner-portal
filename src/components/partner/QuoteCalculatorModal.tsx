import React, { useState } from 'react';
import { usePortal } from '../../context/PortalContext';
import {
  X,
  Calculator,
  Percent,
  DollarSign,
  TrendingUp,
  Download,
  CheckCircle2,
  Tag,
  Shield,
  Layers,
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  defaultProductId?: string;
}

export const QuoteCalculatorModal: React.FC<Props> = ({
  isOpen,
  onClose,
  defaultProductId,
}) => {
  const { products, currentPartner, coupons, showToast } = usePortal();

  const [selectedProductId, setSelectedProductId] = useState<string>(
    defaultProductId || products[0]?.id || 'prod-1'
  );
  const [units, setUnits] = useState<number>(25);
  const [contractYears, setContractYears] = useState<number>(1);
  const [selectedCouponCode, setSelectedCouponCode] = useState<string>('APEX-HYDIZO-25');
  const [appliedCustomDiscount, setAppliedCustomDiscount] = useState<number>(0);

  if (!isOpen) return null;

  const currentProduct = products.find((p) => p.id === selectedProductId) || products[0];

  // Base pricing
  const baseMonthlyPerUnit = currentProduct.basePriceNum;
  const annualListPricePerUnit = baseMonthlyPerUnit * 12;
  const rawListTotal = annualListPricePerUnit * units * contractYears;

  // Multi-year discount
  const multiYearDiscountPercent = contractYears === 3 ? 15 : contractYears === 2 ? 8 : 0;
  const multiYearDiscountDollars = (rawListTotal * multiYearDiscountPercent) / 100;

  // Coupon discount
  const activeCoupon = coupons.find(
    (c) => c.code.toUpperCase() === selectedCouponCode.trim().toUpperCase() && c.status === 'active'
  );

  let couponDiscountDollars = 0;
  if (activeCoupon) {
    if (activeCoupon.discountType === 'percentage') {
      couponDiscountDollars = ((rawListTotal - multiYearDiscountDollars) * activeCoupon.discountValue) / 100;
    } else {
      couponDiscountDollars = Math.min(activeCoupon.discountValue, rawListTotal);
    }
  }

  const finalCustomerPrice = Math.max(0, rawListTotal - multiYearDiscountDollars - couponDiscountDollars);

  // Partner Margin calculation
  // Partner standard margin rate from profile
  const partnerMarginPct = Math.max(currentPartner.commissionRate, currentProduct.partnerMarginPercent);
  const partnerWholesaleCost = finalCustomerPrice * (1 - partnerMarginPct / 100);
  const partnerProfitDollars = finalCustomerPrice - partnerWholesaleCost;

  const handleExport = () => {
    showToast(
      'Quote Exported',
      `Formal PDF Quote generated for ${currentProduct.name} (${units} units, ${contractYears} yr). Download started.`,
      'success'
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-950 border border-cyan-800/60 flex items-center justify-center text-cyan-400">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                Hydizo Partner Margin &amp; Quote Builder
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/40">
                  {currentPartner.tier} Tier ({currentPartner.commissionRate}% Guaranteed)
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Interactive real-time margin modeling for client proposals
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

        {/* Body */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Controls Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Select Hydizo Product Suite
              </label>
              <select
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.retailPrice} {p.billingCycle})
                  </option>
                ))}
              </select>
            </div>

            {/* Units / Capacity */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-1.5">
                <span>Quantity / Sizing ({currentProduct.billingCycle})</span>
                <span className="text-cyan-400 font-bold">{units} units</span>
              </div>
              <input
                type="range"
                min="1"
                max="250"
                value={units}
                onChange={(e) => setUnits(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>1 unit</span>
                <span>50 units</span>
                <span>100 units</span>
                <span>250 units</span>
              </div>
            </div>

            {/* Contract Term */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Contract Duration &amp; Term
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { years: 1, label: '1 Year', spiff: 'Standard' },
                  { years: 2, label: '2 Years', spiff: '8% Bonus' },
                  { years: 3, label: '3 Years', spiff: '15% Bonus' },
                ].map((item) => (
                  <button
                    key={item.years}
                    type="button"
                    onClick={() => setContractYears(item.years)}
                    className={`py-2 px-2 rounded-xl text-xs font-semibold border transition-all text-center ${
                      contractYears === item.years
                        ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 shadow-sm'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div>{item.label}</div>
                    <div className="text-[10px] text-emerald-400 mt-0.5">{item.spiff}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Coupon Application */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Apply Partner Coupon / Incentive Code
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={selectedCouponCode}
                  onChange={(e) => setSelectedCouponCode(e.target.value)}
                  placeholder="Enter coupon code"
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs uppercase font-mono text-cyan-300 focus:outline-none focus:border-cyan-500"
                />
              </div>
              {activeCoupon ? (
                <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Coupon applied: {activeCoupon.title} (
                  {activeCoupon.discountType === 'percentage'
                    ? `${activeCoupon.discountValue}% Off`
                    : `$${activeCoupon.discountValue} Credit`}
                  )
                </p>
              ) : selectedCouponCode ? (
                <p className="text-[11px] text-amber-400 mt-1">
                  Coupon code not active or invalid for this selection.
                </p>
              ) : null}
            </div>
          </div>

          {/* Real-time Calculation Summary Column */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="border-b border-slate-800/80 pb-3">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Proposal Breakdown
                </span>
                <h4 className="text-sm font-semibold text-white mt-1">
                  {currentProduct.name}
                </h4>
                <p className="text-xs text-slate-400">
                  {units} {currentProduct.billingCycle} × {contractYears} Year(s)
                </p>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Gross MSRP List Price:</span>
                  <span className="font-mono text-slate-300">${rawListTotal.toLocaleString()}</span>
                </div>

                {multiYearDiscountDollars > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Multi-Year Term Discount ({multiYearDiscountPercent}%):</span>
                    <span className="font-mono">-${multiYearDiscountDollars.toLocaleString()}</span>
                  </div>
                )}

                {couponDiscountDollars > 0 && (
                  <div className="flex justify-between text-cyan-400">
                    <span>Partner Coupon Discount:</span>
                    <span className="font-mono">-${couponDiscountDollars.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-200 font-bold pt-2 border-t border-slate-800">
                  <span>Customer Net Invoice:</span>
                  <span className="font-mono text-white text-sm">
                    ${Math.round(finalCustomerPrice).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Profit Card Highlight */}
              <div className="p-4 rounded-xl bg-gradient-to-tr from-emerald-950/60 to-cyan-950/40 border border-emerald-500/30">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-emerald-300 flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    Partner Margin ({partnerMarginPct}%)
                  </span>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-900/60 text-emerald-300 border border-emerald-700/50">
                    Protected Payout
                  </span>
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-black text-emerald-400 font-mono">
                    ${Math.round(partnerProfitDollars).toLocaleString()}
                  </span>
                  <span className="text-xs text-slate-400">Your Net Commission</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">
                  Partner Wholesale Buy Price: ${Math.round(partnerWholesaleCost).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex gap-2">
              <button
                onClick={handleExport}
                className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs transition-all shadow-md shadow-cyan-600/20 flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Export Partner Quote (PDF)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
