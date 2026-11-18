export type PortalRole = 'partner' | 'admin';

export type PartnerTier = 'Platinum' | 'Gold' | 'Silver' | 'Registered';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: PortalRole;
  partnerId?: string;
  avatar?: string;
  companyName: string;
  jobTitle: string;
}

export interface PartnerPOC {
  id: string;
  name: string;
  role: string;
  title: string;
  email: string;
  phone: string;
  avatar: string;
  slackChannel: string;
  timezone: string;
  status: 'online' | 'busy' | 'offline';
  bio: string;
}

export interface PartnerOrganization {
  id: string;
  name: string;
  tier: PartnerTier;
  logo?: string;
  contactEmail: string;
  region: string;
  joinedDate: string;
  status: 'active' | 'pending' | 'suspended';
  assignedPOCId: string;
  assignedSEId: string;
  totalRevenue: number;
  dealsClosed: number;
  activePipeline: number;
  commissionRate: number; // e.g. 28%
  coOpFundsAvailable: number;
  mdfRequests?: MDFRequest[];
}

export interface MDFRequest {
  id: string;
  partnerId: string;
  partnerName: string;
  activityTitle: string;
  category: 'Event / CISO Dinner' | 'Digital Marketing Campaign' | 'Sales Spiff Incentive' | 'Technical Lab Gear';
  requestedAmount: number;
  expectedLeads: number;
  submissionDate: string;
  status: 'Approved' | 'Pending Review' | 'Disbursed' | 'Rejected';
  notes: string;
}

export interface ProductItem {
  id: string;
  name: string;
  tagline: string;
  category: 'Cloud & Mesh' | 'Security & SecOps' | 'AI & Observability' | 'Edge & Compute' | 'Identity & ZeroTrust';
  badge?: string;
  description: string;
  retailPrice: string;
  basePriceNum: number;
  billingCycle: 'per host/mo' | 'per user/mo' | 'per cluster/mo' | 'enterprise/yr';
  partnerMarginPercent: number; // e.g. 30%
  keyFeatures: string[];
  targetAudience: string;
  datasheetUrl?: string;
  battlecardSummary: string;
  competitiveEdge: string;
  rating: number;
  popular?: boolean;
}

export interface ResourceItem {
  id: string;
  title: string;
  category: 'Pitch Deck' | 'Whitepaper' | 'Case Study' | 'Compliance' | 'Technical Guide';
  format: 'PDF' | 'PPTX' | 'DOCX' | 'ZIP';
  size: string;
  description: string;
  downloadCount: number;
  updatedAt: string;
  featured?: boolean;
  slidesCount?: number;
}

export interface DemoItem {
  id: string;
  title: string;
  type: 'Interactive Sandbox' | 'Video Tour' | 'API Playground' | 'Live Instance';
  duration: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  thumbnail: string;
  previewUrl?: string;
  sandboxAvailable: boolean;
  scenarioType?: 'shield' | 'cloudmesh' | 'zerotrust' | 'api';
}

export interface DealRegistration {
  id: string;
  partnerId: string;
  partnerName: string;
  clientName: string;
  clientIndustry: string;
  productInterested: string;
  estimatedValue: number;
  submissionDate: string;
  status: 'Approved' | 'Pending Review' | 'Closed-Won' | 'Rejected';
  closingTimeline: string;
  assignedSE?: string;
  notes?: string;
  protectedUntil: string;
}

export interface PartnerCoupon {
  id: string;
  code: string;
  title: string;
  partnerId: string | 'GLOBAL';
  partnerName: string;
  discountType: 'percentage' | 'fixed_credit';
  discountValue: number; // 25 for 25% or 500 for $500
  productScope: string; // 'All Products' or specific product
  status: 'active' | 'expired' | 'revoked';
  expiresAt: string;
  usageCount: number;
  maxUses: number;
  minDealSize?: number;
  createdDate: string;
  description: string;
}

export interface POCMessage {
  id: string;
  sender: 'partner' | 'poc';
  senderName: string;
  text: string;
  timestamp: string;
  read: boolean;
  tag?: 'urgent' | 'deal-inquiry' | 'quote' | 'general';
}

export interface ScheduleBooking {
  id: string;
  pocId: string;
  partnerName: string;
  date: string;
  timeSlot: string;
  meetingTopic: string;
  meetingType: 'video' | 'phone';
  clientName?: string;
  status: 'confirmed' | 'pending';
}
