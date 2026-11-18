import React, { useState } from 'react';
import { usePortal } from '../../context/PortalContext';
import {
  X,
  FileText,
  Download,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Award,
  Layers,
  Sparkles,
} from 'lucide-react';

export const DocumentPreviewModal: React.FC = () => {
  const { activeDocument, setActiveDocument, currentPartner, showToast } = usePortal();

  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = activeDocument?.slidesCount || 4;

  if (!activeDocument) return null;

  const handleDownload = () => {
    showToast(
      'Document Download Started',
      `Downloading "${activeDocument.title}" [${activeDocument.format}]. Watermarked for ${currentPartner.name}.`,
      'success'
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl h-[85vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-white truncate max-w-md">
                  {activeDocument.title}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-cyan-300 font-mono">
                  {activeDocument.format} • {activeDocument.size}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Authorized for exclusive use by <strong className="text-slate-200">{currentPartner.name}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs transition-all shadow-md shadow-cyan-600/20 flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Official Copy</span>
            </button>

            <button
              onClick={() => setActiveDocument(null)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Document Content Viewer */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-950 flex flex-col justify-between">
          {/* Pitch Deck Preview */}
          {activeDocument.category === 'Pitch Deck' && (
            <div className="flex-1 flex flex-col justify-between">
              <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 min-h-[380px] flex flex-col justify-between relative overflow-hidden">
                <div className="absolute right-0 top-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

                <div>
                  <div className="flex justify-between items-center text-xs text-slate-500 pb-4 border-b border-slate-800/80 mb-6">
                    <span className="font-extrabold text-cyan-400 tracking-wider">HYDIZO ENTERPRISE CO-SELL DECK</span>
                    <span className="font-mono">Slide {currentSlide} of {totalSlides}</span>
                  </div>

                  {currentSlide === 1 && (
                    <div className="space-y-4">
                      <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Executive Presentation</span>
                      <h2 className="text-2xl font-black text-white">Modernizing Cloud Mesh &amp; Autonomous SecOps</h2>
                      <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
                        Presented by <strong>{currentPartner.name}</strong> in joint partnership with Hydizo Global Alliances.
                      </p>
                      <div className="grid grid-cols-3 gap-3 pt-4">
                        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                          <p className="text-xl font-bold text-cyan-300">60%</p>
                          <p className="text-[11px] text-slate-400">Lower CPU Overhead vs Istio</p>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                          <p className="text-xl font-bold text-emerald-400">&lt; 3s</p>
                          <p className="text-[11px] text-slate-400">Lateral Threat Auto-Containment</p>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                          <p className="text-xl font-bold text-purple-400">99.999%</p>
                          <p className="text-[11px] text-slate-400">Carrier-Grade Uptime SLA</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentSlide === 2 && (
                    <div className="space-y-4">
                      <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Industry Challenges</span>
                      <h2 className="text-2xl font-black text-white">The Cost of Cloud Tool Sprawl &amp; VPN Friction</h2>
                      <ul className="space-y-2.5 text-xs text-slate-300">
                        <li className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-amber-400" />
                          <span>Enterprise teams juggle 12+ disconnected observability &amp; security agents.</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-amber-400" />
                          <span>Legacy corporate VPNs introduce 120ms latency and lack granular device posture checks.</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-amber-400" />
                          <span>Multi-cloud traffic between AWS and GCP is vulnerable to eavesdropping and configuration drift.</span>
                        </li>
                      </ul>
                    </div>
                  )}

                  {currentSlide === 3 && (
                    <div className="space-y-4">
                      <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Solution Architecture</span>
                      <h2 className="text-2xl font-black text-white">Unified Zero-Trust Multi-Cloud Data Plane</h2>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Hydizo unifies service mesh, autonomous SecOps threat response, and biometric SASE remote access into an eBPF-accelerated runtime.
                      </p>
                      <div className="p-4 rounded-xl bg-slate-950 border border-cyan-800/40 text-xs font-mono text-cyan-300">
                        Kubernetes (AWS/GCP/Azure) &lt;-- mTLS eBPF Mesh --&gt; Hydizo Global Core &lt;-- ZeroTrust Access --&gt; Enterprise Clients
                      </div>
                    </div>
                  )}

                  {currentSlide === 4 && (
                    <div className="space-y-4">
                      <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">Commercial ROI &amp; Next Steps</span>
                      <h2 className="text-2xl font-black text-white">Exclusive Partner Pilot Program</h2>
                      <p className="text-xs text-slate-300">
                        14-Day zero-friction sandbox trial sponsored by {currentPartner.name} with custom architecture sizing.
                      </p>
                    </div>
                  )}
                </div>

                {/* Footer Controls */}
                <div className="flex justify-between items-center pt-4 border-t border-slate-800/80">
                  <button
                    disabled={currentSlide === 1}
                    onClick={() => setCurrentSlide((s) => Math.max(1, s - 1))}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 disabled:opacity-40 text-xs text-slate-200 font-semibold flex items-center gap-1"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous Slide</span>
                  </button>

                  <div className="flex gap-1.5">
                    {Array.from({ length: totalSlides }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentSlide(i + 1)}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${
                          currentSlide === i + 1 ? 'bg-cyan-400 w-6' : 'bg-slate-700'
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    disabled={currentSlide === totalSlides}
                    onClick={() => setCurrentSlide((s) => Math.min(totalSlides, s + 1))}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 disabled:opacity-40 text-xs text-slate-200 font-semibold flex items-center gap-1"
                  >
                    <span>Next Slide</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Battlecard Preview */}
          {activeDocument.category === 'Technical Guide' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                <h3 className="text-sm font-bold text-white mb-3">Competitive Feature Matrix: Hydizo vs. Competitors</h3>
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="py-2.5">Feature &amp; Metric</th>
                      <th className="py-2.5 text-cyan-400 font-bold">Hydizo Enterprise</th>
                      <th className="py-2.5 text-slate-400">Wiz SecOps</th>
                      <th className="py-2.5 text-slate-400">Datadog</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    <tr>
                      <td className="py-2.5 font-semibold text-white">eBPF Active Auto-Remediation</td>
                      <td className="py-2.5 text-emerald-400 font-bold">Yes (&lt;3s automated)</td>
                      <td className="py-2.5 text-slate-400">Agentless Only (Alerts Only)</td>
                      <td className="py-2.5 text-slate-400">No (Monitoring Only)</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-semibold text-white">Multi-Cloud Unified Service Mesh</td>
                      <td className="py-2.5 text-emerald-400 font-bold">Native Included</td>
                      <td className="py-2.5 text-slate-500">Not Available</td>
                      <td className="py-2.5 text-slate-500">Not Available</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-semibold text-white">Partner Margin Guarantee</td>
                      <td className="py-2.5 text-emerald-400 font-bold">28% - 35% Protected</td>
                      <td className="py-2.5 text-slate-400">15% - 20%</td>
                      <td className="py-2.5 text-slate-400">12% - 18%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Compliance Package Preview */}
          {activeDocument.category === 'Compliance' && (
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-950 text-emerald-400 mx-auto flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">Hydizo SOC 2 Type II &amp; ISO 27001 Auditor Package</h3>
              <p className="text-xs text-slate-300 max-w-lg mx-auto">
                Independent CPA audit report conducted by Ernst &amp; Young (EY). Certifies zero exceptions across Security, Availability, and Confidentiality trust principles.
              </p>
              <div className="inline-block px-4 py-2 rounded-xl bg-slate-950 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
                Report ID: EY-SOC2-HYDIZO-2026-FINAL • Valid Through: Q4 2027
              </div>
            </div>
          )}

          {/* Watermarking footer */}
          <div className="pt-3 border-t border-slate-800 text-center text-[10px] text-slate-500 font-mono">
            CONFIDENTIAL • LICENSED EXCLUSIVELY TO {currentPartner.name.toUpperCase()} • HYDIZO CHANNEL PARTNER AGREEMENT
          </div>
        </div>
      </div>
    </div>
  );
};
