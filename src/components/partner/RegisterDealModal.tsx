import React, { useState } from 'react';
import { usePortal } from '../../context/PortalContext';
import { X, ShieldCheck, DollarSign, Building, Calendar, FileText } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const RegisterDealModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { addDealRegistration, products } = usePortal();

  const [clientName, setClientName] = useState('');
  const [clientIndustry, setClientIndustry] = useState('Financial Services');
  const [productInterested, setProductInterested] = useState(products[0]?.name || 'Hydizo CloudMesh Enterprise');
  const [estimatedValue, setEstimatedValue] = useState('85000');
  const [closingTimeline, setClosingTimeline] = useState('Q1 2027');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim()) return;

    addDealRegistration({
      clientName,
      clientIndustry,
      productInterested,
      estimatedValue: Number(estimatedValue) || 50000,
      closingTimeline,
      notes,
    });

    onClose();
    setClientName('');
    setNotes('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-800/60 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Register Deal for Price Protection</h3>
              <p className="text-[11px] text-slate-400">Guarantees exclusive partner margin for 90-120 days</p>
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
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Prospective Client Name *
            </label>
            <div className="relative">
              <Building className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
              <input
                type="text"
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="e.g. Acme Health Corp"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Client Industry
              </label>
              <select
                value={clientIndustry}
                onChange={(e) => setClientIndustry(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                <option value="Financial Services">Financial Services</option>
                <option value="Healthcare & Biotech">Healthcare &amp; Biotech</option>
                <option value="Retail & E-Commerce">Retail &amp; E-Commerce</option>
                <option value="Manufacturing & IoT">Manufacturing &amp; IoT</option>
                <option value="Government & Defense">Government &amp; Defense</option>
                <option value="Technology & SaaS">Technology &amp; SaaS</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Estimated Deal ARR ($) *
              </label>
              <div className="relative">
                <DollarSign className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
                <input
                  type="number"
                  required
                  min="1000"
                  value={estimatedValue}
                  onChange={(e) => setEstimatedValue(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Primary Product of Interest
              </label>
              <select
                value={productInterested}
                onChange={(e) => setProductInterested(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                {products.map((p) => (
                  <option key={p.id} value={p.name}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Expected Close Timeline
              </label>
              <select
                value={closingTimeline}
                onChange={(e) => setClosingTimeline(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                <option value="Q4 2026">Q4 2026 (Urgent)</option>
                <option value="Q1 2027">Q1 2027</option>
                <option value="Q2 2027">Q2 2027</option>
                <option value="H2 2027">H2 2027</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Deal Notes &amp; Incumbent Competitors
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Incumbent is Datadog/Istio. Prospect needs multi-tenant isolation and 24/7 SLA."
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
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-semibold text-xs transition-all shadow-md shadow-emerald-700/20"
            >
              Submit for Approval
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
