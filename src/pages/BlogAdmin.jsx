import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Plus, Pencil, Trash2, Eye, EyeOff, Star, Loader2, ArrowLeft, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import AdminLayout from '../components/admin/AdminLayout';

const EMPTY_FORM = {
  title: '', slug: '', excerpt: '', content: '', featured_image: '',
  category: 'Financial Literacy', author: '', author_title: '',
  read_time: 5, featured: false, status: 'published',
};

const categoryOptions = [
  'Financial Literacy', 'Newcomer Tips', 'Community Updates',
];

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function BlogAdmin() {
  const queryClient = useQueryClient();
  const [editingPost, setEditingPost] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['blog-posts-admin'],
    queryFn: () => base44.entities.BlogPost.list('-created_date'),
  });

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.BlogPost.create(data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['blog-posts-admin'] }); queryClient.invalidateQueries({ queryKey: ['blog-posts'] }); setEditingPost(null); },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.BlogPost.update(id, data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['blog-posts-admin'] }); queryClient.invalidateQueries({ queryKey: ['blog-posts'] }); setEditingPost(null); },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.BlogPost.delete(id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['blog-posts-admin'] }); queryClient.invalidateQueries({ queryKey: ['blog-posts'] }); },
  });

  const openNew = () => { setForm(EMPTY_FORM); setEditingPost('new'); };
  const openEdit = (post) => { setForm({ ...post }); setEditingPost(post); };

  const handleTitleChange = (title) => {
    setForm(f => ({ ...f, title, slug: slugify(title) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingPost === 'new') createMutation.mutate(form);
    else updateMutation.mutate({ id: editingPost.id, data: form });
  };

  const isSaving = createMutation.isPending || updateMutation.isPending;

  if (editingPost !== null) {
    return (
      <AdminLayout currentPage="BlogAdmin">
        <div className="bg-[#f8f6f8] min-h-screen">
          <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
              <button onClick={() => setEditingPost(null)} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm font-medium">
                <ArrowLeft className="w-4 h-4" /> Back to posts
              </button>
              <h1 className="text-lg font-bold text-gray-900">{editingPost === 'new' ? 'New Article' : 'Edit Article'}</h1>
              <Button onClick={handleSubmit} disabled={isSaving} className="bg-[#1152d4] hover:bg-[#0d3da3]">
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}Save
              </Button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
              <Input value={form.title} onChange={e => handleTitleChange(e.target.value)} required placeholder="Article title" className="text-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
              <Input value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} placeholder="url-friendly-slug" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt *</label>
              <Textarea value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))} required placeholder="Short summary..." className="h-24" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Content (Markdown) *</label>
              <Textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} required placeholder="Full article content in Markdown format..." className="h-64 font-mono text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Featured Image URL</label>
              <Input value={form.featured_image} onChange={e => setForm(f => ({ ...f, featured_image: e.target.value }))} placeholder="https://images.unsplash.com/..." />
              {form.featured_image && <img src={form.featured_image} alt="preview" className="mt-3 h-40 w-full object-cover rounded-xl" />}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1152d4] bg-white">
                  {categoryOptions.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1152d4] bg-white">
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Author Name</label>
                <Input value={form.author} onChange={e => setForm(f => ({ ...f, author: e.target.value }))} placeholder="e.g. WelcomeWealth Team" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Author Title</label>
                <Input value={form.author_title} onChange={e => setForm(f => ({ ...f, author_title: e.target.value }))} placeholder="e.g. Financial Education Specialist" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Read Time (minutes)</label>
                <Input type="number" min="1" max="60" value={form.read_time} onChange={e => setForm(f => ({ ...f, read_time: parseInt(e.target.value) || 5 }))} />
              </div>
              <div className="flex items-end pb-1">
                <label className="flex items-center gap-3 cursor-pointer">
                  <div onClick={() => setForm(f => ({ ...f, featured: !f.featured }))} className={`w-12 h-6 rounded-full transition-colors relative ${form.featured ? 'bg-[#1152d4]' : 'bg-gray-300'}`}>
                    <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${form.featured ? 'translate-x-7' : 'translate-x-1'}`} />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Featured article</span>
                </label>
              </div>
            </div>
            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={isSaving} className="bg-[#1152d4] hover:bg-[#0d3da3] flex-1 py-6 text-base">
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                {editingPost === 'new' ? 'Publish Article' : 'Save Changes'}
              </Button>
              <Button type="button" variant="outline" onClick={() => setEditingPost(null)} className="px-8">Cancel</Button>
            </div>
          </form>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout currentPage="BlogAdmin">
      <div className="bg-[#f8f6f8] min-h-screen">
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <Link to={createPageUrl('AdminDashboard')} className="text-sm text-gray-500 hover:text-[#1152d4]">← Dashboard</Link>
                <span className="text-gray-300">·</span>
                <Link to={createPageUrl('Blog')} className="text-sm text-gray-500 hover:text-[#1152d4]">Blog</Link>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Blog Admin</h1>
              <p className="text-gray-600 mt-1">{posts.length} article{posts.length !== 1 ? 's' : ''} total</p>
            </div>
            <Button onClick={openNew} className="bg-[#1152d4] hover:bg-[#0d3da3]">
              <Plus className="w-4 h-4 mr-2" /> New Article
            </Button>
          </div>
        </div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {isLoading ? (
            <div className="flex justify-center py-24"><Loader2 className="w-8 h-8 text-[#1152d4] animate-spin" /></div>
          ) : posts.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-gray-500 mb-4">No articles yet.</p>
              <Button onClick={openNew} className="bg-[#1152d4] hover:bg-[#0d3da3]"><Plus className="w-4 h-4 mr-2" />Create your first article</Button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Title</th>
                    <th className="text-left px-4 py-4 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">Category</th>
                    <th className="text-center px-4 py-4 text-xs font-semibold text-gray-500 uppercase hidden lg:table-cell">Status</th>
                    <th className="text-center px-4 py-4 text-xs font-semibold text-gray-500 uppercase hidden lg:table-cell">Featured</th>
                    <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {posts.map(post => (
                    <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900 line-clamp-1">{post.title}</div>
                        <div className="text-xs text-gray-400 mt-0.5">{post.author || '—'} · {post.read_time} min read</div>
                      </td>
                      <td className="px-4 py-4 hidden md:table-cell">
                        <span className="text-xs px-2 py-1 bg-blue-50 text-[#1152d4] rounded-full font-medium">{post.category}</span>
                      </td>
                      <td className="px-4 py-4 text-center hidden lg:table-cell">
                        <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full font-medium ${post.status === 'published' ? 'bg-green-50 text-[#188a42]' : 'bg-gray-100 text-gray-500'}`}>
                          {post.status === 'published' ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                          {post.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center hidden lg:table-cell">
                        {post.featured ? <Star className="w-4 h-4 text-amber-400 mx-auto" /> : <span className="text-gray-300">—</span>}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => openEdit(post)} className="p-2 text-gray-400 hover:text-[#1152d4] hover:bg-blue-50 rounded-lg transition-colors">
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button onClick={() => { if (confirm('Delete this article?')) deleteMutation.mutate(post.id); }} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </AdminLayout>
  );
}