import React, { useState } from 'react';
import { usePortal } from '../../context/PortalContext';
import {
  ShieldAlert,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Award,
  DollarSign,
  Building,
  Clock,
  Layers,
  Sparkles,
} from 'lucide-react';
import { DealRegistration } from '../../types';

export const AdminDealRegistrationsView: React.FC = () => {
  const { deals, updateDealStatus, pocs, showToast } = usePortal();

  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDeals = deals.filter((d) => {
    const matchesSearch =
      d.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.partnerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.productInterested.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || d.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-400" />
            Deal Registrations &amp; Margin Protection Approvals
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Review partner-submitted opportunities, prevent channel conflicts, and grant 90-120 day price protection
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300 font-mono">
            {deals.filter((d) => d.status === 'Pending Review').length} Awaiting Approval
          </span>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs font-semibold text-slate-400">Status:</span>
          {(['All', 'Pending Review', 'Approved', 'Closed-Won', 'Rejected'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                statusFilter === st
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
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
            placeholder="Search client, partner..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/60">
                <th className="py-3 px-4 font-semibold">Deal &amp; Prospect</th>
                <th className="py-3 px-4 font-semibold">Sponsoring Partner</th>
                <th className="py-3 px-4 font-semibold">Product Requested</th>
                <th className="py-3 px-4 font-semibold">Deal Value</th>
                <th className="py-3 px-4 font-semibold">Target Close</th>
                <th className="py-3 px-4 font-semibold">Protection Status</th>
                <th className="py-3 px-4 font-semibold">Workflow Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredDeals.map((deal) => (
                <tr key={deal.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <span className="font-mono text-[10px] text-slate-500 block">
                      #{deal.id} • {deal.submissionDate}
                    </span>
                    <div className="font-bold text-white text-xs">{deal.clientName}</div>
                    <span className="text-[10px] text-slate-400">{deal.clientIndustry}</span>
                    {deal.notes && (
                      <p className="text-[11px] text-slate-400 italic mt-0.5 max-w-xs">
                        "{deal.notes}"
                      </p>
                    )}
                  </td>

                  <td className="py-3.5 px-4 font-semibold text-cyan-300">
                    {deal.partnerName}
                  </td>

                  <td className="py-3.5 px-4 text-slate-300 max-w-[170px] truncate">
                    {deal.productInterested}
                  </td>

                  <td className="py-3.5 px-4 font-mono font-bold text-white">
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
                          : deal.status === 'Rejected'
                          ? 'bg-rose-950 text-rose-400 border border-rose-800/50'
                          : 'bg-amber-950 text-amber-300 border border-amber-800/50'
                      }`}
                    >
                      {deal.status}
                    </span>
                    <span className="block text-[10px] text-slate-400 mt-1 font-mono">
                      {deal.protectedUntil}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {deal.status === 'Pending Review' && (
                        <>
                          <button
                            onClick={() => updateDealStatus(deal.id, 'Approved')}
                            className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-[11px] transition-colors flex items-center gap-1"
                          >
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Approve</span>
                          </button>
                          <button
                            onClick={() => updateDealStatus(deal.id, 'Rejected')}
                            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-rose-950 text-slate-300 hover:text-rose-400 font-semibold text-[11px] transition-colors"
                          >
                            Reject
                          </button>
                        </>
                      )}

                      {deal.status === 'Approved' && (
                        <button
                          onClick={() => updateDealStatus(deal.id, 'Closed-Won')}
                          className="px-2.5 py-1 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-[11px] transition-colors flex items-center gap-1"
                        >
                          <Award className="w-3 h-3" />
                          <span>Mark Won</span>
                        </button>
                      )}

                      {deal.status === 'Closed-Won' && (
                        <span className="text-[11px] text-emerald-400 font-semibold">
                          Commission Paid
                        </span>
                      )}

                      {deal.status === 'Rejected' && (
                        <button
                          onClick={() => updateDealStatus(deal.id, 'Approved')}
                          className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px]"
                        >
                          Reopen &amp; Approve
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
