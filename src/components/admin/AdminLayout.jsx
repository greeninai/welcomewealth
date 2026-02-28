import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { isAuthorizedAdmin } from './AdminGuard';
import {
  LayoutDashboard, FileText, Users, ClipboardList, Inbox,
  LogOut, Menu, X, ChevronRight, Loader2, Shield
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Dashboard', page: 'AdminDashboard', icon: LayoutDashboard },
  { label: 'Blog', page: 'BlogAdmin', icon: FileText },
  { label: 'Partner Directory', page: 'PartnersAdmin', icon: Users },
  { label: 'Solicitudes', page: 'ApplicationsAdmin', icon: ClipboardList },
  { label: 'Leads', page: 'LeadsAdmin', icon: Inbox },
];

export default function AdminLayout({ children, currentPage }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const { data: user, isLoading } = useQuery({
    queryKey: ['me'],
    queryFn: async () => { try { return await base44.auth.me(); } catch { return null; } },
  });

  const { data: applications = [] } = useQuery({
    queryKey: ['admin-apps'],
    queryFn: () => base44.entities.PartnerApplication.list(),
    enabled: !!user && isAuthorizedAdmin(user?.email),
  });

  const { data: leads = [] } = useQuery({
    queryKey: ['admin-leads'],
    queryFn: () => base44.entities.ContactLead.list(),
    enabled: !!user && isAuthorizedAdmin(user?.email),
  });

  const pendingApps = applications.filter(a => a.status === 'pending').length;
  const newLeads = leads.filter(l => l.status === 'new').length;

  const getBadge = (page) => {
    if (page === 'ApplicationsAdmin' && pendingApps > 0) return pendingApps;
    if (page === 'LeadsAdmin' && newLeads > 0) return newLeads;
    return null;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f8f6f8] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#1152d4] animate-spin" />
      </div>
    );
  }

  if (!user) {
    navigate(createPageUrl('AdminLogin'), { replace: true });
    return null;
  }

  if (!isAuthorizedAdmin(user.email)) {
    return (
      <div className="min-h-screen bg-[#f8f6f8] flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Acceso Restringido</h1>
          <p className="text-gray-500 mb-2">Área exclusiva para administradores de WelcomeWealth.</p>
          <p className="text-xs text-gray-400 mb-6">Conectado como: <span className="font-medium text-gray-600">{user.email}</span></p>
          <div className="space-y-3">
            <button onClick={() => base44.auth.logout(createPageUrl('AdminLogin'))} className="w-full px-6 py-3 bg-[#1152d4] text-white rounded-lg font-medium hover:bg-[#0d3da3]">
              Cerrar sesión
            </button>
            <Link to={createPageUrl('Home')} className="block px-6 py-3 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50">
              Volver al sitio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const Sidebar = ({ mobile = false }) => (
    <div className={`flex flex-col h-full ${mobile ? 'p-0' : ''}`}>
      {/* Logo area */}
      <div className="px-6 py-5 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <img
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6986a2ab487be21fdd4ca463/f35f84552_WelcomeWealth_Logo.png"
            alt="WelcomeWealth"
            className="h-7 brightness-200"
          />
          <span className="text-xs font-bold text-white/60 bg-white/10 px-2 py-0.5 rounded-full">ADMIN</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map(({ label, page, icon: Icon }) => {
          const badge = getBadge(page);
          const active = currentPage === page;
          return (
            <Link
              key={page}
              to={createPageUrl(page)}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active
                  ? 'bg-white/15 text-white'
                  : 'text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="flex-1">{label}</span>
              {badge && (
                <span className="bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                  {badge}
                </span>
              )}
              {active && <ChevronRight className="w-3.5 h-3.5 opacity-60" />}
            </Link>
          );
        })}
      </nav>

      {/* User + Logout */}
      <div className="px-3 py-4 border-t border-gray-800">
        <div className="flex items-center gap-3 px-3 py-2 rounded-xl mb-2 bg-white/5">
          <div className="w-7 h-7 rounded-full bg-[#1152d4] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {user.full_name?.[0] || user.email?.[0]?.toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-medium truncate">{user.full_name || 'Admin'}</p>
            <p className="text-white/40 text-xs truncate">{user.email}</p>
          </div>
        </div>
        <button
          onClick={() => base44.auth.logout(window.location.origin + createPageUrl('AdminLogin'))}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-white/60 hover:bg-white/10 hover:text-white text-sm font-medium transition-all"
        >
          <LogOut className="w-4 h-4" />
          Cerrar sesión
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#f8f6f8] overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-60 bg-[#0d1f4e] flex-shrink-0">
        <Sidebar />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <aside className="relative flex flex-col w-64 bg-[#0d1f4e] z-10">
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 text-white/60 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <Sidebar mobile />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Top Bar */}
        <div className="lg:hidden bg-[#0d1f4e] px-4 py-3 flex items-center gap-3 flex-shrink-0">
          <button onClick={() => setSidebarOpen(true)} className="text-white/70 hover:text-white">
            <Menu className="w-5 h-5" />
          </button>
          <img
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6986a2ab487be21fdd4ca463/f35f84552_WelcomeWealth_Logo.png"
            alt="WelcomeWealth"
            className="h-6 brightness-200"
          />
          <span className="text-xs font-bold text-white/60 bg-white/10 px-2 py-0.5 rounded-full">ADMIN</span>
        </div>

        {/* Scrollable page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}