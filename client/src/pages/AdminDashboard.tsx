import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProjects, fetchEnquiries, logoutAdmin } from '../services/api';
import { ProjectManager } from '../admin/ProjectManager';
import { ServiceManager } from '../admin/ServiceManager';
import { TestimonialManager } from '../admin/TestimonialManager';
import { EnquiryManager } from '../admin/EnquiryManager';
import { SettingsManager } from '../admin/SettingsManager';
import { SEO } from '../components/SEO';
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
} from 'lucide-react';
import blackLogo from '../assets/webnest-icon.png';

interface AdminDashboardProps {
  user: any;
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'services' | 'testimonials' | 'enquiries' | 'settings'>('overview');
  const [stats, setStats] = useState({
    totalProjects: 0,
    featuredProjects: 0,
    totalEnquiries: 0,
    newEnquiries: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [projRes, enqRes] = await Promise.all([
          fetchProjects(undefined, undefined, true),
          fetchEnquiries(),
        ]);

        const projs = projRes.data.projects || [];
        const enqs = enqRes.data.enquiries || [];

        setStats({
          totalProjects: projs.length,
          featuredProjects: projs.filter((p) => p.featured).length,
          totalEnquiries: enqs.length,
          newEnquiries: enqs.filter((e) => e.status === 'New').length,
        });
      } catch (err) {
        console.error('Error loading dashboard stats:', err);
      }
    };
    loadStats();
  }, [activeTab]);

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
    <div className="min-h-screen bg-charcoal-950 text-cream-100 flex flex-col pt-20">
      <SEO title="Admin Dashboard" />

      {/* Top Admin Header */}
      <header className="bg-charcoal-900 border-b border-charcoal-800 px-6 py-4 flex items-center justify-between">
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
          <button
            onClick={handleSignOut}
            className="bg-charcoal-800 hover:bg-red-500/20 hover:text-red-400 text-warmNeutral-300 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 gap-8">
        
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-64 space-y-2 flex-shrink-0">
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
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold transition-colors ${
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
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold font-display text-white">Dashboard Overview</h2>
                <p className="text-xs text-warmNeutral-500">Live agency performance metrics & enquiry status.</p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl p-5 space-y-2">
                  <div className="flex items-center justify-between text-warmNeutral-500">
                    <span className="text-xs uppercase font-semibold">Total Projects</span>
                    <FolderKanban className="w-4 h-4 text-brandRed-500" />
                  </div>
                  <div className="text-3xl font-black font-display text-white">{stats.totalProjects}</div>
                </div>

                <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl p-5 space-y-2">
                  <div className="flex items-center justify-between text-warmNeutral-500">
                    <span className="text-xs uppercase font-semibold">Featured</span>
                    <Star className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-3xl font-black font-display text-white">{stats.featuredProjects}</div>
                </div>

                <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl p-5 space-y-2">
                  <div className="flex items-center justify-between text-warmNeutral-500">
                    <span className="text-xs uppercase font-semibold">Total Enquiries</span>
                    <MailCheck className="w-4 h-4 text-brandRed-500" />
                  </div>
                  <div className="text-3xl font-black font-display text-white">{stats.totalEnquiries}</div>
                </div>

                <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl p-5 space-y-2">
                  <div className="flex items-center justify-between text-warmNeutral-500">
                    <span className="text-xs uppercase font-semibold">New Enquiries</span>
                    <Sparkles className="w-4 h-4 text-green-400" />
                  </div>
                  <div className="text-3xl font-black font-display text-green-400">{stats.newEnquiries}</div>
                </div>
              </div>

              <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl p-6 space-y-4">
                <h3 className="text-base font-bold text-white">Quick Actions</h3>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => setActiveTab('projects')}
                    className="bg-charcoal-800 hover:bg-charcoal-750 text-cream-100 text-xs px-4 py-2.5 rounded-xl border border-charcoal-700"
                  >
                    + Add New Portfolio Project
                  </button>
                  <button
                    onClick={() => setActiveTab('enquiries')}
                    className="bg-brandRed-500 hover:bg-brandRed-600 text-white text-xs px-4 py-2.5 rounded-xl font-bold"
                  >
                    View Lead Submissions ({stats.newEnquiries} New)
                  </button>
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
