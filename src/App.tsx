import React, { useState, useEffect } from 'react';
import { PortalProvider, usePortal } from './context/PortalContext';
import { Navbar } from './components/common/Navbar';
import { Sidebar } from './components/common/Sidebar';
import { NotificationToast } from './components/common/NotificationToast';
import { CommandPalette } from './components/common/CommandPalette';

// Separate Login Pages
import { PartnerLoginPage } from './components/auth/PartnerLoginPage';
import { AdminLoginPage } from './components/auth/AdminLoginPage';

// Partner Views
import { PartnerDashboard } from './components/partner/PartnerDashboard';
import { ProductsView } from './components/partner/ProductsView';
import { ResourcesDemosView } from './components/partner/ResourcesDemosView';
import { ContactPOCView } from './components/partner/ContactPOCView';
import { PartnerCouponsDealsView } from './components/partner/PartnerCouponsDealsView';

// Interactive Enhancement Modals
import { LiveSandboxDemoModal } from './components/partner/LiveSandboxDemoModal';
import { DocumentPreviewModal } from './components/partner/DocumentPreviewModal';
import { POCVideoCallModal } from './components/partner/POCVideoCallModal';

// Admin Views
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminPartnersView } from './components/admin/AdminPartnersView';
import { AdminCouponsView } from './components/admin/AdminCouponsView';
import { AdminDealRegistrationsView } from './components/admin/AdminDealRegistrationsView';

const MainContent: React.FC = () => {
  const { user, role, activeTab, setActiveTab } = usePortal();

  // Separate login gate state: 'partner' or 'admin'
  const [authPortal, setAuthPortal] = useState<'partner' | 'admin'>(() => {
    if (typeof window !== 'undefined' && window.location.search.includes('admin')) {
      return 'admin';
    }
    return 'partner';
  });

  // Guard: if user is partner, guarantee they never stay on admin tabs
  useEffect(() => {
    if (user && user.role === 'partner' && activeTab.startsWith('admin-')) {
      setActiveTab('dashboard');
    }
  }, [user, activeTab, setActiveTab]);

  // If not logged in, render the dedicated Partner or Admin login page
  if (!user) {
    return (
      <>
        {authPortal === 'partner' ? (
          <PartnerLoginPage onGoToAdmin={() => setAuthPortal('admin')} />
        ) : (
          <AdminLoginPage onGoToPartner={() => setAuthPortal('partner')} />
        )}
        <NotificationToast />
      </>
    );
  }

  const renderActiveView = () => {
    // If user is Admin, render Admin modules
    if (user.role === 'admin' && role === 'admin') {
      switch (activeTab) {
        case 'admin-dashboard':
          return <AdminDashboard />;
        case 'admin-partners':
          return <AdminPartnersView />;
        case 'admin-coupons':
          return <AdminCouponsView />;
        case 'admin-deals':
          return <AdminDealRegistrationsView />;
        default:
          return <AdminDashboard />;
      }
    }

    // Otherwise, strictly Partner modules
    switch (activeTab) {
      case 'dashboard':
        return <PartnerDashboard />;
      case 'products':
        return <ProductsView />;
      case 'resources':
        return <ResourcesDemosView />;
      case 'contact-poc':
        return <ContactPOCView />;
      case 'coupons-deals':
        return <PartnerCouponsDealsView />;
      default:
        return <PartnerDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      <Navbar />

      <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
        <Sidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-full">
          {renderActiveView()}
        </main>
      </div>

      {/* Interactive Global Modals */}
      <CommandPalette />
      <LiveSandboxDemoModal />
      <DocumentPreviewModal />
      <POCVideoCallModal />
      <NotificationToast />
    </div>
  );
};

export function App() {
  return (
    <PortalProvider>
      <MainContent />
    </PortalProvider>
  );
}

export default App;
