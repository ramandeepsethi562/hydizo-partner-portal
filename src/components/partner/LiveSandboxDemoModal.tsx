import React, { useState, useEffect } from 'react';
import { usePortal } from '../../context/PortalContext';
import {
  X,
  Play,
  Terminal,
  ShieldAlert,
  ShieldCheck,
  Activity,
  Server,
  Cloud,
  Layers,
  Copy,
  Check,
  ExternalLink,
  RefreshCw,
  Cpu,
  Lock,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const LiveSandboxDemoModal: React.FC = () => {
  const { activeLiveSandbox, setActiveLiveSandbox, showToast } = usePortal();

  const [activeTab, setActiveTab] = useState<'simulation' | 'api' | 'credentials'>('simulation');
  const [threatContained, setThreatContained] = useState(false);
  const [isSimulatingThreat, setIsSimulatingThreat] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Failover state
  const [awsActive, setAwsActive] = useState(true);
  const [failoverInProgress, setFailoverInProgress] = useState(false);

  // API playground state
  const [apiEndpoint, setApiEndpoint] = useState('/v1/shield/threat-scan');
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  const [isLoadingApi, setIsLoadingApi] = useState(false);

  if (!activeLiveSandbox) return null;

  const demoType = activeLiveSandbox.scenarioType || 'shield';

  const handleContainThreat = () => {
    setIsSimulatingThreat(true);
    setTimeout(() => {
      setIsSimulatingThreat(false);
      setThreatContained(true);
      showToast(
        'Threat Auto-Contained!',
        'Hydizo eBPF kernel agent isolated malicious container in 1.2s. 0 data exfiltrated.',
        'success'
      );
    }, 1200);
  };

  const handleTriggerFailover = () => {
    setFailoverInProgress(true);
    setTimeout(() => {
      setAwsActive(false);
      setFailoverInProgress(false);
      showToast(
        'Seamless Multi-Cloud Failover Completed',
        '100% of live traffic rerouted to GCP europe-west1 with 0 dropped TCP connections.',
        'info'
      );
    }, 1500);
  };

  const handleResetFailover = () => {
    setAwsActive(true);
  };

  const handleExecuteApi = () => {
    setIsLoadingApi(true);
    setTimeout(() => {
      setIsLoadingApi(false);
      if (apiEndpoint === '/v1/shield/threat-scan') {
        setApiResponse(
          JSON.stringify(
            {
              status: 'healthy',
              cluster_id: 'hydizo-prod-k8s-us1',
              cspm_score: 98.4,
              vulnerabilities: { critical: 0, high: 1, medium: 4 },
              ebpf_agent_version: 'v4.8.2-enterprise',
              compliance: { soc2: 'PASS', iso27001: 'PASS', hipaa: 'PASS' },
              scan_duration_ms: 142,
            },
            null,
            2
          )
        );
      } else if (apiEndpoint === '/v1/mesh/routes') {
        setApiResponse(
          JSON.stringify(
            {
              service_mesh: 'Hydizo CloudMesh Enterprise',
              mtls_mode: 'STRICT_CRYPTOGRAPHIC',
              active_nodes: 42,
              regions: ['aws-us-east-1', 'gcp-europe-west1', 'azure-southeast-1'],
              latency_p99_ms: 3.4,
              traffic_healthy: true,
            },
            null,
            2
          )
        );
      } else {
        setApiResponse(
          JSON.stringify(
            {
              partner: 'Apex Cloud Solutions',
              tier: 'Gold',
              current_margin_pct: 28,
              eligible_bonus: 'Q4 35% Spiff on Hydizo Shield',
              co_op_funds_usd: 18500,
              currency: 'USD',
            },
            null,
            2
          )
        );
      }
    }, 600);
  };

  const sandboxAccessUrl = `https://sandbox.hydizo.io/session/${activeLiveSandbox.id}?token=hyd_demo_apex_${Date.now().toString().slice(-6)}`;

  const handleCopySandboxUrl = () => {
    navigator.clipboard.writeText(sandboxAccessUrl);
    setCopiedLink(true);
    showToast('Sandbox Link Copied', 'Interactive 14-day client evaluation link copied to clipboard.', 'success');
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-5xl h-[88vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-950 border border-cyan-800/60 flex items-center justify-center text-cyan-400">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-white">
                  Hydizo Live Demo &amp; Sandbox Simulator
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Virtualized Pod
                </span>
              </div>
              <p className="text-xs text-slate-400 truncate max-w-md sm:max-w-xl">
                {activeLiveSandbox.title}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Tab navigation */}
            <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800 hidden sm:flex">
              <button
                onClick={() => setActiveTab('simulation')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'simulation'
                    ? 'bg-cyan-500 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Interactive Testbed
              </button>
              <button
                onClick={() => setActiveTab('api')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'api'
                    ? 'bg-cyan-500 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                API Playground
              </button>
              <button
                onClick={() => setActiveTab('credentials')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'credentials'
                    ? 'bg-cyan-500 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Client Share Link
              </button>
            </div>

            <button
              onClick={() => setActiveLiveSandbox(null)}
              className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-900/95">
          {/* TAB 1: INTERACTIVE TESTBED */}
          {activeTab === 'simulation' && (
            <div className="space-y-6">
              {demoType === 'shield' && (
                <div className="space-y-5">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 uppercase">
                        Active Simulated Threat Injection
                      </span>
                      <h4 className="text-base font-bold text-white mt-1">
                        Lateral Attacker Movement on Kubernetes Cluster `prod-us-east-1`
                      </h4>
                      <p className="text-xs text-slate-400">
                        Attacker gained ingress via CVE-2026-4412 and is attempting privileged host token theft.
                      </p>
                    </div>

                    <button
                      disabled={threatContained || isSimulatingThreat}
                      onClick={handleContainThreat}
                      className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 shadow-lg ${
                        threatContained
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-700/60 cursor-default'
                          : isSimulatingThreat
                          ? 'bg-amber-600 text-white animate-pulse'
                          : 'bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white shadow-red-900/30'
                      }`}
                    >
                      {threatContained ? (
                        <>
                          <ShieldCheck className="w-4 h-4 text-emerald-400" />
                          <span>Threat Neutralized (1.2s)</span>
                        </>
                      ) : isSimulatingThreat ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Executing eBPF Kernel Block...</span>
                        </>
                      ) : (
                        <>
                          <ShieldAlert className="w-4 h-4" />
                          <span>One-Click eBPF Containment</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Interactive Attack Topology Graph */}
                  <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-4">
                      Real-Time Autonomous Attack Path Graph
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                      {/* Node 1 */}
                      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
                        <div className="w-10 h-10 rounded-xl bg-slate-800 mx-auto flex items-center justify-center text-slate-300 mb-2">
                          <Cloud className="w-5 h-5" />
                        </div>
                        <p className="text-xs font-bold text-white">Public Ingress</p>
                        <span className="text-[10px] text-emerald-400 font-mono">200 OK • SSL Terminated</span>
                      </div>

                      {/* Arrow */}
                      <div className="hidden md:flex justify-center text-slate-600">
                        <ArrowRight className="w-5 h-5 animate-pulse text-cyan-400" />
                      </div>

                      {/* Node 2 - Compromised Pod */}
                      <div
                        className={`p-4 rounded-xl text-center border transition-all ${
                          threatContained
                            ? 'bg-emerald-950/40 border-emerald-600/50'
                            : 'bg-rose-950/40 border-rose-500 animate-pulse'
                        }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-xl mx-auto flex items-center justify-center mb-2 ${
                            threatContained
                              ? 'bg-emerald-900 text-emerald-300'
                              : 'bg-rose-900 text-rose-300'
                          }`}
                        >
                          {threatContained ? <Lock className="w-5 h-5" /> : <ShieldAlert className="w-5 h-5" />}
                        </div>
                        <p className="text-xs font-bold text-white">Auth Pod (CVE-2026)</p>
                        <span
                          className={`text-[10px] font-bold font-mono ${
                            threatContained ? 'text-emerald-400' : 'text-rose-400'
                          }`}
                        >
                          {threatContained ? 'Quarantined / eBPF Frozen' : 'Privilege Escalation Detected'}
                        </span>
                      </div>

                      {/* Arrow */}
                      <div className="hidden md:flex justify-center text-slate-600">
                        <ArrowRight className="w-5 h-5 text-slate-600" />
                      </div>

                      {/* Node 3 - Target Database */}
                      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
                        <div className="w-10 h-10 rounded-xl bg-slate-800 mx-auto flex items-center justify-center text-slate-300 mb-2">
                          <Server className="w-5 h-5" />
                        </div>
                        <p className="text-xs font-bold text-white">Customer Database</p>
                        <span className="text-[10px] text-emerald-400 font-mono">100% Secure • 0 Access</span>
                      </div>
                    </div>
                  </div>

                  {/* Terminal Log Stream */}
                  <div className="rounded-xl bg-slate-950 border border-slate-800 overflow-hidden font-mono text-[11px]">
                    <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-slate-400 text-[10px]">
                      <span className="flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                        hydizo-secops-daemon --live-stream
                      </span>
                      <span>Buffer: 4096 lines</span>
                    </div>
                    <div className="p-4 space-y-1 text-slate-300 h-36 overflow-y-auto">
                      <p className="text-slate-500">[17:41:02] [KERNEL-EBPF] Hooked syscall tracepoint on cgroup /k8s/pod_auth_7f9</p>
                      <p className="text-amber-400">[17:41:05] [ALERT] Process "curl" attempted raw socket connection to 169.254.169.254 (Metadata Service)</p>
                      <p className="text-rose-400">[17:41:07] [SECOPS-AI] Heuristic score 0.99 (High Confidence Lateral Attacker)</p>
                      {threatContained ? (
                        <>
                          <p className="text-emerald-400 font-bold">[17:41:10] [REMEDIATION] Action: eBPF drop_packet + freeze_cgroup applied in 1,210μs</p>
                          <p className="text-cyan-400">[17:41:11] [COMPLIANCE] Generated tamper-evident cryptographic forensic log #audit-99214</p>
                        </>
                      ) : (
                        <p className="text-amber-300 animate-pulse">[17:41:09] Waiting for partner operator action to isolate threat...</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {demoType === 'cloudmesh' && (
                <div className="space-y-5">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 uppercase">
                        Multi-Cloud Resiliency Simulator
                      </span>
                      <h4 className="text-base font-bold text-white mt-1">
                        Active Traffic: 50,000 req/sec across AWS (us-east-1) &amp; GCP (europe-west1)
                      </h4>
                      <p className="text-xs text-slate-400">
                        Hydizo CloudMesh provides cryptographic mTLS and sub-second region failover.
                      </p>
                    </div>

                    <div className="flex gap-2">
                      {awsActive ? (
                        <button
                          disabled={failoverInProgress}
                          onClick={handleTriggerFailover}
                          className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-md shadow-rose-900/30"
                        >
                          <Activity className="w-4 h-4" />
                          <span>Simulate AWS Outage</span>
                        </button>
                      ) : (
                        <button
                          onClick={handleResetFailover}
                          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors flex items-center gap-1.5 border border-slate-700"
                        >
                          <RefreshCw className="w-4 h-4 text-cyan-400" />
                          <span>Restore AWS Region</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Dual Cloud Visual Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Cloud 1: AWS */}
                    <div
                      className={`p-5 rounded-2xl border transition-all ${
                        awsActive
                          ? 'bg-slate-950 border-slate-800'
                          : 'bg-rose-950/20 border-rose-800/60'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Cloud className="w-5 h-5 text-amber-400" />
                          <h5 className="text-xs font-bold text-white">AWS us-east-1 (N. Virginia)</h5>
                        </div>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            awsActive
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                              : 'bg-rose-950 text-rose-400 border border-rose-800'
                          }`}
                        >
                          {awsActive ? 'OPERATIONAL' : 'OUTAGE SIMULATED'}
                        </span>
                      </div>
                      <div className="space-y-2 text-xs text-slate-300">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Traffic Ingress:</span>
                          <span className="font-mono">{awsActive ? '25,000 req/s' : '0 req/s (Diverted)'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">p99 Latency:</span>
                          <span className="font-mono">{awsActive ? '12.4 ms' : 'N/A'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Cloud 2: GCP */}
                    <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/40 shadow-emerald-950/20">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Cloud className="w-5 h-5 text-blue-400" />
                          <h5 className="text-xs font-bold text-white">GCP europe-west1 (Belgium)</h5>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                          {awsActive ? 'HEALTHY (50% Load)' : 'HEALTHY (100% Load Absorbed)'}
                        </span>
                      </div>
                      <div className="space-y-2 text-xs text-slate-300">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Traffic Ingress:</span>
                          <span className="font-mono text-emerald-400 font-bold">
                            {awsActive ? '25,000 req/s' : '50,000 req/s'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">p99 Latency:</span>
                          <span className="font-mono">14.1 ms (mTLS Accelerated)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {demoType === 'zerotrust' && (
                <div className="space-y-5">
                  <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-950 border border-cyan-800 text-cyan-400 mx-auto flex items-center justify-center mb-3">
                      <Lock className="w-6 h-6" />
                    </div>
                    <h4 className="text-base font-bold text-white">Hydizo ZeroTrust Access (ZTA) SASE Gateway</h4>
                    <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
                      Context-aware biometric authorization and SSH bastion recording without legacy corporate VPN bottlenecks.
                    </p>

                    <div className="mt-6 max-w-sm mx-auto p-4 rounded-xl bg-slate-900 border border-slate-800 text-left space-y-3">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Device Posture:</span>
                        <span className="text-emerald-400 font-semibold">Compliant (macOS 15.1, FileVault ON)</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Identity Provider:</span>
                        <span className="text-cyan-400 font-semibold">Okta Verify Biometric FIDO2</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Session Policy:</span>
                        <span className="text-white font-semibold">Dynamic Just-In-Time 4 Hour Lease</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: API PLAYGROUND */}
          {activeTab === 'api' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <select
                  value={apiEndpoint}
                  onChange={(e) => setApiEndpoint(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-cyan-500"
                >
                  <option value="/v1/shield/threat-scan">GET /v1/shield/threat-scan</option>
                  <option value="/v1/mesh/routes">GET /v1/mesh/routes</option>
                  <option value="/v1/partner/margin-calculator">GET /v1/partner/margin-calculator</option>
                </select>

                <button
                  onClick={handleExecuteApi}
                  disabled={isLoadingApi}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs transition-all shadow-md shadow-cyan-600/30 flex items-center justify-center gap-2"
                >
                  {isLoadingApi ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Play className="w-4 h-4 fill-white" />
                  )}
                  <span>Send Request</span>
                </button>
              </div>

              {/* Response window */}
              <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs">
                <div className="flex justify-between text-slate-500 text-[11px] mb-2 pb-2 border-b border-slate-800">
                  <span>HTTP/2 200 OK • Response Format: application/json</span>
                  <span>Hydizo API Gateway v4.8</span>
                </div>
                <pre className="text-cyan-300 overflow-x-auto whitespace-pre-wrap">
                  {apiResponse || '// Click "Send Request" to test live API endpoint'}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 3: CLIENT SHARE LINK */}
          {activeTab === 'credentials' && (
            <div className="space-y-4 max-w-xl mx-auto py-6">
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-950 text-emerald-400 mx-auto flex items-center justify-center">
                  <ExternalLink className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white">Shareable Client Evaluation Sandbox</h4>
                <p className="text-xs text-slate-400">
                  Send this 14-day dedicated access URL to prospective client stakeholders. Includes full read-only access to synthetic telemetry and compliance dashboards.
                </p>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300 truncate mr-2">{sandboxAccessUrl}</span>
                  <button
                    onClick={handleCopySandboxUrl}
                    className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition-colors shrink-0 flex items-center gap-1.5"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
