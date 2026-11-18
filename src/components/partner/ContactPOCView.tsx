import React, { useState } from 'react';
import { usePortal } from '../../context/PortalContext';
import {
  PhoneCall,
  Mail,
  MessageSquare,
  Calendar,
  Clock,
  Sparkles,
  Send,
  Video,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  Users,
  Paperclip,
  Zap,
} from 'lucide-react';

export const ContactPOCView: React.FC = () => {
  const {
    pocs,
    currentPartner,
    messages,
    sendMessageToPOC,
    bookMeetingWithPOC,
    bookings,
    showToast,
    setActiveVideoCallPOC,
  } = usePortal();

  const [selectedPocId, setSelectedPocId] = useState<string>(pocs[0]?.id || 'poc-1');
  const [meetingDate, setMeetingDate] = useState('2026-11-18');
  const [meetingTimeSlot, setMeetingTimeSlot] = useState('11:00 AM PST');
  const [meetingTopic, setMeetingTopic] = useState('Deal Strategy & Architecture Sizing');
  const [clientName, setClientName] = useState('');

  // Chat input state
  const [messageText, setMessageText] = useState('');
  const [messageTag, setMessageTag] = useState<'general' | 'deal-inquiry' | 'quote' | 'urgent'>('deal-inquiry');

  const selectedPOC = pocs.find((p) => p.id === selectedPocId) || pocs[0];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    bookMeetingWithPOC({
      pocId: selectedPocId,
      date: meetingDate,
      timeSlot: meetingTimeSlot,
      meetingTopic,
      clientName: clientName || undefined,
    });
    setClientName('');
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    sendMessageToPOC(messageText, messageTag);
    setMessageText('');
  };

  const handlePresetMessage = (preset: string, tag: any) => {
    sendMessageToPOC(preset, tag);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <PhoneCall className="w-5 h-5 text-cyan-400" />
            Contact Your Dedicated Hydizo POC (Point of Contact)
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Direct access to your assigned Partner Account Manager (PAM), Solutions Architect (SE), and Alliance Leadership
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveVideoCallPOC(selectedPOC)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs transition-all shadow-md shadow-cyan-600/30 flex items-center gap-2"
          >
            <Video className="w-4 h-4" />
            <span>Launch Video Strategy Room</span>
          </button>
        </div>
      </div>

      {/* POC Team Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {pocs.map((poc) => {
          const isSelected = selectedPocId === poc.id;
          return (
            <div
              key={poc.id}
              onClick={() => setSelectedPocId(poc.id)}
              className={`cursor-pointer p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-900 border-cyan-500 shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-500/30'
                  : 'bg-slate-900/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="relative">
                    <img
                      src={poc.avatar}
                      alt={poc.name}
                      className="w-14 h-14 rounded-2xl object-cover ring-2 ring-slate-700"
                    />
                    <span
                      className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full ring-2 ring-slate-900 ${
                        poc.status === 'online'
                          ? 'bg-emerald-400'
                          : poc.status === 'busy'
                          ? 'bg-amber-400'
                          : 'bg-slate-500'
                      }`}
                    />
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      poc.status === 'online'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/40'
                        : 'bg-amber-950 text-amber-400 border border-amber-800/40'
                    }`}
                  >
                    {poc.status}
                  </span>
                </div>

                <div className="mt-3">
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    {poc.name}
                  </h3>
                  <p className="text-xs text-cyan-400 font-semibold">{poc.role}</p>
                  <p className="text-[11px] text-slate-400">{poc.title}</p>
                </div>

                <p className="text-xs text-slate-300 mt-2.5 leading-relaxed line-clamp-2">
                  {poc.bio}
                </p>

                <div className="mt-3 pt-3 border-t border-slate-800/80 space-y-1 text-[11px] text-slate-400">
                  <p className="flex items-center gap-1.5 truncate">
                    <Mail className="w-3.5 h-3.5 text-slate-500" />
                    <span>{poc.email}</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <PhoneCall className="w-3.5 h-3.5 text-slate-500" />
                    <span>{poc.phone}</span>
                  </p>
                  <p className="text-[10px] text-slate-500 font-mono mt-1">{poc.timezone}</p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-semibold">
                <span className="text-cyan-400">{poc.slackChannel}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveVideoCallPOC(poc);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-cyan-950 text-cyan-300 border border-slate-700 hover:border-cyan-500 text-[10px] flex items-center gap-1 transition-all"
                >
                  <Video className="w-3 h-3" />
                  <span>Call Now</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main POC Interactive Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Direct In-Portal Messaging */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between h-[540px]">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-800/50 flex items-center justify-center text-cyan-400">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Direct POC Communications Channel</h3>
                  <p className="text-[11px] text-slate-400">
                    Live thread with {selectedPOC.name} ({selectedPOC.role})
                  </p>
                </div>
              </div>

              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                Slack Sync Active
              </span>
            </div>

            {/* Quick Preset Buttons */}
            <div className="mt-2.5 flex items-center gap-1.5 overflow-x-auto pb-1">
              <button
                type="button"
                onClick={() =>
                  handlePresetMessage(
                    "Can David Chen join our client demo on Thursday at 11 AM PST for a 20-min architecture whiteboarding session?",
                    'deal-inquiry'
                  )
                }
                className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-[10px] whitespace-nowrap transition-colors flex items-center gap-1"
              >
                <Zap className="w-3 h-3 text-amber-400" />
                <span>Request SE Demo Join</span>
              </button>
              <button
                type="button"
                onClick={() =>
                  handlePresetMessage(
                    "We need an urgent 35% margin spiff approval on our $140k Hydizo Shield SecOps proposal.",
                    'quote'
                  )
                }
                className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-[10px] whitespace-nowrap transition-colors flex items-center gap-1"
              >
                <Zap className="w-3 h-3 text-cyan-400" />
                <span>35% Margin Spiff</span>
              </button>
            </div>

            {/* Chat History Container */}
            <div className="mt-3 space-y-3 h-[290px] overflow-y-auto pr-1">
              {messages.map((msg) => {
                const isPartner = msg.sender === 'partner';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isPartner ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mb-1">
                      <span className="font-semibold text-slate-300">{msg.senderName}</span>
                      <span>•</span>
                      <span>{msg.timestamp}</span>
                      {msg.tag && (
                        <span className="ml-1 px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 text-[9px] uppercase font-bold border border-cyan-800">
                          {msg.tag}
                        </span>
                      )}
                    </div>
                    <div
                      className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                        isPartner
                          ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-tr-none'
                          : 'bg-slate-800/90 border border-slate-700/60 text-slate-100 rounded-tl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSendMessage} className="pt-3 border-t border-slate-800 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-semibold text-slate-400">Topic Flag:</span>
              {(['deal-inquiry', 'quote', 'urgent', 'general'] as const).map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setMessageTag(tag)}
                  className={`text-[10px] px-2 py-0.5 rounded-full capitalize font-semibold transition-all ${
                    messageTag === tag
                      ? 'bg-cyan-500 text-white shadow-sm'
                      : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tag.replace('-', ' ')}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder={`Type message to ${selectedPOC.name}...`}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md shadow-cyan-600/30"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send</span>
              </button>
            </div>
          </form>
        </div>

        {/* Schedule a Meeting / Strategy Call */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between h-[540px]">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-950 border border-indigo-800/50 flex items-center justify-center text-indigo-400">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Instant POC Meeting Scheduler</h3>
                  <p className="text-[11px] text-slate-400">
                    Book dedicated co-pitch or technical architecture review
                  </p>
                </div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/40">
                Live Google Meet
              </span>
            </div>

            <form onSubmit={handleBookingSubmit} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Selected Hydizo Host
                </label>
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <img
                      src={selectedPOC.avatar}
                      alt={selectedPOC.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="font-bold text-white">{selectedPOC.name}</span>
                    <span className="text-slate-400">({selectedPOC.role})</span>
                  </div>
                  <span className="text-[10px] text-cyan-400 font-mono">{selectedPOC.timezone}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Select Date
                  </label>
                  <input
                    type="date"
                    value={meetingDate}
                    onChange={(e) => setMeetingDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Available Time Slot
                  </label>
                  <select
                    value={meetingTimeSlot}
                    onChange={(e) => setMeetingTimeSlot(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="09:30 AM PST">09:30 AM PST</option>
                    <option value="11:00 AM PST">11:00 AM PST (Recommended)</option>
                    <option value="02:00 PM PST">02:00 PM PST</option>
                    <option value="04:30 PM PST">04:30 PM PST</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Agenda / Meeting Objective
                </label>
                <select
                  value={meetingTopic}
                  onChange={(e) => setMeetingTopic(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  <option value="Deal Strategy & Architecture Sizing">
                    Deal Strategy &amp; Architecture Sizing
                  </option>
                  <option value="Customer Co-Pitch Preparation">
                    Customer Co-Pitch Preparation
                  </option>
                  <option value="Sandbox POC Environment Setup">
                    Sandbox POC Environment Setup
                  </option>
                  <option value="Partner Margin & Custom Quote Review">
                    Partner Margin &amp; Custom Quote Review
                  </option>
                  <option value="Executive Joint GTM Alignment">
                    Executive Joint GTM Alignment
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Client Prospect Name (Optional)
                </label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Global FinStream Capital"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-semibold text-xs transition-all shadow-md shadow-purple-600/30 flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Confirm Video Strategy Call &amp; Dispatch Invites</span>
              </button>
            </form>
          </div>

          {/* Confirmed bookings ticker */}
          <div className="pt-2 border-t border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Upcoming Booked Strategy Calls ({bookings.length}):
            </span>
            <div className="space-y-1 max-h-16 overflow-y-auto">
              {bookings.length === 0 ? (
                <p className="text-[11px] text-slate-500 italic">No calls scheduled this week yet.</p>
              ) : (
                bookings.map((b) => (
                  <div
                    key={b.id}
                    className="p-1.5 rounded-lg bg-slate-950 border border-slate-800/80 text-[10px] flex items-center justify-between text-slate-300"
                  >
                    <span className="font-semibold text-cyan-300 truncate max-w-[200px]">
                      {b.meetingTopic}
                    </span>
                    <span className="text-slate-400 font-mono">
                      {b.date} • {b.timeSlot}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
