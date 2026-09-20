import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LeadFormModal } from './components/LeadFormModal';
import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { ProjectDetail } from './pages/ProjectDetail';
import { ServicesPage } from './pages/ServicesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';
import { NotFoundPage } from './pages/NotFoundPage';
import { fetchMe, fetchSiteSettings } from './services/api';
import { User, SiteSettingsData } from './types';

export const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = window.localStorage.getItem('webnest-theme');
    return savedTheme === 'dark' ? 'dark' : 'light';
  });
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('Business Website');
  const [adminUser, setAdminUser] = useState<User | null>(null);
  const [authChecking, setAuthChecking] = useState(true);
  const [settings, setSettings] = useState<SiteSettingsData | undefined>(undefined);

  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isKnownPublicRoute =
    location.pathname === '/' ||
    ['/services', '/about', '/contact'].includes(location.pathname) ||
    location.pathname === '/projects' ||
    location.pathname.startsWith('/projects/');
  const isNotFoundRoute = !isAdminRoute && !isKnownPublicRoute;

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('webnest-theme', theme);
  }, [theme]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Check auth session
  useEffect(() => {
    if (!isAdminRoute) {
      setAuthChecking(false);
      return;
    }

    const checkAuth = async () => {
      try {
        const res = await fetchMe();
        if (res.data.user) {
          setAdminUser(res.data.user);
        }
      } catch (err) {
        setAdminUser(null);
      } finally {
        setAuthChecking(false);
      }
    };
    checkAuth();
  }, [isAdminRoute]);

  // Fetch Site Settings
  useEffect(() => {
    fetchSiteSettings().then((res) => {
      if (res.data.settings) setSettings(res.data.settings);
    });
  }, []);

  const openEnquiryModal = (serviceTitle?: string) => {
    if (serviceTitle) setSelectedService(serviceTitle);
    setEnquiryOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-cream-100 text-warmNeutral-900 selection:bg-brandRed-500 selection:text-white font-sans">
      {!isAdminRoute && !isNotFoundRoute && (
        <Navbar
          theme={theme}
          onToggleTheme={() => setTheme((current) => (current === 'light' ? 'dark' : 'light'))}
          onOpenEnquiry={() => openEnquiryModal()}
        />
      )}

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home onOpenEnquiry={(s) => openEnquiryModal(s)} />} />
          <Route path="/projects" element={<Projects onOpenEnquiry={() => openEnquiryModal()} />} />
          <Route path="/projects/:slug" element={<ProjectDetail onOpenEnquiry={() => openEnquiryModal()} />} />
          <Route path="/services" element={<ServicesPage onOpenEnquiry={(s) => openEnquiryModal(s)} />} />
          <Route path="/about" element={<AboutPage onOpenEnquiry={() => openEnquiryModal()} />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />

          {/* Admin Routes */}
          <Route
            path="/admin/login"
            element={
              adminUser ? (
                <Navigate to="/admin" replace />
              ) : (
                <AdminLogin
                  theme={theme}
                  onToggleTheme={() => setTheme((current) => (current === 'light' ? 'dark' : 'light'))}
                  onLoginSuccess={(user) => setAdminUser(user)}
                />
              )
            }
          />
          <Route
            path="/admin"
            element={
              authChecking ? (
                <div className="min-h-screen bg-charcoal-950 flex items-center justify-center text-xs text-warmNeutral-500">
                  Checking authentication...
                </div>
              ) : adminUser ? (
                <AdminDashboard
                  user={adminUser}
                  theme={theme}
                  onToggleTheme={() => setTheme((current) => (current === 'light' ? 'dark' : 'light'))}
                  onLogout={() => setAdminUser(null)}
                />
              ) : (
                <Navigate to="/admin/login" replace />
              )
            }
          />
        </Routes>
      </main>

      {!isAdminRoute && !isNotFoundRoute && <Footer settings={settings} />}

      {/* Global Lead Form Popup Modal */}
      <LeadFormModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        defaultService={selectedService}
      />
    </div>
  );
};

export default App;
