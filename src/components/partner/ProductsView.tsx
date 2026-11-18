import React, { useState } from 'react';
import { usePortal } from '../../context/PortalContext';
import {
  Search,
  Filter,
  Box,
  CheckCircle2,
  DollarSign,
  TrendingUp,
  Download,
  Calculator,
  PlayCircle,
  ExternalLink,
  ShieldCheck,
  Star,
  Zap,
} from 'lucide-react';
import { QuoteCalculatorModal } from './QuoteCalculatorModal';
import { LaunchSandboxModal } from './LaunchSandboxModal';

export const ProductsView: React.FC = () => {
  const { products, currentPartner, showToast } = usePortal();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProductIdForCalc, setSelectedProductIdForCalc] = useState<string | undefined>(undefined);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isSandboxOpen, setIsSandboxOpen] = useState(false);

  const categories = [
    'All',
    'Cloud & Mesh',
    'Security & SecOps',
    'AI & Observability',
    'Edge & Compute',
    'Identity & ZeroTrust',
  ];

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleOpenCalc = (prodId: string) => {
    setSelectedProductIdForCalc(prodId);
    setIsCalculatorOpen(true);
  };

  const handleDownloadDatasheet = (prodName: string) => {
    showToast(
      'Datasheet Downloaded',
      `Full technical specifications and architecture PDF for "${prodName}" saved.`,
      'success'
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Box className="w-5 h-5 text-cyan-400" />
            Hydizo Enterprise Product Suite &amp; Partner Margins
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Enterprise products with tiered partner margins (up to 35%), technical specs, and deal enablement kits
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedProductIdForCalc(products[0]?.id);
            setIsCalculatorOpen(true);
          }}
          className="self-start sm:self-auto px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs transition-all shadow-md shadow-cyan-600/20 flex items-center gap-2"
        >
          <Calculator className="w-4 h-4" />
          <span>Launch Master Quote Builder</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products or specs..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProducts.map((product) => {
          const effectiveMarginPct = Math.max(
            currentPartner.commissionRate,
            product.partnerMarginPercent
          );
          const partnerWholesaleCost = Math.round(
            product.basePriceNum * (1 - effectiveMarginPct / 100)
          );

          return (
            <div
              key={product.id}
              className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700/80 transition-all flex flex-col justify-between shadow-lg group relative"
            >
              <div>
                {/* Top badges */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {product.category}
                  </span>

                  <div className="flex items-center gap-2">
                    {product.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/30">
                        {product.badge}
                      </span>
                    )}
                    <span className="text-[10px] font-semibold text-amber-400 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400" /> {product.rating}
                    </span>
                  </div>
                </div>

                {/* Title & Tagline */}
                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {product.name}
                </h3>
                <p className="text-xs text-cyan-400 font-medium mt-0.5">{product.tagline}</p>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  {product.description}
                </p>

                {/* Pricing & Margin Highlights Card */}
                <div className="mt-4 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/90 grid grid-cols-3 gap-2 text-center">
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-semibold">
                      Client MSRP
                    </span>
                    <span className="text-sm font-bold text-white font-mono">
                      {product.retailPrice}
                    </span>
                    <span className="text-[9px] text-slate-500 block">{product.billingCycle}</span>
                  </div>

                  <div className="border-x border-slate-800">
                    <span className="text-[10px] text-emerald-400 block uppercase font-semibold">
                      Partner Margin
                    </span>
                    <span className="text-sm font-black text-emerald-400 font-mono">
                      {effectiveMarginPct}%
                    </span>
                    <span className="text-[9px] text-emerald-500/80 block">Tier Guaranteed</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-cyan-400 block uppercase font-semibold">
                      Your Buy Price
                    </span>
                    <span className="text-sm font-bold text-cyan-300 font-mono">
                      ${partnerWholesaleCost}
                    </span>
                    <span className="text-[9px] text-slate-500 block">{product.billingCycle}</span>
                  </div>
                </div>

                {/* Key Features */}
                <div className="mt-4">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Key Architectural Capabilities:
                  </p>
                  <ul className="space-y-1.5">
                    {product.keyFeatures.map((feat, idx) => (
                      <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Sales Battlecard Preview */}
                <div className="mt-4 p-3 rounded-xl bg-cyan-950/20 border border-cyan-800/30 text-xs">
                  <p className="font-semibold text-cyan-300 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-cyan-400" />
                    Competitive Advantage:
                  </p>
                  <p className="text-[11px] text-slate-300 mt-1">
                    {product.battlecardSummary}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap gap-2">
                <button
                  onClick={() => handleOpenCalc(product.id)}
                  className="flex-1 py-2 px-3 rounded-xl bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-700/50 text-cyan-300 font-semibold text-xs transition-all flex items-center justify-center gap-1.5"
                >
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Build Quote &amp; Margin</span>
                </button>

                <button
                  onClick={() => setIsSandboxOpen(true)}
                  className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors flex items-center gap-1.5"
                >
                  <PlayCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Request Demo</span>
                </button>

                <button
                  onClick={() => handleDownloadDatasheet(product.name)}
                  className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                  title="Download Product Datasheet PDF"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modals */}
      <QuoteCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        defaultProductId={selectedProductIdForCalc}
      />
      <LaunchSandboxModal
        isOpen={isSandboxOpen}
        onClose={() => setIsSandboxOpen(false)}
      />
    </div>
  );
};
