import React, { useState, useEffect } from 'react';
import { usePortal } from '../../context/PortalContext';
import {
  Search,
  Box,
  FolderGit2,
  PhoneCall,
  TicketPercent,
  Calculator,
  ShieldCheck,
  Building2,
  Lock,
  ArrowRight,
  Sparkles,
  Command,
  Users,
} from 'lucide-react';

export const CommandPalette: React.FC = () => {
  const {
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    role,
    setActiveTab,
    products,
    resources,
    coupons,
    partners,
    setActiveDocument,
    setActiveLiveSandbox,
    demos,
  } = usePortal();

  const [query, setQuery] = useState('');

  // Keyboard shortcut listener for Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(!isCommandPaletteOpen);
      } else if (e.key === 'Escape' && isCommandPaletteOpen) {
        setIsCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );
  const filteredResources = resources.filter((r) =>
    r.title.toLowerCase().includes(query.toLowerCase())
  );
  const filteredCoupons = coupons.filter(
    (c) =>
      c.code.toLowerCase().includes(query.toLowerCase()) ||
      c.title.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelectAction = (action: () => void) => {
    action();
    setIsCommandPaletteOpen(false);
    setQuery('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl">
        {/* Search Input */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3 bg-slate-950">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              role === 'admin'
                ? 'Search partners, coupons, deal approvals...'
                : 'Type a command, product, resource, or coupon code...'
            }
            className="w-full bg-transparent text-sm text-white focus:outline-none placeholder:text-slate-500"
          />
          <kbd className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono border border-slate-700">
            ESC
          </kbd>
        </div>

        {/* Results list */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-4 text-xs">
          {/* Quick Actions */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-3 mb-1.5">
              Quick Navigation
            </p>
            <div className="space-y-1">
              {role === 'partner' ? (
                <>
                  <button
                    onClick={() =>
                      handleSelectAction(() => {
                        setActiveTab('products');
                      })
                    }
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <Box className="w-4 h-4 text-cyan-400" />
                      <span>Browse Products &amp; Partner Margins</span>
                    </div>
                    <span className="text-[10px] text-slate-500">Navigate</span>
                  </button>

                  <button
                    onClick={() =>
                      handleSelectAction(() => {
                        setActiveTab('contact-poc');
                      })
                    }
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <PhoneCall className="w-4 h-4 text-emerald-400" />
                      <span>Contact Your POC (Sarah Jenkins PAM)</span>
                    </div>
                    <span className="text-[10px] text-slate-500">Live Channel</span>
                  </button>

                  <button
                    onClick={() =>
                      handleSelectAction(() => {
                        setActiveTab('coupons-deals');
                      })
                    }
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <TicketPercent className="w-4 h-4 text-purple-400" />
                      <span>View Active Partner Coupons &amp; Deals</span>
                    </div>
                    <span className="text-[10px] text-slate-500">Navigate</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() =>
                      handleSelectAction(() => {
                        setActiveTab('admin-partners');
                      })
                    }
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <Users className="w-4 h-4 text-indigo-400" />
                      <span>Manage Partner Organizations &amp; Tiers</span>
                    </div>
                    <span className="text-[10px] text-slate-500">Admin</span>
                  </button>

                  <button
                    onClick={() =>
                      handleSelectAction(() => {
                        setActiveTab('admin-coupons');
                      })
                    }
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <TicketPercent className="w-4 h-4 text-purple-400" />
                      <span>Issue &amp; Manage Partner Coupons</span>
                    </div>
                    <span className="text-[10px] text-slate-500">Admin</span>
                  </button>

                  <button
                    onClick={() =>
                      handleSelectAction(() => {
                        setActiveTab('admin-deals');
                      })
                    }
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-amber-400" />
                      <span>Review Deal Registrations &amp; Margin Approvals</span>
                    </div>
                    <span className="text-[10px] text-slate-500">Admin</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Products Search */}
          {filteredProducts.length > 0 && (
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-3 mb-1.5">
                Product Suites ({filteredProducts.length})
              </p>
              <div className="space-y-1">
                {filteredProducts.map((p) => (
                  <button
                    key={p.id}
                    onClick={() =>
                      handleSelectAction(() => {
                        setActiveTab('products');
                      })
                    }
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors text-left"
                  >
                    <div>
                      <p className="font-semibold text-white">{p.name}</p>
                      <p className="text-[10px] text-slate-400">{p.tagline}</p>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">
                      {p.partnerMarginPercent}% Margin
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Resources */}
          {filteredResources.length > 0 && role === 'partner' && (
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-3 mb-1.5">
                Sales Collateral &amp; Decks
              </p>
              <div className="space-y-1">
                {filteredResources.slice(0, 3).map((r) => (
                  <button
                    key={r.id}
                    onClick={() =>
                      handleSelectAction(() => {
                        setActiveDocument(r);
                      })
                    }
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors text-left"
                  >
                    <div className="flex items-center gap-2">
                      <FolderGit2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="truncate max-w-sm">{r.title}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">{r.format}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
