# Hydizo Partner Ecosystem & Admin Portal

An enterprise-grade, modern, dual-mode Partner & Admin Portal built for **Hydizo** (Enterprise Cloud & Security Ecosystem).

---

## 🔐 Authentication & Access Gate

The application is gated behind a dedicated **Authentication & Login Page**:
- **Role-Based Access**:
  - **Partner Login**: Authenticates channel partner personnel (e.g., `alex@apexcloud.io` - Apex Cloud Solutions) into the Partner Portal.
  - **Admin Portal Login**: Authenticates Hydizo Channel Operations administrators (e.g., `admin@hydizo.com` - Elena Rostova) into the Admin Operations Portal.
- **1-Click Demo Profiles**:
  - `Alex Rivera` (Gold Partner - Apex Cloud Solutions) → Instant access to Partner Portal.
  - `Elena Rostova` (Channel Operations Administrator) → Instant access to Admin Portal.
- **Secure Sign-Out**:
  - Click the user profile dropdown in the top right of the navigation bar and select **"Sign Out"** to end your session and return to the login gate.

---

## 🌟 Key Features & Architecture

### 1. Dual-Mode Portal Experience
- **Partner Portal**: Dedicated self-service workspace for registered channel partners (Gold, Platinum, Silver, Registered) to accelerate deal velocity, model partner margins, access sales collateral, spin up isolated demo sandboxes, and collaborate with their dedicated Hydizo POC team.
- **Admin Portal**: Channel Operations & Alliances command center to onboard partners, manage margin tiers, issue global & partner-specific coupon campaigns, review deal registrations with margin lock protection, and reassign Hydizo account leads.
- **Global Command Palette (`Ctrl+K` / `Cmd+K`)**: Rapidly search and jump to products, resources, coupons, partners, or trigger system actions from anywhere.

---

### 2. Partner Portal Capabilities

#### 📊 Dashboard
- **Partner Tier Progress**: Real-time progress bar (e.g. Gold Partner progressing towards Platinum at $1M revenue with 35% margin).
- **Interactive Revenue & Commission Analytics**: Area chart showing monthly closed revenue ($168k) vs. net commission payouts ($47k) across recent quarters.
- **Co-Op Marketing Funds (MDF) Management**:
  - Live allocation widget ($18,500 available)
  - Interactive "Apply for Co-Op Funds" modal for CISO dinners, digital campaigns, and conference sponsorships
- **Fast Action Shortcuts**:
  - *Register New Deal* (Locks 90-120 day price & margin protection)
  - *Quote & ROI Calculator* (Interactive multi-variable margin modeler)
  - *Launch Client Sandbox* (14-day dedicated testbed provisioner)
  - *Call Your POC* (Instant Strategy Video Room connection)

#### 📦 Products & Pricing
- **Enterprise Product Suite**:
  1. **Hydizo CloudMesh Enterprise**: Multi-cloud zero-trust connectivity & service mesh.
  2. **Hydizo Shield SecOps**: Autonomous threat detection, CSPM, and attack path visualization (35% high margin).
  3. **Hydizo DataPulse AI**: Streaming real-time telemetry, OpenTelemetry observability, and AI root cause analysis.
  4. **Hydizo Edge Gateway**: Ultra-low latency edge compute appliance & micro-VMs.
  5. **Hydizo ZeroTrust Access (ZTA)**: Identity-first secure remote access & SASE framework.
- **Pricing & Margin Transparency**: Client MSRP vs. Partner Wholesale Buy Price with calculated margin percentage.
- **Interactive Margin & ROI Quote Calculator**:
  - Real-time adjustment of quantities, licensing cycles, and multi-year contract terms (1, 2, or 3 years).
  - One-click coupon application.
  - Automatic calculation of Net Customer Price, Partner Wholesale Cost, and Protected Profit Margin ($ and %).

#### 📁 Resources & Demos
- **In-Portal Interactive Document Viewer**:
  - Slide carousel for pitch decks with slide navigation
  - Side-by-side competitor battlecard comparison matrix (Hydizo vs. Wiz vs. Datadog)
  - Official SOC 2 Type II and ISO 27001 auditor attestation letters
  - Partner watermarking banner ("Licensed exclusively to Apex Cloud Solutions")
