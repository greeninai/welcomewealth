import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import AdminLayout from '../components/admin/AdminLayout';
import { Shield, Loader2, Search, X, Clock, User, FileText } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';

const ACTION_COLORS = {
  create: 'bg-green-50 text-green-700',
  update: 'bg-blue-50 text-blue-700',
  delete: 'bg-red-50 text-red-700',
  status_change: 'bg-purple-50 text-purple-700',
  login: 'bg-gray-100 text-gray-600',
};

export default function AuditLogPage() {
  const [search, setSearch] = useState('');

  const { data: logs = [], isLoading } = useQuery({
    queryKey: ['audit-logs'],
    queryFn: () => base44.entities.AuditLog.list('-created_date', 200),
  });

  const filtered = logs.filter(l =>
    !search ||
    l.admin_email?.toLowerCase().includes(search.toLowerCase()) ||
    l.entity_type?.toLowerCase().includes(search.toLowerCase()) ||
    l.action?.toLowerCase().includes(search.toLowerCase()) ||
    l.entity_name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout currentPage="AuditLog">
      <div className="bg-[#f8f6f8] min-h-screen">
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center gap-3 mb-1">
              <Shield className="w-6 h-6 text-[#1152d4]" />
              <h1 className="text-3xl font-bold text-gray-900">Audit Log</h1>
            </div>
            <p className="text-gray-500">Complete record of all administrative actions for security traceability</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search */}
          <div className="relative mb-6 max-w-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by admin, action, or entity..." className="pl-9" />
            {search && <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"><X className="w-4 h-4" /></button>}
          </div>

          {isLoading ? (
            <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-[#1152d4] animate-spin" /></div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              {logs.length === 0 ? 'No audit entries yet. Actions performed by admins will appear here.' : 'No results match your search.'}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase"><Clock className="w-3 h-3 inline mr-1" />Date & Time</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase"><User className="w-3 h-3 inline mr-1" />Admin</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Action</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">Entity</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden lg:table-cell">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filtered.map(log => (
                      <tr key={log.id} className="hover:bg-gray-50">
                        <td className="px-5 py-3 whitespace-nowrap text-gray-600 text-xs">
                          {log.created_date ? format(new Date(log.created_date), 'MMM d, yyyy HH:mm') : '—'}
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-medium text-gray-900 text-xs">{log.admin_name || log.admin_email}</div>
                          {log.admin_name && <div className="text-gray-400 text-xs">{log.admin_email}</div>}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${ACTION_COLORS[log.action] || 'bg-gray-100 text-gray-600'}`}>
                            {log.action?.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          <div className="text-xs text-gray-500">{log.entity_type}</div>
                          {log.entity_name && <div className="text-xs text-gray-700 font-medium">{log.entity_name}</div>}
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-500 hidden lg:table-cell max-w-xs truncate">{log.details || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-5 py-3 border-t border-gray-100 text-xs text-gray-400">
                Showing {filtered.length} of {logs.length} entries (last 200 actions)
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}