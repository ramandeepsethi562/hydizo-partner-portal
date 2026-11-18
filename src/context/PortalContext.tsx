import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  PortalRole,
  AuthUser,
  PartnerOrganization,
  PartnerPOC,
  ProductItem,
  ResourceItem,
  DemoItem,
  DealRegistration,
  PartnerCoupon,
  POCMessage,
  ScheduleBooking,
  MDFRequest,
} from '../types';
import {
  INITIAL_POCS,
  INITIAL_PARTNERS,
  INITIAL_PRODUCTS,
  INITIAL_RESOURCES,
  INITIAL_DEMOS,
  INITIAL_DEALS,
  INITIAL_COUPONS,
  INITIAL_MESSAGES,
  INITIAL_MDF_REQUESTS,
} from '../data/mockData';

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

interface PortalContextType {
  user: AuthUser | null;
  login: (email: string, password: string, explicitRole?: PortalRole) => boolean;
  logout: () => void;
  role: PortalRole;
  setRole: (role: PortalRole) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentPartner: PartnerOrganization;
  setCurrentPartner: (partner: PartnerOrganization) => void;
  partners: PartnerOrganization[];
  pocs: PartnerPOC[];
  products: ProductItem[];
  resources: ResourceItem[];
  demos: DemoItem[];
  deals: DealRegistration[];
  coupons: PartnerCoupon[];
  messages: POCMessage[];
  bookings: ScheduleBooking[];
  mdfRequests: MDFRequest[];
  toasts: ToastMessage[];
  showToast: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;

  // Modals State
  activeDocument: ResourceItem | null;
  setActiveDocument: (doc: ResourceItem | null) => void;
  activeLiveSandbox: DemoItem | null;
  setActiveLiveSandbox: (demo: DemoItem | null) => void;
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;
  activeVideoCallPOC: PartnerPOC | null;
  setActiveVideoCallPOC: (poc: PartnerPOC | null) => void;

  // Handlers
  addDealRegistration: (data: {
    clientName: string;
    clientIndustry: string;
    productInterested: string;
    estimatedValue: number;
    closingTimeline: string;
    notes?: string;
  }) => void;
  updateDealStatus: (dealId: string, status: DealRegistration['status'], notes?: string) => void;
  addCoupon: (coupon: {
    code: string;
    title: string;
    partnerId: string;
    partnerName: string;
    discountType: 'percentage' | 'fixed_credit';
    discountValue: number;
    productScope: string;
    expiresAt: string;
    maxUses: number;
    minDealSize?: number;
    description: string;
  }) => void;
  updateCouponStatus: (couponId: string, status: PartnerCoupon['status']) => void;
  addPartner: (partner: {
    name: string;
    tier: PartnerOrganization['tier'];
    contactEmail: string;
    region: string;
    assignedPOCId: string;
    assignedSEId: string;
    commissionRate: number;
  }) => void;
  updatePartner: (partnerId: string, updates: Partial<PartnerOrganization>) => void;
  sendMessageToPOC: (text: string, tag?: POCMessage['tag']) => void;
  bookMeetingWithPOC: (data: {
    pocId: string;
    date: string;
    timeSlot: string;
    meetingTopic: string;
    clientName?: string;
  }) => void;
  launchSandbox: (demoTitle: string, clientName: string, duration: string) => void;
  addMDFRequest: (data: {
    activityTitle: string;
    category: MDFRequest['category'];
    requestedAmount: number;
    expectedLeads: number;
    notes: string;
  }) => void;
  updateMDFStatus: (id: string, status: MDFRequest['status']) => void;
}

const PortalContext = createContext<PortalContextType | undefined>(undefined);

