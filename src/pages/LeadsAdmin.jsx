import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import AdminLayout from '../components/admin/AdminLayout';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, Loader2, ChevronDown, ChevronUp, Trash2, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const STATUS_OPTIONS = ['new', 'contacted', 'resolved', 'archived'];
const STATUS_COLORS = {
  new: 'bg-purple-50 text-purple-700 border-purple-200',
  contacted: 'bg-blue-50 text-blue-700 border-blue-200',
  resolved: 'bg-green-50 text-green-700 border-green-200',
  archived: 'bg-gray-100 text-gray-500 border-gray-200',
};

export default function LeadsAdmin() {
  const qc = useQueryClient();
  const [expanded, setExpanded] = useState(null);
  const [notes, setNotes] = useState({});
  const [filter, setFilter] = useState('all');

  const { data: leads = [], isLoading } = useQuery({
    queryKey: ['admin-leads-list'],
    queryFn: () => base44.entities.ContactLead.list('-created_date'),
  });

  const updateM = useMutation({
    mutationFn: ({ id, data }) => base44.entities.ContactLead.update(id, data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-leads-list'] }); qc.invalidateQueries({ queryKey: ['admin-leads'] }); },
  });

  const deleteM = useMutation({
    mutationFn: id => base44.entities.ContactLead.delete(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-leads-list'] }); qc.invalidateQueries({ queryKey: ['admin-leads'] }); },
  });

  const filtered = filter === 'all' ? leads : leads.filter(l => l.status === filter);

  return (
    <AdminLayout currentPage="LeadsAdmin">
      <div className="bg-[#f8f6f8] min-h-screen">
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Link to={createPageUrl('AdminDashboard')} className="text-sm text-gray-500 hover:text-[#1152d4]">← Dashboard</Link>
            <h1 className="text-3xl font-bold text-gray-900 mt-1">Contact Leads</h1>
            <p className="text-gray-500 mt-1">{leads.filter(l => l.status === 'new').length} new leads</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex gap-2 mb-6 flex-wrap">
            {['all', ...STATUS_OPTIONS].map(s => (
              <button key={s} onClick={() => setFilter(s)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all capitalize ${filter === s ? 'bg-[#1152d4] text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}>
                {s === 'all' ? `All (${leads.length})` : `${s} (${leads.filter(l => l.status === s).length})`}
              </button>
            ))}
          </div>

          {isLoading ? <div className="flex justify-center py-24"><Loader2 className="w-8 h-8 text-[#1152d4] animate-spin" /></div> :
            filtered.length === 0 ? <div className="text-center py-24 text-gray-500">No leads found.</div> :
            <div className="space-y-4">
              {filtered.map(lead => (
                <div key={lead.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer" onClick={() => setExpanded(expanded === lead.id ? null : lead.id)}>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="font-semibold text-gray-900">{lead.name}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${STATUS_COLORS[lead.status]}`}>{lead.status}</span>
                        {lead.source && <span className="text-xs text-gray-400">{lead.source.replace('_', ' ')}</span>}
                      </div>
                      <div className="text-sm text-gray-500 mt-0.5">{lead.email} · Category: <span className="capitalize">{lead.partner_category || '—'}</span></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <a href={`mailto:${lead.email}`} onClick={e => e.stopPropagation()} className="p-1.5 text-gray-400 hover:text-[#1152d4] hover:bg-blue-50 rounded-lg" title="Send email"><Mail className="w-4 h-4" /></a>
                      <button onClick={e => { e.stopPropagation(); if (confirm('Delete this lead?')) deleteM.mutate(lead.id); }} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                      {expanded === lead.id ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                    </div>
                  </div>
                  {expanded === lead.id && (
                    <div className="border-t border-gray-100 px-6 py-6 bg-gray-50 space-y-5">
                      {lead.message && <div><p className="text-xs font-semibold text-gray-500 uppercase mb-1">Message</p><p className="text-sm text-gray-700 whitespace-pre-wrap">{lead.message}</p></div>}
                      <div><p className="text-xs font-semibold text-gray-500 uppercase mb-1">Admin Notes</p>
                        <Textarea value={notes[lead.id] ?? (lead.admin_notes || '')} onChange={e => setNotes(n => ({ ...n, [lead.id]: e.target.value }))} className="h-20 text-sm" placeholder="Internal notes..." />
                        <Button onClick={() => updateM.mutate({ id: lead.id, data: { admin_notes: notes[lead.id] } })} size="sm" variant="outline" className="mt-2">Save Notes</Button>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Change Status</p>
                        <div className="flex gap-2 flex-wrap">
                          {STATUS_OPTIONS.map(s => (
                            <button key={s} onClick={() => updateM.mutate({ id: lead.id, data: { status: s } })} className={`px-3 py-1.5 rounded-lg text-xs font-medium border capitalize transition-all ${lead.status === s ? 'bg-[#1152d4] text-white border-[#1152d4]' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}>{s}</button>
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
    </AdminLayout>
  );
}