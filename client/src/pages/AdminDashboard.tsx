import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProjects, fetchEnquiries, fetchSiteSettings, logoutAdmin } from '../services/api';
import { ProjectManager } from '../admin/ProjectManager';
import { ServiceManager } from '../admin/ServiceManager';
import { TestimonialManager } from '../admin/TestimonialManager';
import { EnquiryManager } from '../admin/EnquiryManager';
import { SettingsManager } from '../admin/SettingsManager';
import { SEO } from '../components/SEO';
import { ThemeToggle } from '../components/ThemeToggle';
import {
  FolderKanban,
  Wrench,
  MessageSquare,
  MailCheck,
  Settings,
  LogOut,
  LayoutDashboard,
  Star,
  Sparkles,
  Users,
  TrendingUp,
  CircleDashed,
} from 'lucide-react';
import blackLogo from '../assets/webnest-icon.png';

interface AdminDashboardProps {
  user: any;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, theme, onToggleTheme, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'services' | 'testimonials' | 'enquiries' | 'settings'>('overview');
  const [salesPeople, setSalesPeople] = useState<string[]>([
    'Aisha Kumar',
    'Rohan Verma',
    'Priya Nair',
    'Dev Shah',
  ]);
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalProjects: 0,
    featuredProjects: 0,
    totalEnquiries: 0,
    newEnquiries: 0,
    activeLeads: 0,
    contactedLeads: 0,
    inProgressLeads: 0,
    completedLeads: 0,
    assignedLeads: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const loadSalesPeople = async () => {
      try {
        const res = await fetchSiteSettings();
        const names = res.data.settings?.salesPeople || [];
        if (names.length) setSalesPeople(names);
      } catch (err) {
        console.warn('Sales team data unavailable; using defaults.', err);
      }
    };

