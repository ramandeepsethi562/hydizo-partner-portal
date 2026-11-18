import React, { useState } from 'react';
import { usePortal } from '../../context/PortalContext';
import {
  FolderGit2,
  FileText,
  Download,
  PlayCircle,
  ShieldCheck,
  Award,
  Sparkles,
  Server,
  Search,
  ExternalLink,
  CheckCircle2,
  Clock,
  Layers,
  FileCode,
  Eye,
  Terminal,
} from 'lucide-react';
import { LaunchSandboxModal } from './LaunchSandboxModal';

export const ResourcesDemosView: React.FC = () => {
  const { resources, demos, showToast, setActiveDocument, setActiveLiveSandbox } = usePortal();

  const [activeSubTab, setActiveSubTab] = useState<'collateral' | 'demos' | 'academy'>('collateral');
  const [resourceFilter, setResourceFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSandboxModalOpen, setIsSandboxModalOpen] = useState(false);
  const [selectedDemoTitle, setSelectedDemoTitle] = useState<string | undefined>(undefined);

  const categories = ['All', 'Pitch Deck', 'Technical Guide', 'Case Study', 'Compliance', 'Whitepaper'];

  const filteredResources = resources.filter((r) => {
    const matchesFilter = resourceFilter === 'All' || r.category === resourceFilter;
    const matchesSearch =
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleDownloadResource = (title: string, format: string) => {
    showToast(
      'Document Download Started',
      `Downloading "${title}" [${format}]. Official partner watermarking applied.`,
      'success'
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <FolderGit2 className="w-5 h-5 text-cyan-400" />
            Partner Enablement Resources &amp; Demo Sandbox Lab
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Sales pitch decks, competitor battlecards, compliance packages, and self-service isolated demo environments
          </p>
        </div>

        {/* Sub-tab Navigation */}
        <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveSubTab('collateral')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeSubTab === 'collateral'
                ? 'bg-cyan-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sales Collateral
          </button>
          <button
            onClick={() => setActiveSubTab('demos')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeSubTab === 'demos'
                ? 'bg-cyan-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <PlayCircle className="w-3.5 h-3.5" />
            <span>Interactive Demos &amp; Sandbox</span>
          </button>
          <button
            onClick={() => setActiveSubTab('academy')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeSubTab === 'academy'
                ? 'bg-cyan-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Partner Academy</span>
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: COLLATERAL */}
      {activeSubTab === 'collateral' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Category Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setResourceFilter(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    resourceFilter === cat
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search decks, battlecards..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredResources.map((res) => (
              <div
                key={res.id}
                className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between shadow-md group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-cyan-300 border border-slate-700">
                      {res.category}
                    </span>
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                      {res.format} • {res.size}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {res.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                    {res.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-500">
                    {res.downloadCount.toLocaleString()} downloads
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setActiveDocument(res)}
                      className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors flex items-center gap-1"
                      title="Preview Document"
                    >
                      <Eye className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Preview</span>
                    </button>
                    <button
                      onClick={() => handleDownloadResource(res.title, res.format)}
                      className="p-1.5 rounded-xl bg-cyan-950 hover:bg-cyan-900/80 border border-cyan-700/50 text-cyan-300 transition-colors"
                      title="Download"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 2: INTERACTIVE DEMOS & SANDBOX */}
      {activeSubTab === 'demos' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-slate-900 border border-cyan-800/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-cyan-900 text-cyan-300 border border-cyan-700">
                Self-Service Partner Sandbox Cloud
              </span>
              <h3 className="text-base font-bold text-white mt-1">
                Spin Up Dedicated 14-Day Customer Sandbox Environments
              </h3>
              <p className="text-xs text-slate-300 max-w-2xl mt-0.5">
                Provide prospective enterprise customers with a sandboxed, pre-configured multi-cloud instance loaded with synthetic workloads and compliance dashboards.
              </p>
            </div>
            <button
              onClick={() => setIsSandboxModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs transition-all shadow-md shadow-cyan-600/30 shrink-0 flex items-center gap-2"
            >
              <Server className="w-4 h-4" />
              <span>Provision Client Sandbox</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {demos.map((demo) => (
              <div
                key={demo.id}
                className="overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between shadow-lg"
              >
                <div className="relative h-44 w-full overflow-hidden bg-slate-950">
                  <img
                    src={demo.thumbnail}
                    alt={demo.title}
                    className="w-full h-full object-cover opacity-60 hover:opacity-80 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-950/90 text-cyan-300 border border-slate-800 backdrop-blur-md">
                      {demo.type}
                    </span>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-900/90 text-slate-300 border border-slate-800">
                      {demo.duration}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-base font-bold text-white">{demo.title}</h4>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      {demo.description}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {demo.tags.map((t, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/60"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-800 flex items-center gap-2">
                    {demo.sandboxAvailable ? (
                      <button
                        onClick={() => setActiveLiveSandbox(demo)}
                        className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5 shadow-md shadow-cyan-900/20"
                      >
                        <Terminal className="w-4 h-4" />
                        <span>Launch Live Interactive Simulator</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => showToast('Playing Demo Walkthrough', 'Streaming video demo in HD...', 'info')}
                        className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                      >
                        <PlayCircle className="w-4 h-4 text-cyan-400" />
                        <span>Watch 12-Min Video Tour</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: ACADEMY */}
      {activeSubTab === 'academy' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              Hydizo Partner Certification Academy
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Accredited online certifications for partner sales executives and solutions architects. Earn badges and higher tier margins.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
              {[
                {
                  title: 'Hydizo Certified Sales Specialist (HCSS)',
                  level: 'Associate',
                  duration: '2.5 Hours',
                  progress: 100,
                  status: 'Certified (Badge Active)',
                  badgeColor: 'border-emerald-500/40 bg-emerald-950/30 text-emerald-400',
                },
                {
                  title: 'Hydizo CloudMesh Solutions Architect (HCSA)',
                  level: 'Professional',
                  duration: '6 Hours',
                  progress: 65,
                  status: 'In Progress (Module 4 of 6)',
                  badgeColor: 'border-cyan-500/40 bg-cyan-950/30 text-cyan-300',
                },
                {
                  title: 'Hydizo Shield SecOps Deployment Expert (HSED)',
                  level: 'Expert',
                  duration: '8 Hours',
                  progress: 20,
                  status: 'Enrolled',
                  badgeColor: 'border-purple-500/40 bg-purple-950/30 text-purple-300',
                },
              ].map((cert, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between"
                >
                  <div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${cert.badgeColor}`}>
                      {cert.level} • {cert.duration}
                    </span>
                    <h4 className="text-sm font-bold text-white mt-2">{cert.title}</h4>
                    <p className="text-xs text-slate-400 mt-1">{cert.status}</p>

                    <div className="mt-3">
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-cyan-400 h-full rounded-full"
                          style={{ width: `${cert.progress}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-slate-500 mt-1 block">
                        {cert.progress}% Completed
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => showToast('Course Opened', `Resumed training for ${cert.title}`, 'info')}
                    className="mt-4 w-full py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs text-slate-200 border border-slate-700 font-semibold transition-colors"
                  >
                    {cert.progress === 100 ? 'View Certificate & Badge' : 'Resume Course'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      <LaunchSandboxModal
        isOpen={isSandboxModalOpen}
        onClose={() => setIsSandboxModalOpen(false)}
        defaultDemoTitle={selectedDemoTitle}
      />
    </div>
  );
};
