import React, { useState } from 'react';
import { usePortal } from '../../context/PortalContext';
import { X, Building2, Shield, Mail, Globe, Percent } from 'lucide-react';
import { PartnerTier } from '../../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AddPartnerModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { addPartner, pocs } = usePortal();

  const [name, setName] = useState('');
  const [tier, setTier] = useState<PartnerTier>('Silver');
  const [contactEmail, setContactEmail] = useState('');
  const [region, setRegion] = useState('North America (Central)');
  const [assignedPOCId, setAssignedPOCId] = useState(pocs[0]?.id || 'poc-1');
  const [assignedSEId, setAssignedSEId] = useState(pocs[1]?.id || 'poc-2');
  const [commissionRate, setCommissionRate] = useState('22');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contactEmail.trim()) return;

    addPartner({
      name,
      tier,
      contactEmail,
      region,
      assignedPOCId,
      assignedSEId,
      commissionRate: Number(commissionRate) || 20,
    });

    onClose();
    setName('');
    setContactEmail('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-950 border border-indigo-800/60 flex items-center justify-center text-indigo-400">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Onboard New Partner Organization</h3>
              <p className="text-[11px] text-slate-400">Assign tier, commission, and Hydizo POC team</p>
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
              Partner Company Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. BlueWave Infotech LLC"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Partner Tier
              </label>
              <select
                value={tier}
                onChange={(e) => {
                  const t = e.target.value as PartnerTier;
                  setTier(t);
                  if (t === 'Platinum') setCommissionRate('35');
                  else if (t === 'Gold') setCommissionRate('28');
                  else if (t === 'Silver') setCommissionRate('22');
                  else setCommissionRate('15');
                }}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                <option value="Platinum">Platinum (35% Margin)</option>
                <option value="Gold">Gold (28% Margin)</option>
                <option value="Silver">Silver (22% Margin)</option>
                <option value="Registered">Registered (15% Margin)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Commission Margin (%)
              </label>
              <input
                type="number"
                min="10"
                max="50"
                value={commissionRate}
                onChange={(e) => setCommissionRate(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Primary Alliances Email *
            </label>
            <input
              type="email"
              required
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              placeholder="alliances@partnerdomain.com"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Operating Region
            </label>
            <input
              type="text"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              placeholder="e.g. North America (Central)"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Assign PAM (Account Mgr)
              </label>
              <select
                value={assignedPOCId}
                onChange={(e) => setAssignedPOCId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                {pocs.map((poc) => (
                  <option key={poc.id} value={poc.id}>
                    {poc.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Assign SE (Tech Architect)
              </label>
              <select
                value={assignedSEId}
                onChange={(e) => setAssignedSEId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                {pocs.map((poc) => (
                  <option key={poc.id} value={poc.id}>
                    {poc.name}
                  </option>
                ))}
              </select>
            </div>
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
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-semibold text-xs transition-all shadow-md shadow-purple-600/30"
            >
              Onboard Partner
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