    loadSalesPeople();
  }, []);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [projRes, enqRes] = await Promise.all([
          fetchProjects(undefined, undefined, true),
          fetchEnquiries(),
        ]);

        const projs = projRes.data.projects || [];
        const enqs = enqRes.data.enquiries || [];

        setEnquiries(enqs);
        setStats({
          totalProjects: projs.length,
          featuredProjects: projs.filter((p) => p.featured).length,
          totalEnquiries: enqs.length,
          newEnquiries: enqs.filter((e) => e.status === 'New').length,
          activeLeads: enqs.filter((e) => ['New', 'Contacted', 'In Progress'].includes(e.status)).length,
          contactedLeads: enqs.filter((e) => e.status === 'Contacted').length,
          inProgressLeads: enqs.filter((e) => e.status === 'In Progress').length,
          completedLeads: enqs.filter((e) => e.status === 'Completed').length,
          assignedLeads: enqs.filter((e) => e.assignedTo).length,
        });
      } catch (err) {
        console.error('Error loading dashboard stats:', err);
      }
    };
    loadStats();
  }, [activeTab]);

  const salesBreakdown = (salesPeople.length ? salesPeople : ['Aisha Kumar', 'Rohan Verma', 'Priya Nair', 'Dev Shah']).map((person) => {
    const assignedList = enquiries.filter((item) => item.assignedTo === person);
    const active = assignedList.filter((item) => ['New', 'Contacted', 'In Progress'].includes(item.status)).length;
    const closed = assignedList.filter((item) => item.status === 'Completed').length;
    const assigned = assignedList.length;
    const progress = assigned > 0 ? Math.min((closed / assigned) * 100, 100) : 0;

    return { person, assigned, active, closed, progress };
  });

  const handleSignOut = async () => {
    try {
      await logoutAdmin();
    } catch (err) {
      // ignore
    }
    onLogout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-charcoal-950 text-cream-100 flex flex-col pt-0">
      <SEO title="Admin Dashboard" />

      {/* Top Admin Header */}
      <header className="bg-charcoal-900 border-b border-charcoal-800 px-3 py-2.5 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-1.5 bg-white rounded-lg flex items-center justify-center">
            <img src={blackLogo} alt="WebNest Logo Mark" className="h-6 w-auto object-contain" />
          </div>
          <div className="flex flex-col text-left leading-none font-display">
            <span className="font-extrabold text-sm text-white tracking-tight">WebNest</span>
            <span className="font-bold text-[9px] text-warmNeutral-400 tracking-[0.2em] uppercase mt-0.5">SOLUTIONS</span>
          </div>
          <span className="text-[10px] bg-brandRed-500/20 text-brandRed-500 font-bold px-2 py-0.5 rounded border border-brandRed-500/30 uppercase tracking-widest ml-2">
            Admin
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-xs text-warmNeutral-400">
            Logged in as <strong className="text-white">{user?.email || 'Admin'}</strong>
          </span>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <button
            onClick={handleSignOut}
            className="bg-charcoal-800 hover:bg-red-500/20 hover:text-red-400 text-warmNeutral-300 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      <div className="flex-1 flex flex-col md:flex-row max-w-[1700px] w-full mx-auto px-2 sm:px-3 lg:px-3 py-2 gap-3">
        
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-56 space-y-1.5 flex-shrink-0">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'overview'
                ? 'bg-brandRed-500 text-white shadow-md'
                : 'bg-charcoal-900 text-warmNeutral-300 hover:bg-charcoal-800 hover:text-white border border-charcoal-800'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Overview & Stats</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'projects'
                ? 'bg-brandRed-500 text-white shadow-md'
                : 'bg-charcoal-900 text-warmNeutral-300 hover:bg-charcoal-800 hover:text-white border border-charcoal-800'
            }`}
          >
            <FolderKanban className="w-4 h-4" />
            <span>Projects ({stats.totalProjects})</span>
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'services'
                ? 'bg-brandRed-500 text-white shadow-md'
                : 'bg-charcoal-900 text-warmNeutral-300 hover:bg-charcoal-800 hover:text-white border border-charcoal-800'
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span>Services</span>
          </button>

          <button
            onClick={() => setActiveTab('testimonials')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'testimonials'
                ? 'bg-brandRed-500 text-white shadow-md'
                : 'bg-charcoal-900 text-warmNeutral-300 hover:bg-charcoal-800 hover:text-white border border-charcoal-800'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Testimonials</span>
          </button>

          <button
            onClick={() => setActiveTab('enquiries')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'enquiries'
                ? 'bg-brandRed-500 text-white shadow-md'
                : 'bg-charcoal-900 text-warmNeutral-300 hover:bg-charcoal-800 hover:text-white border border-charcoal-800'
            }`}
          >
            <div className="flex items-center space-x-3">
              <MailCheck className="w-4 h-4" />
              <span>Enquiries</span>
            </div>
            {stats.newEnquiries > 0 && (
              <span className="bg-white text-brandRed-500 font-extrabold text-[10px] px-2 py-0.5 rounded-full">
                {stats.newEnquiries} New
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'settings'
                ? 'bg-brandRed-500 text-white shadow-md'
                : 'bg-charcoal-900 text-warmNeutral-300 hover:bg-charcoal-800 hover:text-white border border-charcoal-800'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Site Settings</span>
          </button>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1">
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-3">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.24em] text-brandRed-500 font-bold">Sales command center</p>
                  <h2 className="text-2xl font-bold font-display text-white mt-2">Dashboard Overview</h2>
                  <p className="text-xs text-warmNeutral-500 mt-1">Track pipeline health, assignments, and project momentum in one place.</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveTab('projects')}
                    className="bg-charcoal-800 hover:bg-charcoal-700 text-white text-xs px-3 py-2 rounded-xl border border-charcoal-700"
                  >
                    + Add Project
                  </button>
                  <button
                    onClick={() => setActiveTab('enquiries')}
                    className="bg-brandRed-500 hover:bg-brandRed-600 text-white text-xs px-3 py-2 rounded-xl font-bold"
                  >
                    Review Leads
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-[1.45fr_0.9fr] gap-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
                    <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl p-3 space-y-2 shadow-[0_10px_24px_rgba(0,0,0,0.12)]">
                      <div className="flex items-center justify-between text-warmNeutral-500">
                        <span className="text-[10px] uppercase tracking-[0.18em] font-semibold">Total Projects</span>
                        <FolderKanban className="w-4 h-4 text-brandRed-500" />
                      </div>
                      <div className="text-3xl font-black font-display text-white">{stats.totalProjects}</div>
                      <p className="text-[10px] text-warmNeutral-500">Portfolio items</p>
                    </div>

                    <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl p-3 space-y-2">
                      <div className="flex items-center justify-between text-warmNeutral-500">
                        <span className="text-[10px] uppercase tracking-[0.18em] font-semibold">Open Pipeline</span>
                        <TrendingUp className="w-4 h-4 text-amber-400" />
                      </div>
                      <div className="text-3xl font-black font-display text-white">{stats.activeLeads}</div>
                      <p className="text-[10px] text-warmNeutral-500">Active leads</p>
                    </div>

                    <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl p-3 space-y-2">
                      <div className="flex items-center justify-between text-warmNeutral-500">
                        <span className="text-[10px] uppercase tracking-[0.18em] font-semibold">Assigned</span>
                        <Users className="w-4 h-4 text-brandRed-500" />
                      </div>
                      <div className="text-3xl font-black font-display text-white">{stats.assignedLeads}</div>
                      <p className="text-[10px] text-warmNeutral-500">Owners assigned</p>
                    </div>

                    <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl p-3 space-y-2">
                      <div className="flex items-center justify-between text-warmNeutral-500">
                        <span className="text-[10px] uppercase tracking-[0.18em] font-semibold">Completed</span>
                        <Sparkles className="w-4 h-4 text-green-400" />
                      </div>
                      <div className="text-3xl font-black font-display text-green-400">{stats.completedLeads}</div>
                      <p className="text-[10px] text-warmNeutral-500">Closed deals</p>
                    </div>
                  </div>

                  <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-white">Sales pipeline</h3>
                      <span className="text-[10px] uppercase tracking-[0.18em] text-warmNeutral-500">Live</span>
                    </div>
                    <div className="space-y-4">
                      {[
                        { label: 'New', value: stats.newEnquiries, color: 'bg-brandRed-500', width: Math.min((stats.newEnquiries / Math.max(stats.totalEnquiries, 1)) * 100, 100) },
                        { label: 'Contacted', value: stats.contactedLeads, color: 'bg-amber-500', width: Math.min((stats.contactedLeads / Math.max(stats.totalEnquiries, 1)) * 100, 100) },
                        { label: 'In Progress', value: stats.inProgressLeads, color: 'bg-blue-500', width: Math.min((stats.inProgressLeads / Math.max(stats.totalEnquiries, 1)) * 100, 100) },
                        { label: 'Completed', value: stats.completedLeads, color: 'bg-green-500', width: Math.min((stats.completedLeads / Math.max(stats.totalEnquiries, 1)) * 100, 100) },
                      ].map((stage) => (
                        <div key={stage.label} className="space-y-1.5">
                          <div className="flex justify-between text-[11px] text-warmNeutral-400">
                            <span>{stage.label}</span>
                            <span>{stage.value}</span>
                          </div>
                          <div className="h-2 rounded-full bg-charcoal-800 overflow-hidden">
                            <div className={`${stage.color} h-full rounded-full`} style={{ width: `${stage.width}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-white">Salesman-wise overview</h3>
                      <CircleDashed className="w-4 h-4 text-brandRed-500" />
                    </div>
                    <div className="space-y-3 text-xs">
                      {salesBreakdown.map(({ person, assigned, active, closed, progress }) => (
                        <div key={person} className="rounded-xl border border-charcoal-800 bg-charcoal-950 p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-warmNeutral-200">{person}</span>
                            <span className="text-[10px] uppercase tracking-[0.18em] text-warmNeutral-500">{assigned} leads</span>
                          </div>
                          <div className="flex items-center gap-2 text-[10px] text-warmNeutral-400">
                            <span className="text-brandRed-500 font-semibold">{active} active</span>
                            <span>•</span>
                            <span className="text-green-400 font-semibold">{closed} closed</span>
                          </div>
                          <div className="mt-2 h-1.5 rounded-full bg-charcoal-800 overflow-hidden">
                            <div className="h-full rounded-full bg-brandRed-500" style={{ width: `${progress}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl p-4 space-y-3">
                    <h3 className="text-base font-bold text-white">Quick Actions</h3>
                    <div className="space-y-2">
                      <button
                        onClick={() => setActiveTab('projects')}
                        className="w-full bg-charcoal-800 hover:bg-charcoal-700 text-cream-100 text-xs px-4 py-2.5 rounded-xl border border-charcoal-700 text-left"
                      >
                        + Add New Portfolio Project
                      </button>
                      <button
                        onClick={() => setActiveTab('enquiries')}
                        className="w-full bg-brandRed-500 hover:bg-brandRed-600 text-white text-xs px-4 py-2.5 rounded-xl font-bold text-left"
                      >
                        View Lead Submissions ({stats.newEnquiries} New)
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'projects' && <ProjectManager />}
          {activeTab === 'services' && <ServiceManager />}
          {activeTab === 'testimonials' && <TestimonialManager />}
          {activeTab === 'enquiries' && <EnquiryManager />}
          {activeTab === 'settings' && <SettingsManager />}
        </main>

      </div>
    </div>
  );
};
