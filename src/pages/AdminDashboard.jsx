import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import AdminLayout from '../components/admin/AdminLayout';
import { FileText, Users, Inbox, ChevronRight, Clock, Star } from 'lucide-react';

function StatCard({ label, value, sub, color, icon: Icon }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">{label}</p>
          <p className="text-3xl font-bold text-gray-900">{value ?? '—'}</p>
          {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
        </div>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}18` }}>
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
      </div>
    </div>
  );
}

function QuickLink({ to, label, description, icon: Icon, color }) {
  return (
    <Link
      to={createPageUrl(to)}
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all flex items-center gap-4 group"
    >
      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${color}15` }}>
        <Icon className="w-6 h-6" style={{ color }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-900">{label}</p>
        <p className="text-sm text-gray-500 truncate">{description}</p>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-500 transition-colors" />
    </Link>
  );
}

export default function AdminDashboard() {
  const { data: posts = [] } = useQuery({ queryKey: ['admin-posts'], queryFn: () => base44.entities.BlogPost.list() });
  const { data: applications = [] } = useQuery({ queryKey: ['admin-apps'], queryFn: () => base44.entities.PartnerApplication.list() });
  const { data: partners = [] } = useQuery({ queryKey: ['admin-partners'], queryFn: () => base44.entities.Partner.list() });
  const { data: leads = [] } = useQuery({ queryKey: ['admin-leads'], queryFn: () => base44.entities.ContactLead.list() });

  const pendingApps = applications.filter(a => a.status === 'pending').length;
  const newLeads = leads.filter(l => l.status === 'new').length;
  const publishedPosts = posts.filter(p => p.status === 'published').length;
  const activePartners = partners.filter(p => p.status === 'active').length;

  return (
    <AdminLayout currentPage="AdminDashboard">
      <div className="bg-[#f8f6f8] min-h-[100vh]">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500 mt-1">Panel de control WelcomeWealth</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Published Articles" value={publishedPosts} sub={`${posts.length} total`} color="#1152d4" icon={FileText} />
            <StatCard label="Active Partners" value={activePartners} sub={`${partners.length} total`} color="#188a42" icon={Users} />
            <StatCard label="Pending Applications" value={pendingApps} sub={`${applications.length} total`} color="#d86c00" icon={Clock} />
            <StatCard label="New Leads" value={newLeads} sub={`${leads.length} total`} color="#7c3aed" icon={Inbox} />
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Manage</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <QuickLink to="BlogAdmin" label="Blog Articles" description="Create, edit and publish articles" icon={FileText} color="#1152d4" />
              <QuickLink to="PartnersAdmin" label="Partner Directory" description="Manage active partners" icon={Users} color="#188a42" />
              <QuickLink to="ApplicationsAdmin" label="Partner Applications" description={`${pendingApps} pending review`} icon={Clock} color="#d86c00" />
              <QuickLink to="LeadsAdmin" label="Contact Leads" description={`${newLeads} new leads`} icon={Inbox} color="#7c3aed" />
            </div>
          </div>

          {/* Recent Applications */}
          {applications.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-700">Recent Applications</h2>
                <Link to={createPageUrl('ApplicationsAdmin')} className="text-sm text-[#1152d4] hover:underline">View all →</Link>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-gray-100 bg-gray-50">
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Organization</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">Category</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                  </tr></thead>
                  <tbody className="divide-y divide-gray-50">
                    {applications.slice(0, 5).map(app => (
                      <tr key={app.id} className="hover:bg-gray-50">
                        <td className="px-6 py-3 font-medium text-gray-900">{app.org_name}</td>
                        <td className="px-4 py-3 text-gray-500 hidden md:table-cell capitalize">{app.category}</td>
                        <td className="px-4 py-3">
                          <StatusBadge status={app.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Recent Leads */}
          {leads.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-700">Recent Leads</h2>
                <Link to={createPageUrl('LeadsAdmin')} className="text-sm text-[#1152d4] hover:underline">View all →</Link>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-gray-100 bg-gray-50">
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Name</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">Email</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                  </tr></thead>
                  <tbody className="divide-y divide-gray-50">
                    {leads.slice(0, 5).map(lead => (
                      <tr key={lead.id} className="hover:bg-gray-50">
                        <td className="px-6 py-3 font-medium text-gray-900">{lead.name}</td>
                        <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{lead.email}</td>
                        <td className="px-4 py-3"><StatusBadge status={lead.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

function StatusBadge({ status }) {
  const map = {
    pending: { color: 'bg-yellow-50 text-yellow-700', label: 'Pending' },
    under_review: { color: 'bg-blue-50 text-blue-700', label: 'Under Review' },
    approved: { color: 'bg-green-50 text-green-700', label: 'Approved' },
    rejected: { color: 'bg-red-50 text-red-700', label: 'Rejected' },
    new: { color: 'bg-purple-50 text-purple-700', label: 'New' },
    contacted: { color: 'bg-blue-50 text-blue-700', label: 'Contacted' },
    resolved: { color: 'bg-green-50 text-green-700', label: 'Resolved' },
    archived: { color: 'bg-gray-100 text-gray-500', label: 'Archived' },
    active: { color: 'bg-green-50 text-green-700', label: 'Active' },
    inactive: { color: 'bg-gray-100 text-gray-500', label: 'Inactive' },
    suspended: { color: 'bg-red-50 text-red-700', label: 'Suspended' },
    published: { color: 'bg-green-50 text-green-700', label: 'Published' },
    draft: { color: 'bg-gray-100 text-gray-500', label: 'Draft' },
  };
  const s = map[status] || { color: 'bg-gray-100 text-gray-500', label: status };
  return <span className={`text-xs px-2 py-1 rounded-full font-medium ${s.color}`}>{s.label}</span>;
}