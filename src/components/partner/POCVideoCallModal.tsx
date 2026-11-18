import React, { useState, useEffect } from 'react';
import { usePortal } from '../../context/PortalContext';
import {
  PhoneOff,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Share2,
  MessageSquare,
  FileText,
  CheckCircle2,
  Sparkles,
  Users,
} from 'lucide-react';

export const POCVideoCallModal: React.FC = () => {
  const { activeVideoCallPOC, setActiveVideoCallPOC, currentPartner, showToast } = usePortal();

  const [callSeconds, setCallSeconds] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isSharingScreen, setIsSharingScreen] = useState(false);
  const [meetingNotes, setMeetingNotes] = useState(
    '- Reviewed Global FinStream Capital architecture requirements\n- David Chen confirmed 42-cluster mesh sizing and 28% margin lock\n- Target quote review scheduled for this Thursday'
  );

  useEffect(() => {
    if (!activeVideoCallPOC) {
      setCallSeconds(0);
      return;
    }
    const timer = setInterval(() => {
      setCallSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [activeVideoCallPOC]);

  if (!activeVideoCallPOC) return null;

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remainingSecs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    showToast(
      'Strategy Call Concluded',
      `Meeting with ${activeVideoCallPOC.name} logged. Joint minutes dispatched to ${activeVideoCallPOC.slackChannel}.`,
      'info'
    );
    setActiveVideoCallPOC(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl h-[85vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Top Header */}
        <div className="px-6 py-3 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white">
                  Hydizo Partner Strategy Room
                </h3>
                <span className="text-[11px] font-mono text-emerald-400 font-bold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800/40">
                  {formatTimer(callSeconds)}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Connected with {activeVideoCallPOC.name} ({activeVideoCallPOC.role})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
            <span className="font-mono">1080p • 24ms WebRTC</span>
          </div>
        </div>

        {/* Video Area Split */}
        <div className="flex-1 p-4 grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 overflow-hidden">
          {/* POC Video Stream */}
          <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 flex flex-col items-center justify-center group">
            <img
              src={activeVideoCallPOC.avatar}
              alt={activeVideoCallPOC.name}
              className="w-32 h-32 rounded-full object-cover ring-4 ring-cyan-500/40 shadow-2xl"
            />
            <div className="mt-4 text-center">
              <h4 className="text-base font-bold text-white">{activeVideoCallPOC.name}</h4>
              <p className="text-xs text-cyan-400">{activeVideoCallPOC.role}</p>
              <div className="mt-2 flex items-center justify-center gap-1.5 text-[11px] text-emerald-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Speaking (Active Audio)
              </div>
            </div>

            <div className="absolute bottom-3 left-3 px-2 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md text-[10px] text-slate-300 font-mono">
              Hydizo Alliance Lead • San Francisco HQ
            </div>
          </div>

          {/* Partner Video Stream / Screen Share */}
          <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 flex flex-col items-center justify-center">
            {isSharingScreen ? (
              <div className="w-full h-full p-4 flex flex-col justify-between bg-slate-950">
                <div className="text-xs text-cyan-400 font-semibold flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  <span>Sharing Screen: Global FinStream Architecture Diagram.drawio</span>
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center font-mono text-xs text-slate-300">
                    [Shared Screen Active: Hydizo Multi-Cloud Ingress &lt;--&gt; 42 K8s Nodes]
                  </div>
                </div>
              </div>
            ) : isVideoOn ? (
              <div className="text-center">
                <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-cyan-600 to-blue-700 flex items-center justify-center text-2xl font-bold text-white shadow-xl ring-4 ring-slate-700">
                  AR
                </div>
                <h4 className="text-sm font-bold text-white mt-3">Alex Rivera (You)</h4>
                <p className="text-xs text-slate-400">{currentPartner.name}</p>
              </div>
            ) : (
              <div className="text-center text-slate-500 text-xs">
                <VideoOff className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <span>Your camera is muted</span>
              </div>
            )}

            <div className="absolute bottom-3 left-3 px-2 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md text-[10px] text-slate-300 font-mono">
              {currentPartner.name}
            </div>
          </div>
        </div>

        {/* Bottom Meeting Scratchpad & Controls */}
        <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`p-3 rounded-full transition-colors ${
                isMuted ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
              }`}
              title={isMuted ? 'Unmute Mic' : 'Mute Mic'}
            >
              {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setIsVideoOn(!isVideoOn)}
              className={`p-3 rounded-full transition-colors ${
                !isVideoOn ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
              }`}
              title={!isVideoOn ? 'Turn Video On' : 'Turn Video Off'}
            >
              {isVideoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setIsSharingScreen(!isSharingScreen)}
              className={`p-3 rounded-full transition-colors ${
                isSharingScreen ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
              }`}
              title="Share Screen"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              onClick={handleEndCall}
              className="px-5 py-2.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-colors flex items-center gap-2 shadow-lg shadow-rose-900/40 ml-2"
            >
              <PhoneOff className="w-4 h-4" />
              <span>Leave Strategy Room</span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Slack Minutes Auto-Sync to</span>
            <span className="font-semibold text-cyan-300 font-mono">{activeVideoCallPOC.slackChannel}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
