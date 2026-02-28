import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import AdminLayout from '../components/admin/AdminLayout';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Plus, Pencil, Trash2, ArrowLeft, Save, Loader2, Shield, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const EMPTY = {
  name: '', category: 'education', description: '', website: '', email: '',
  phone: '', location: '', languages: [], services: [], verified: false,
  featured: false, status: 'active', contribution_model: '', notes: ''
};

const STATUS_COLORS = {
  active: 'bg-green-50 text-green-700',
  inactive: 'bg-gray-100 text-gray-500',
  suspended: 'bg-red-50 text-red-700',
};

export default function PartnersAdmin() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);

  const { data: partners = [], isLoading } = useQuery({
    queryKey: ['admin-partners-list'],
    queryFn: () => base44.entities.Partner.list('-created_date'),
  });

  const createM = useMutation({ mutationFn: d => base44.entities.Partner.create(d), onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-partners-list'] }); qc.invalidateQueries({ queryKey: ['admin-partners'] }); setEditing(null); } });
  const updateM = useMutation({ mutationFn: ({ id, d }) => base44.entities.Partner.update(id, d), onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-partners-list'] }); qc.invalidateQueries({ queryKey: ['admin-partners'] }); setEditing(null); } });
  const deleteM = useMutation({ mutationFn: id => base44.entities.Partner.delete(id), onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-partners-list'] }); qc.invalidateQueries({ queryKey: ['admin-partners'] }); } });

  const isSaving = createM.isPending || updateM.isPending;

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { ...form, languages: typeof form.languages === 'string' ? form.languages.split(',').map(s => s.trim()).filter(Boolean) : form.languages, services: typeof form.services === 'string' ? form.services.split(',').map(s => s.trim()).filter(Boolean) : form.services };
    if (editing === 'new') createM.mutate(data);
    else updateM.mutate({ id: editing.id, d: data });
  };

  const openEdit = (p) => { setForm({ ...p, languages: Array.isArray(p.languages) ? p.languages.join(', ') : '', services: Array.isArray(p.services) ? p.services.join(', ') : '' }); setEditing(p); };
  const openNew = () => { setForm({ ...EMPTY, languages: '', services: '' }); setEditing('new'); };

  return (
    <AdminGuard>
      <div className="bg-[#f8f6f8] min-h-screen">
        {editing !== null ? (
          <>
            <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                <button onClick={() => setEditing(null)} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm font-medium"><ArrowLeft className="w-4 h-4" /> Back</button>
                <h1 className="text-lg font-bold text-gray-900">{editing === 'new' ? 'New Partner' : 'Edit Partner'}</h1>
                <Button onClick={handleSubmit} disabled={isSaving} className="bg-[#1152d4] hover:bg-[#0d3da3]">{isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}Save</Button>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Name *</label><Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                  <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#1152d4]">
                    <option value="education">Financial Education</option>
                    <option value="professional">Licensed Professional</option>
                    <option value="community">Community Support</option>
                  </select>
                </div>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Description</label><Textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className="h-20" /></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Website</label><Input value={form.website} onChange={e => setForm(f => ({ ...f, website: e.target.value }))} placeholder="https://..." /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><Input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Phone</label><Input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Location</label><Input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} placeholder="City, Province" /></div>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Languages (comma-separated)</label><Input value={form.languages} onChange={e => setForm(f => ({ ...f, languages: e.target.value }))} placeholder="English, French, Spanish" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Services (comma-separated)</label><Input value={form.services} onChange={e => setForm(f => ({ ...f, services: e.target.value }))} placeholder="Budgeting, Credit Education" /></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#1152d4]">
                    <option value="active">Active</option><option value="inactive">Inactive</option><option value="suspended">Suspended</option>
                  </select>
                </div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Contribution Model</label>
                  <select value={form.contribution_model} onChange={e => setForm(f => ({ ...f, contribution_model: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#1152d4]">
                    <option value="">— None —</option><option value="option-a">Option A</option><option value="option-b">Option B</option><option value="option-c">Option C (Blended)</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-6">
                <label className="flex items-center gap-3 cursor-pointer"><div onClick={() => setForm(f => ({ ...f, verified: !f.verified }))} className={`w-10 h-6 rounded-full relative transition-colors ${form.verified ? 'bg-[#188a42]' : 'bg-gray-300'}`}><span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${form.verified ? 'translate-x-5' : 'translate-x-1'}`} /></div><span className="text-sm font-medium text-gray-700">Verified</span></label>
                <label className="flex items-center gap-3 cursor-pointer"><div onClick={() => setForm(f => ({ ...f, featured: !f.featured }))} className={`w-10 h-6 rounded-full relative transition-colors ${form.featured ? 'bg-[#1152d4]' : 'bg-gray-300'}`}><span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${form.featured ? 'translate-x-5' : 'translate-x-1'}`} /></div><span className="text-sm font-medium text-gray-700">Featured</span></label>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Internal Notes</label><Textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} className="h-20" /></div>
              <div className="flex gap-4 pt-2">
                <Button type="submit" disabled={isSaving} className="bg-[#1152d4] hover:bg-[#0d3da3] flex-1">{isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}{editing === 'new' ? 'Add Partner' : 'Save Changes'}</Button>
                <Button type="button" variant="outline" onClick={() => setEditing(null)} className="px-8">Cancel</Button>
              </div>
            </form>
          </>
        ) : (
          <>
            <div className="bg-white border-b border-gray-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <Link to={createPageUrl('AdminDashboard')} className="text-sm text-gray-500 hover:text-[#1152d4]">← Dashboard</Link>
                  <h1 className="text-3xl font-bold text-gray-900 mt-1">Partner Directory</h1>
                  <p className="text-gray-500 mt-1">{partners.length} partners</p>
                </div>
                <Button onClick={openNew} className="bg-[#1152d4] hover:bg-[#0d3da3]"><Plus className="w-4 h-4 mr-2" />Add Partner</Button>
              </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              {isLoading ? <div className="flex justify-center py-24"><Loader2 className="w-8 h-8 text-[#1152d4] animate-spin" /></div> :
                partners.length === 0 ? <div className="text-center py-24"><p className="text-gray-500 mb-4">No partners yet.</p><Button onClick={openNew} className="bg-[#1152d4] hover:bg-[#0d3da3]"><Plus className="w-4 h-4 mr-2" />Add first partner</Button></div> :
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <table className="w-full text-sm">
                    <thead><tr className="border-b border-gray-100 bg-gray-50">
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Name</th>
                      <th className="text-left px-4 py-4 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">Category</th>
                      <th className="text-center px-4 py-4 text-xs font-semibold text-gray-500 uppercase hidden lg:table-cell">Status</th>
                      <th className="text-center px-4 py-4 text-xs font-semibold text-gray-500 uppercase hidden lg:table-cell">Verified</th>
                      <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                    </tr></thead>
                    <tbody className="divide-y divide-gray-50">
                      {partners.map(p => (
                        <tr key={p.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4"><div className="font-medium text-gray-900 flex items-center gap-2">{p.name}{p.featured && <Star className="w-3 h-3 text-amber-400" />}</div><div className="text-xs text-gray-400">{p.location || '—'}</div></td>
                          <td className="px-4 py-4 hidden md:table-cell capitalize text-gray-500 text-xs">{p.category}</td>
                          <td className="px-4 py-4 text-center hidden lg:table-cell"><span className={`text-xs px-2 py-1 rounded-full font-medium ${STATUS_COLORS[p.status] || 'bg-gray-100 text-gray-500'}`}>{p.status}</span></td>
                          <td className="px-4 py-4 text-center hidden lg:table-cell">{p.verified ? <Shield className="w-4 h-4 text-[#188a42] mx-auto" /> : <span className="text-gray-300">—</span>}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-2">
                              <button onClick={() => openEdit(p)} className="p-2 text-gray-400 hover:text-[#1152d4] hover:bg-blue-50 rounded-lg"><Pencil className="w-4 h-4" /></button>
                              <button onClick={() => { if (confirm('Delete this partner?')) deleteM.mutate(p.id); }} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              }
            </div>
          </>
        )}
      </div>
    </AdminGuard>
  );
}