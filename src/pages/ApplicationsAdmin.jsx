import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import AdminLayout from '../components/admin/AdminLayout';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, Loader2, ChevronDown, ChevronUp, CheckCircle, XCircle, Clock, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const STATUS_OPTIONS = ['pending', 'under_review', 'approved', 'rejected'];
const STATUS_COLORS = {
  pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  under_review: 'bg-blue-50 text-blue-700 border-blue-200',
  approved: 'bg-green-50 text-green-700 border-green-200',
  rejected: 'bg-red-50 text-red-700 border-red-200',
};

export default function ApplicationsAdmin() {
  const qc = useQueryClient();
  const [expanded, setExpanded] = useState(null);
  const [notes, setNotes] = useState({});
  const [filter, setFilter] = useState('all');

  const { data: apps = [], isLoading } = useQuery({
    queryKey: ['admin-apps-list'],
    queryFn: () => base44.entities.PartnerApplication.list('-created_date'),
  });

  const updateM = useMutation({
    mutationFn: ({ id, data }) => base44.entities.PartnerApplication.update(id, data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-apps-list'] }); qc.invalidateQueries({ queryKey: ['admin-apps'] }); },
  });

  const filtered = filter === 'all' ? apps : apps.filter(a => a.status === filter);

  const setStatus = (id, status) => updateM.mutate({ id, data: { status } });
  const saveNotes = (id) => { updateM.mutate({ id, data: { admin_notes: notes[id] } }); };

  return (
    <AdminGuard>
      <div className="bg-[#f8f6f8] min-h-screen">
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Link to={createPageUrl('AdminDashboard')} className="text-sm text-gray-500 hover:text-[#1152d4]">← Dashboard</Link>
            <h1 className="text-3xl font-bold text-gray-900 mt-1">Partner Applications</h1>
            <p className="text-gray-500 mt-1">{apps.filter(a => a.status === 'pending').length} pending review</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Filter Tabs */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {['all', ...STATUS_OPTIONS].map(s => (
              <button key={s} onClick={() => setFilter(s)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all capitalize ${filter === s ? 'bg-[#1152d4] text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}>
                {s === 'all' ? `All (${apps.length})` : `${s.replace('_', ' ')} (${apps.filter(a => a.status === s).length})`}
              </button>
            ))}
          </div>

          {isLoading ? <div className="flex justify-center py-24"><Loader2 className="w-8 h-8 text-[#1152d4] animate-spin" /></div> :
            filtered.length === 0 ? <div className="text-center py-24 text-gray-500">No applications found.</div> :
            <div className="space-y-4">
              {filtered.map(app => (
                <div key={app.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer" onClick={() => setExpanded(expanded === app.id ? null : app.id)}>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="font-semibold text-gray-900">{app.org_name}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${STATUS_COLORS[app.status]}`}>{app.status?.replace('_', ' ')}</span>
                      </div>
                      <div className="text-sm text-gray-500 mt-0.5">{app.contact_name} · {app.email} · <span className="capitalize">{app.category}</span></div>
                    </div>
                    <div className="flex items-center gap-2">
                      {/* Quick status change */}
                      <div className="flex gap-1" onClick={e => e.stopPropagation()}>
                        <button title="Approve" onClick={() => setStatus(app.id, 'approved')} className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg"><CheckCircle className="w-4 h-4" /></button>
                        <button title="Reject" onClick={() => setStatus(app.id, 'rejected')} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"><XCircle className="w-4 h-4" /></button>
                        <button title="Under Review" onClick={() => setStatus(app.id, 'under_review')} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><Eye className="w-4 h-4" /></button>
                      </div>
                      {expanded === app.id ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                    </div>
                  </div>
                  {expanded === app.id && (
                    <div className="border-t border-gray-100 px-6 py-6 space-y-5 bg-gray-50">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div><span className="font-medium text-gray-700">Phone:</span> <span className="text-gray-600">{app.phone || '—'}</span></div>
                        <div><span className="font-medium text-gray-700">Website:</span> <a href={app.website} target="_blank" rel="noopener noreferrer" className="text-[#1152d4] hover:underline">{app.website || '—'}</a></div>
                        <div><span className="font-medium text-gray-700">Contribution Model:</span> <span className="text-gray-600 capitalize">{app.contribution_model || '—'}</span></div>
                        <div><span className="font-medium text-gray-700">Applied:</span> <span className="text-gray-600">{app.created_date ? new Date(app.created_date).toLocaleDateString() : '—'}</span></div>
                      </div>
                      {app.description && <div><p className="text-xs font-semibold text-gray-500 uppercase mb-1">Description</p><p className="text-sm text-gray-700">{app.description}</p></div>}
                      {app.licensing && <div><p className="text-xs font-semibold text-gray-500 uppercase mb-1">Licensing & Credentials</p><p className="text-sm text-gray-700">{app.licensing}</p></div>}
                      {app.why_partner && <div><p className="text-xs font-semibold text-gray-500 uppercase mb-1">Why Partner</p><p className="text-sm text-gray-700">{app.why_partner}</p></div>}
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Admin Notes</p>
                        <Textarea value={notes[app.id] ?? (app.admin_notes || '')} onChange={e => setNotes(n => ({ ...n, [app.id]: e.target.value }))} className="h-20 text-sm" placeholder="Internal notes..." />
                        <Button onClick={() => saveNotes(app.id)} size="sm" variant="outline" className="mt-2">Save Notes</Button>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Change Status</p>
                        <div className="flex gap-2 flex-wrap">
                          {STATUS_OPTIONS.map(s => (
                            <button key={s} onClick={() => setStatus(app.id, s)} className={`px-3 py-1.5 rounded-lg text-xs font-medium border capitalize transition-all ${app.status === s ? 'bg-[#1152d4] text-white border-[#1152d4]' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}>{s.replace('_', ' ')}</button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          }
        </div>
      </div>
    </AdminGuard>
  );
}