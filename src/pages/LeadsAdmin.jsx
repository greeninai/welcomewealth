import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import AdminLayout from '../components/admin/AdminLayout';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, Loader2, ChevronDown, ChevronUp, Trash2, Mail, MapPin, Phone, Globe, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const STATUS_OPTIONS = ['new', 'contacted', 'resolved', 'archived'];
const STATUS_COLORS = {
  new: 'bg-purple-50 text-purple-700 border-purple-200',
  contacted: 'bg-blue-50 text-blue-700 border-blue-200',
  resolved: 'bg-green-50 text-green-700 border-green-200',
  archived: 'bg-gray-100 text-gray-500 border-gray-200',
};

const URGENCY_LABELS = {
  not_urgent: { label: 'Not urgent', color: 'text-gray-500' },
  within_month: { label: 'Within a month', color: 'text-yellow-600' },
  within_week: { label: 'Within a week', color: 'text-orange-500' },
  urgent: { label: '🔴 Urgent', color: 'text-red-600 font-semibold' },
};

const PROVINCE_NAMES = {
  AB: 'Alberta', BC: 'British Columbia', MB: 'Manitoba', NB: 'New Brunswick',
  NL: 'Newfoundland', NS: 'Nova Scotia', NT: 'NWT', NU: 'Nunavut',
  ON: 'Ontario', PE: 'PEI', QC: 'Quebec', SK: 'Saskatchewan', YT: 'Yukon',
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

  const { data: user } = useQuery({
    queryKey: ['me'],
    queryFn: async () => { try { return await base44.auth.me(); } catch { return null; } },
  });

  const updateM = useMutation({
    mutationFn: ({ id, data }) => base44.entities.ContactLead.update(id, data),
    onSuccess: async (_, { id, data }) => {
      qc.invalidateQueries({ queryKey: ['admin-leads-list'] });
      qc.invalidateQueries({ queryKey: ['admin-leads'] });
      // Log the action
      if (user && data.status) {
        const lead = leads.find(l => l.id === id);
        await base44.entities.AuditLog.create({
          admin_email: user.email,
          admin_name: user.full_name || user.email,
          action: 'status_change',
          entity_type: 'ContactLead',
          entity_id: id,
          entity_name: lead?.name || id,
          details: `Status changed to "${data.status}"`,
        }).catch(() => {});
      }
    },
  });

  const deleteM = useMutation({
    mutationFn: id => base44.entities.ContactLead.delete(id),
    onSuccess: async (_, id) => {
      qc.invalidateQueries({ queryKey: ['admin-leads-list'] });
      qc.invalidateQueries({ queryKey: ['admin-leads'] });
      if (user) {
        const lead = leads.find(l => l.id === id);
        await base44.entities.AuditLog.create({
          admin_email: user.email,
          admin_name: user.full_name || user.email,
          action: 'delete',
          entity_type: 'ContactLead',
          entity_id: id,
          entity_name: lead?.name || id,
          details: 'Lead deleted',
        }).catch(() => {});
      }
    },
  });

  const filtered = filter === 'all' ? leads : leads.filter(l => l.status === filter);

  return (
    <AdminLayout currentPage="LeadsAdmin">
      <div className="bg-[#f8f6f8] min-h-screen">
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Link to={createPageUrl('AdminDashboard')} className="text-sm text-gray-500 hover:text-[#1152d4]">← Dashboard</Link>
            <h1 className="text-3xl font-bold text-gray-900 mt-1">Contact Leads</h1>
            <p className="text-gray-500 mt-1">{leads.filter(l => l.status === 'new').length} new leads · {leads.length} total</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex gap-2 mb-6 flex-wrap">
            {['all', ...STATUS_OPTIONS].map(s => (
              <button key={s} onClick={() => setFilter(s)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all capitalize ${filter === s ? 'bg-[#1152d4] text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}>
                {s === 'all' ? `All (${leads.length})` : `${s.charAt(0).toUpperCase() + s.slice(1)} (${leads.filter(l => l.status === s).length})`}
              </button>
            ))}
          </div>

          {isLoading ? <div className="flex justify-center py-24"><Loader2 className="w-8 h-8 text-[#1152d4] animate-spin" /></div> :
            filtered.length === 0 ? <div className="text-center py-24 text-gray-500">No leads found.</div> :
            <div className="space-y-4">
              {filtered.map(lead => {
                const urgency = URGENCY_LABELS[lead.urgency];
                return (
                  <div key={lead.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {/* Row header */}
                    <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer" onClick={() => setExpanded(expanded === lead.id ? null : lead.id)}>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="font-semibold text-gray-900">{lead.name}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${STATUS_COLORS[lead.status]}`}>{lead.status}</span>
                          {lead.urgency && lead.urgency !== 'not_urgent' && (
                            <span className={`text-xs font-medium ${urgency?.color}`}>{urgency?.label}</span>
                          )}
                          {lead.consent_given && <span className="text-xs text-green-600 flex items-center gap-0.5"><CheckCircle2 className="w-3 h-3" />Consent</span>}
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 mt-1">
                          <span>{lead.email}</span>
                          {lead.city && lead.province && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{lead.city}, {PROVINCE_NAMES[lead.province] || lead.province}</span>}
                          {lead.partner_category && <span className="capitalize">📂 {lead.partner_category}</span>}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <a href={`mailto:${lead.email}`} onClick={e => e.stopPropagation()} className="p-1.5 text-gray-400 hover:text-[#1152d4] hover:bg-blue-50 rounded-lg" title="Send email"><Mail className="w-4 h-4" /></a>
                        {lead.phone && <a href={`tel:${lead.phone}`} onClick={e => e.stopPropagation()} className="p-1.5 text-gray-400 hover:text-[#188a42] hover:bg-green-50 rounded-lg" title="Call"><Phone className="w-4 h-4" /></a>}
                        <button onClick={e => { e.stopPropagation(); if (window.confirm('Delete this lead? This action cannot be undone.')) deleteM.mutate(lead.id); }} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                        {expanded === lead.id ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                      </div>
                    </div>

                    {/* Expanded */}
                    {expanded === lead.id && (
                      <div className="border-t border-gray-100 px-6 py-6 bg-gray-50 space-y-5">
                        {/* Full details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                          <InfoItem icon={Mail} label="Email" value={lead.email} />
                          {lead.phone && <InfoItem icon={Phone} label="Phone" value={lead.phone} />}
                          {(lead.city || lead.province) && <InfoItem icon={MapPin} label="Location" value={[lead.city, lead.province ? (PROVINCE_NAMES[lead.province] || lead.province) : ''].filter(Boolean).join(', ')} />}
                          {lead.preferred_language && <InfoItem icon={Globe} label="Language" value={lead.preferred_language} />}
                          {lead.preferred_contact_method && <InfoItem icon={Mail} label="Preferred Contact" value={lead.preferred_contact_method} />}
                          {lead.urgency && <InfoItem icon={Clock} label="Urgency" value={URGENCY_LABELS[lead.urgency]?.label || lead.urgency} />}
                        </div>

                        {lead.services_needed && lead.services_needed.length > 0 && (
                          <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Services Requested</p>
                            <div className="flex flex-wrap gap-2">
                              {lead.services_needed.map((s, i) => <span key={i} className="text-xs px-2 py-1 bg-white border border-gray-200 rounded-full text-gray-700">{s}</span>)}
                            </div>
                          </div>
                        )}

                        {lead.message && (
                          <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Message</p>
                            <p className="text-sm text-gray-700 whitespace-pre-wrap bg-white border border-gray-100 rounded-lg p-3">{lead.message}</p>
                          </div>
                        )}

                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Admin Notes</p>
                          <Textarea value={notes[lead.id] ?? (lead.admin_notes || '')} onChange={e => setNotes(n => ({ ...n, [lead.id]: e.target.value }))} className="h-20 text-sm" placeholder="Internal notes..." />
                          <Button onClick={() => updateM.mutate({ id: lead.id, data: { admin_notes: notes[lead.id] ?? lead.admin_notes } })} size="sm" variant="outline" className="mt-2">Save Notes</Button>
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
                );
              })}
            </div>
          }
        </div>
      </div>
    </AdminLayout>
  );
}

function InfoItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-2">
      <Icon className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
      <div>
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-sm text-gray-800 font-medium">{value}</p>
      </div>
    </div>
  );
}