- **Live Interactive Sandbox Console Simulator**:
  - **Hydizo Shield SecOps Live Threat Containment**: Visual attack graph with interactive eBPF one-click neutralization, container isolation in 1.2s, and live kernel logs!
  - **Hydizo CloudMesh Multi-Cloud Failover**: Sub-second traffic rerouting simulator from AWS us-east-1 to GCP europe-west1 with 0 dropped packets.
  - **Interactive API Playground**: Live test cURL commands with syntax-highlighted JSON output.
  - **Client Evaluation URL**: Shareable 14-day tokenized client access link.

#### 📞 Contact Your POC (Point of Contact)
- **Dedicated Account Team Profiles**: Direct contact cards for Primary Partner Account Manager (Sarah Jenkins), Solutions Architect SE (David Chen), and Executive Sponsor (Elena Rostova).
- **Live Video Strategy Room Simulator**:
  - Real-time WebRTC room simulation with live timer
  - Video feeds, talking indicators, and microphone/camera toggles
  - Screen share simulator with architecture diagram
  - Meeting scratchpad with automatic minutes sync to `#hydizo-apex-sync`
- **Direct In-Portal Messaging**:
  - Fast preset action buttons ("Request SE Demo Join", "35% Margin Spiff")
  - Topic flags: Deal Inquiry, Custom Quote, Urgent Escalation, General
  - Simulated smart auto-responses from PAM Sarah Jenkins
- **Instant Meeting Scheduler**: Pick your POC host, date, and time slot with Google Meet calendar confirmation.

#### 🎟️ Coupons & Deals (Partner View)
- **Partner Promotional Coupons**:
  - Active codes with discount rates, redemption counters, product scopes, and minimum deal thresholds.
  - **Client Proposal Link & QR Code Generator**: Generates client checkout link with embedded partner attribution tag and downloadable QR code.
- **Deal Registrations Tracker**:
  - Status tracker: Pending Review, Approved (locks 90-day price protection), Closed-Won.
- **Market Development Funds (MDF) Ledger**:
  - Audit trail of submitted marketing reimbursement requests.

---

### 3. Admin Portal Capabilities

#### 📈 Admin Overview & Ecosystem Analytics
- Global ecosystem ARR ($14.2M), active partner accounts, total ecosystem pipeline ($4.8M), and active coupon count.
- **Interactive ARR Trajectory Chart**: Visual growth trend across recent months.
- **Pending Deal Approval Queue**: Instant **Approve** (locks 90-day margin guarantee) or **Reject** action workflow.
- **Co-Op Marketing (MDF) Approval Queue**: Review and disburse marketing allocations.
- Top Performing Channel Partners leaderboard.

#### 👥 Partner Organizations Management
- Directory of all onboarded partners.
- In-table Tier switcher (auto-calculates margin rates: Platinum 35%, Gold 28%, Silver 22%, Registered 15%).
- Reassign assigned Hydizo POCs (PAM & SE).
- Partner status toggle (Active / Suspended) and **Onboard New Partner Modal**.

#### 🏷️ Partner Coupons & Promotions Management
- Comprehensive coupon campaign manager.
- Issue new campaigns with customized parameters:
  - Global vs. Partner-exclusive scope
  - Percentage discount or Fixed dollar credit
  - Product scope restriction
  - Max redemptions limit & minimum deal size
  - Expiration dates
- Real-time quota tracker and Revoke / Re-activate controls.

#### 🛡️ Deal Registrations Workflow
- Centralized review board for channel opportunities.
- One-click approval to lock in exclusive price protection, preventing direct sales conflict and securing partner commission.
- Mark Closed-Won workflow to trigger commission payouts.

---

## 🛠️ Tech Stack
- **Framework**: React 19 + TypeScript
- **Styling**: Tailwind CSS v4 with custom dark mode glassmorphism
- **Charts**: Recharts
- **Icons**: Lucide React
- **Build Tool**: Vite 8

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Start Vite dev server
npm run dev

# Production build
npm run build
```

Open [http://localhost:5173/](http://localhost:5173/) in your browser.