export const PortalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Mandatory authentication: default to null so the Login Page is ALWAYS presented first
  const [user, setUser] = useState<AuthUser | null>(null);

  // Clear any legacy persistent session to ensure login is mandatory
  useEffect(() => {
    try {
      localStorage.removeItem('hydizo_auth_session');
    } catch {}
  }, []);

  const [role, setRoleState] = useState<PortalRole>(user?.role || 'partner');
  const [activeTab, setActiveTabState] = useState<string>(
    user?.role === 'admin' ? 'admin-dashboard' : 'dashboard'
  );
  const [partners, setPartners] = useState<PartnerOrganization[]>(INITIAL_PARTNERS);
  const [currentPartner, setCurrentPartner] = useState<PartnerOrganization>(() => {
    if (user?.partnerId) {
      const found = INITIAL_PARTNERS.find((p) => p.id === user.partnerId);
      if (found) return found;
    }
    return INITIAL_PARTNERS[0];
  });
  const [pocs] = useState<PartnerPOC[]>(INITIAL_POCS);
  const [products] = useState<ProductItem[]>(INITIAL_PRODUCTS);
  const [resources] = useState<ResourceItem[]>(INITIAL_RESOURCES);
  const [demos] = useState<DemoItem[]>(INITIAL_DEMOS);
  const [deals, setDeals] = useState<DealRegistration[]>(INITIAL_DEALS);
  const [coupons, setCoupons] = useState<PartnerCoupon[]>(INITIAL_COUPONS);
  const [messages, setMessages] = useState<POCMessage[]>(INITIAL_MESSAGES);
  const [bookings, setBookings] = useState<ScheduleBooking[]>([]);
  const [mdfRequests, setMdfRequests] = useState<MDFRequest[]>(INITIAL_MDF_REQUESTS);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Modals state
  const [activeDocument, setActiveDocument] = useState<ResourceItem | null>(null);
  const [activeLiveSandbox, setActiveLiveSandbox] = useState<DemoItem | null>(null);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [activeVideoCallPOC, setActiveVideoCallPOC] = useState<PartnerPOC | null>(null);

  const showToast = (title: string, message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const login = (email: string, password: string, explicitRole?: PortalRole): boolean => {
    const lowerEmail = email.trim().toLowerCase();

    let authenticatedUser: AuthUser;

    if (explicitRole === 'admin' || (!explicitRole && (lowerEmail.includes('admin') || lowerEmail.includes('ops@hydizo.com')))) {
      authenticatedUser = {
        id: 'usr-admin-1',
        name: 'Elena Rostova',
        email: email || 'admin@hydizo.com',
        role: 'admin',
        companyName: 'Hydizo Global HQ',
        jobTitle: 'VP of Global Channels & Ecosystem',
      };
      setRoleState('admin');
      setActiveTabState('admin-dashboard');
    } else if (lowerEmail.includes('cybernova') || lowerEmail.includes('platinum')) {
      // Platinum Tier: CyberNova Technologies
      const cyberPartner = partners.find((p) => p.id === 'partner-2') || partners[1];
      authenticatedUser = {
        id: 'usr-partner-2',
        name: 'Marcus Vance',
        email: email || 'marcus@cybernova.com',
        role: 'partner',
        partnerId: 'partner-2',
        companyName: cyberPartner.name,
        jobTitle: 'Channel Alliance Director',
      };
      setRoleState('partner');
      setCurrentPartner(cyberPartner);
      setActiveTabState('dashboard');
    } else if (lowerEmail.includes('nexus') || lowerEmail.includes('silver') || lowerEmail.includes('priya')) {
      // Silver Tier: Nexus Digital Systems
      const nexusPartner = partners.find((p) => p.id === 'partner-3') || partners[2];
      authenticatedUser = {
        id: 'usr-partner-3',
        name: 'Priya Sharma',
        email: email || 'priya@nexusdigital.net',
        role: 'partner',
        partnerId: 'partner-3',
        companyName: nexusPartner.name,
        jobTitle: 'APAC Channel Director',
      };
      setRoleState('partner');
      setCurrentPartner(nexusPartner);
      setActiveTabState('dashboard');
    } else if (lowerEmail.includes('strata') || lowerEmail.includes('registered') || lowerEmail.includes('mateo')) {
      // Registered Tier: Strata Secure Systems
      const strataPartner = partners.find((p) => p.id === 'partner-5') || partners[4];
      authenticatedUser = {
        id: 'usr-partner-5',
        name: 'Mateo Silva',
        email: email || 'mateo@stratasecure.io',
        role: 'partner',
        partnerId: 'partner-5',
        companyName: strataPartner.name,
        jobTitle: 'Alliances Lead',
      };
      setRoleState('partner');
      setCurrentPartner(strataPartner);
      setActiveTabState('dashboard');
    } else {
      // Gold Tier (Default): Apex Cloud Solutions
      const apexPartner = partners.find((p) => p.id === 'partner-1') || partners[0];
      authenticatedUser = {
        id: 'usr-partner-1',
        name: 'Alex Rivera',
        email: email || 'alex@apexcloud.io',
        role: 'partner',
        partnerId: 'partner-1',
        companyName: apexPartner.name,
        jobTitle: 'Lead Partner Solutions Architect',
      };
      setRoleState('partner');
      setCurrentPartner(apexPartner);
      setActiveTabState('dashboard');
    }

    setUser(authenticatedUser);
    try {
      localStorage.setItem('hydizo_auth_session', JSON.stringify(authenticatedUser));
    } catch {}

    showToast(
      'Authentication Successful',
      `Signed in as ${authenticatedUser.name} (${authenticatedUser.companyName}).`,
      'success'
    );
    return true;
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem('hydizo_auth_session');
    } catch {}
    showToast('Signed Out', 'You have been logged out of the portal.', 'info');
  };

  const setRole = (newRole: PortalRole) => {
    // Strictly forbid partner accounts from accessing admin console
    if (user && user.role !== 'admin' && newRole === 'admin') {
      showToast('Access Denied', 'Partner accounts cannot access Channel Operations Admin.', 'warning');
      return;
    }
    setRoleState(newRole);
    if (newRole === 'admin') {
      setActiveTabState('admin-dashboard');
    } else {
      setActiveTabState('dashboard');
    }
  };

  const setActiveTab = (tab: string) => {
    setActiveTabState(tab);
  };

  const addDealRegistration = (data: {
    clientName: string;
    clientIndustry: string;
    productInterested: string;
    estimatedValue: number;
    closingTimeline: string;
    notes?: string;
  }) => {
    const newDeal: DealRegistration = {
      id: `deal-${Date.now().toString().slice(-4)}`,
      partnerId: currentPartner.id,
      partnerName: currentPartner.name,
      clientName: data.clientName,
      clientIndustry: data.clientIndustry,
      productInterested: data.productInterested,
      estimatedValue: data.estimatedValue,
      submissionDate: 'Just now',
      status: 'Pending Review',
      closingTimeline: data.closingTimeline,
      assignedSE: 'David Chen',
      notes: data.notes,
      protectedUntil: 'Pending Approval',
    };

    setDeals((prev) => [newDeal, ...prev]);
    showToast(
      'Deal Registered Successfully',
      `Locked registration for ${data.clientName} ($${data.estimatedValue.toLocaleString()}). Under review by Sarah Jenkins.`,
      'success'
    );
  };

  const updateDealStatus = (dealId: string, status: DealRegistration['status'], notes?: string) => {
    setDeals((prev) =>
      prev.map((deal) => {
        if (deal.id === dealId) {
          const protectedUntil =
            status === 'Approved'
              ? '90 Days Locked (Protects Margin)'
              : status === 'Closed-Won'
              ? 'Closed-Won Commission Verified'
              : deal.protectedUntil;
          return {
            ...deal,
            status,
            protectedUntil,
            notes: notes ? `${deal.notes || ''} [Admin Update]: ${notes}` : deal.notes,
          };
        }
        return deal;
      })
    );
    showToast('Deal Updated', `Deal ${dealId} has been updated to "${status}".`, 'info');
  };

  const addCoupon = (coupon: {
    code: string;
    title: string;
    partnerId: string;
    partnerName: string;
    discountType: 'percentage' | 'fixed_credit';
    discountValue: number;
    productScope: string;
    expiresAt: string;
    maxUses: number;
    minDealSize?: number;
    description: string;
  }) => {
    const newCoupon: PartnerCoupon = {
      id: `coup-${Date.now().toString().slice(-4)}`,
      ...coupon,
      code: coupon.code.toUpperCase().replace(/\s+/g, '-'),
      status: 'active',
      usageCount: 0,
      createdDate: 'Nov 14, 2026',
    };

    setCoupons((prev) => [newCoupon, ...prev]);
    showToast('Coupon Created', `Coupon code "${newCoupon.code}" is now live and redeemable.`, 'success');
  };

  const updateCouponStatus = (couponId: string, status: PartnerCoupon['status']) => {
    setCoupons((prev) =>
      prev.map((c) => (c.id === couponId ? { ...c, status } : c))
    );
    showToast('Coupon Status Changed', `Coupon updated to ${status}.`, 'info');
  };

  const addPartner = (data: {
    name: string;
    tier: PartnerOrganization['tier'];
    contactEmail: string;
    region: string;
    assignedPOCId: string;
    assignedSEId: string;
    commissionRate: number;
  }) => {
    const newPartner: PartnerOrganization = {
      id: `partner-${Date.now().toString().slice(-4)}`,
      name: data.name,
      tier: data.tier,
      contactEmail: data.contactEmail,
      region: data.region,
      joinedDate: 'Nov 2026',
      status: 'active',
      assignedPOCId: data.assignedPOCId,
      assignedSEId: data.assignedSEId,
      totalRevenue: 0,
      dealsClosed: 0,
      activePipeline: 0,
      commissionRate: data.commissionRate,
      coOpFundsAvailable: 5000,
    };

    setPartners((prev) => [...prev, newPartner]);
    showToast('Partner Onboarded', `${data.name} successfully registered in Hydizo Partner Portal.`, 'success');
  };

  const updatePartner = (partnerId: string, updates: Partial<PartnerOrganization>) => {
    setPartners((prev) =>
      prev.map((p) => {
        if (p.id === partnerId) {
          const updated = { ...p, ...updates };
          if (currentPartner.id === partnerId) {
            setCurrentPartner(updated);
          }
          return updated;
        }
        return p;
      })
    );
    showToast('Partner Updated', 'Partner profile & tier configurations saved.', 'info');
  };

  const sendMessageToPOC = (text: string, tag?: POCMessage['tag']) => {
    const newMsg: POCMessage = {
      id: `msg-${Date.now()}`,
      sender: 'partner',
      senderName: `${currentPartner.name} Team`,
      text,
      timestamp: 'Just now',
      read: true,
      tag,
    };
    setMessages((prev) => [...prev, newMsg]);

    setTimeout(() => {
      const replyMsg: POCMessage = {
        id: `msg-reply-${Date.now()}`,
        sender: 'poc',
        senderName: 'Sarah Jenkins (PAM)',
        text: `Thanks for reaching out! I reviewed: "${text.slice(0, 45)}...". I have noted this in our partner ledger and will support you on next steps!`,
        timestamp: 'Just now',
        read: false,
      };
      setMessages((prev) => [...prev, replyMsg]);
      showToast('New Message from POC', 'Sarah Jenkins replied to your message.', 'info');
    }, 1800);
  };

  const bookMeetingWithPOC = (data: {
    pocId: string;
    date: string;
    timeSlot: string;
    meetingTopic: string;
    clientName?: string;
  }) => {
    const booking: ScheduleBooking = {
      id: `meet-${Date.now().toString().slice(-4)}`,
      pocId: data.pocId,
      partnerName: currentPartner.name,
      date: data.date,
      timeSlot: data.timeSlot,
      meetingTopic: data.meetingTopic,
      meetingType: 'video',
      clientName: data.clientName,
      status: 'confirmed',
    };
    setBookings((prev) => [booking, ...prev]);
    showToast(
      'Meeting Confirmed!',
      `Scheduled call with ${INITIAL_POCS.find((p) => p.id === data.pocId)?.name || 'POC'} on ${data.date} at ${data.timeSlot}. Calendar invites dispatched.`,
      'success'
    );
  };

  const launchSandbox = (demoTitle: string, clientName: string, duration: string) => {
    showToast(
      'Sandbox Provisioned!',
      `Dedicated isolated sandbox for "${clientName}" (${demoTitle}) is spinning up. Access link sent to your registered partner email. (${duration})`,
      'success'
    );
  };

  const addMDFRequest = (data: {
    activityTitle: string;
    category: MDFRequest['category'];
    requestedAmount: number;
    expectedLeads: number;
    notes: string;
  }) => {
    const newMdf: MDFRequest = {
      id: `mdf-${Date.now().toString().slice(-4)}`,
      partnerId: currentPartner.id,
      partnerName: currentPartner.name,
      activityTitle: data.activityTitle,
      category: data.category,
      requestedAmount: data.requestedAmount,
      expectedLeads: data.expectedLeads,
      submissionDate: 'Just now',
      status: 'Pending Review',
      notes: data.notes,
    };

    setMdfRequests((prev) => [newMdf, ...prev]);
    showToast(
      'Co-Op MDF Requested',
      `Submitted $${data.requestedAmount.toLocaleString()} Co-Op fund application for "${data.activityTitle}".`,
      'success'
    );
  };

  const updateMDFStatus = (id: string, status: MDFRequest['status']) => {
    setMdfRequests((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status } : m))
    );
    showToast('MDF Updated', `Co-Op funding request updated to ${status}.`, 'info');
  };

  return (
    <PortalContext.Provider
      value={{
        user,
        login,
        logout,
        role,
        setRole,
        activeTab,
        setActiveTab,
        currentPartner,
        setCurrentPartner,
        partners,
        pocs,
        products,
        resources,
        demos,
        deals,
        coupons,
        messages,
        bookings,
        mdfRequests,
        toasts,
        showToast,
        removeToast,
        activeDocument,
        setActiveDocument,
        activeLiveSandbox,
        setActiveLiveSandbox,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        activeVideoCallPOC,
        setActiveVideoCallPOC,
        addDealRegistration,
        updateDealStatus,
        addCoupon,
        updateCouponStatus,
        addPartner,
        updatePartner,
        sendMessageToPOC,
        bookMeetingWithPOC,
        launchSandbox,
        addMDFRequest,
        updateMDFStatus,
      }}
    >
      {children}
    </PortalContext.Provider>
  );
};

export const usePortal = () => {
  const context = useContext(PortalContext);
  if (!context) {
    throw new Error('usePortal must be used within a PortalProvider');
  }
  return context;
};
