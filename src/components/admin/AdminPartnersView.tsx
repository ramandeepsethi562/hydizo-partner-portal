import React, { useState } from 'react';
import { usePortal } from '../../context/PortalContext';
import {
  Users,
  Search,
  Filter,
  PlusCircle,
  Building2,
  DollarSign,
  TrendingUp,
  ShieldCheck,
  Award,
  ChevronDown,
  Edit2,
  CheckCircle,
  UserCheck,
} from 'lucide-react';
import { PartnerTier, PartnerOrganization } from '../../types';
import { AddPartnerModal } from './AddPartnerModal';

export const AdminPartnersView: React.FC = () => {
  const { partners, updatePartner, pocs, showToast } = usePortal();

  const [searchQuery, setSearchQuery] = useState('');
  const [tierFilter, setTierFilter] = useState('All');
  const [isAddPartnerOpen, setIsAddPartnerOpen] = useState(false);
  const [editingPartnerId, setEditingPartnerId] = useState<string | null>(null);

  const filteredPartners = partners.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.contactEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.region.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTier = tierFilter === 'All' || p.tier === tierFilter;
    return matchesSearch && matchesTier;
  });

  const handleTierChange = (partnerId: string, newTier: PartnerTier) => {
    let newMargin = 20;
    if (newTier === 'Platinum') newMargin = 35;
    else if (newTier === 'Gold') newMargin = 28;
    else if (newTier === 'Silver') newMargin = 22;
    else newMargin = 15;

    updatePartner(partnerId, { tier: newTier, commissionRate: newMargin });
    showToast('Tier Updated', `Partner tier adjusted to ${newTier} (${newMargin}% margin).`, 'success');
  };

  const handleStatusToggle = (partnerId: string, currentStatus: PartnerOrganization['status']) => {
    const nextStatus = currentStatus === 'active' ? 'suspended' : 'active';
    updatePartner(partnerId, { status: nextStatus });
    showToast('Status Updated', `Partner account marked as ${nextStatus}.`, 'info');
  };

  const handlePOCReassign = (partnerId: string, newPOCId: string) => {
    updatePartner(partnerId, { assignedPOCId: newPOCId });
    showToast('POC Reassigned', 'Assigned Partner Account Manager updated.', 'success');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-400" />
            Partner Organizations &amp; Tier Allocation
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage channel alliances, commission rates, assigned Hydizo POC teams, and compliance status
          </p>
        </div>

        <button
          onClick={() => setIsAddPartnerOpen(true)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-semibold text-xs transition-all shadow-md shadow-purple-600/30 flex items-center gap-1.5"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Onboard New Partner</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-semibold text-slate-400">Tier Filter:</span>
          {(['All', 'Platinum', 'Gold', 'Silver', 'Registered'] as const).map((tier) => (
            <button
              key={tier}
              onClick={() => setTierFilter(tier)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                tierFilter === tier
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/50'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {tier}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search partners, email, region..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Partners Table */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/60">
                <th className="py-3 px-4 font-semibold">Partner Organization</th>
                <th className="py-3 px-4 font-semibold">Tier &amp; Margin</th>
                <th className="py-3 px-4 font-semibold">Total Revenue</th>
                <th className="py-3 px-4 font-semibold">Pipeline</th>
                <th className="py-3 px-4 font-semibold">Assigned POC (PAM)</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredPartners.map((partner) => {
                const assignedPAM = pocs.find((p) => p.id === partner.assignedPOCId) || pocs[0];

                return (
                  <tr key={partner.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white text-xs">{partner.name}</div>
                      <span className="text-[10px] text-slate-400 block">{partner.contactEmail}</span>
                      <span className="text-[10px] text-slate-500">{partner.region}</span>
                    </td>

                    <td className="py-3.5 px-4">
                      <select
                        value={partner.tier}
                        onChange={(e) => handleTierChange(partner.id, e.target.value as PartnerTier)}
                        className={`text-[11px] font-bold px-2 py-1 rounded-lg border focus:outline-none bg-slate-950 ${
                          partner.tier === 'Platinum'
                            ? 'text-purple-300 border-purple-800'
                            : partner.tier === 'Gold'
                            ? 'text-amber-300 border-amber-800'
                            : 'text-slate-300 border-slate-700'
                        }`}
                      >
                        <option value="Platinum">Platinum (35%)</option>
                        <option value="Gold">Gold (28%)</option>
                        <option value="Silver">Silver (22%)</option>
                        <option value="Registered">Registered (15%)</option>
                      </select>
                      <span className="text-[10px] text-emerald-400 block mt-0.5 font-mono">
                        {partner.commissionRate}% margin lock
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-white font-bold">
                      ${partner.totalRevenue.toLocaleString()}
                      <span className="block text-[10px] text-slate-500 font-normal font-sans">
                        {partner.dealsClosed} deals won
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-cyan-300 font-medium">
                      ${partner.activePipeline.toLocaleString()}
                    </td>

                    <td className="py-3.5 px-4">
                      <select
                        value={partner.assignedPOCId}
                        onChange={(e) => handlePOCReassign(partner.id, e.target.value)}
                        className="bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-[11px] text-slate-200 focus:outline-none focus:border-indigo-500"
                      >
                        {pocs.map((poc) => (
                          <option key={poc.id} value={poc.id}>
                            {poc.name} ({poc.role.slice(0, 3)})
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          partner.status === 'active'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/50'
                            : 'bg-rose-950 text-rose-400 border border-rose-800/50'
                        }`}
                      >
                        {partner.status.toUpperCase()}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => handleStatusToggle(partner.id, partner.status)}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-semibold transition-colors"
                      >
                        {partner.status === 'active' ? 'Suspend' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <AddPartnerModal
        isOpen={isAddPartnerOpen}
        onClose={() => setIsAddPartnerOpen(false)}
      />
    </div>
  );
};
