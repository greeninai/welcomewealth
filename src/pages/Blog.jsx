import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { BookOpen, Users, Megaphone, Loader2, Settings } from 'lucide-react';
import BlogCard from '../components/blog/BlogCard';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const categories = [
  { id: 'all', label: 'All Articles' },
  { id: 'Financial Literacy', label: 'Financial Literacy', icon: BookOpen, color: '#1152d4' },
  { id: 'Newcomer Tips', label: 'Newcomer Tips', icon: Users, color: '#188a42' },
  { id: 'Community Updates', label: 'Community Updates', icon: Megaphone, color: '#d86c00' },
];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const { data: user } = useQuery({
    queryKey: ['me'],
    queryFn: async () => { try { return await base44.auth.me(); } catch { return null; } },
  });

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: () => base44.entities.BlogPost.filter({ status: 'published' }, '-created_date'),
    initialData: [],
  });

  const featuredPost = selectedCategory === 'all' ? posts.find(p => p.featured) : null;

  const filteredPosts = posts.filter(p => {
    if (p.featured && selectedCategory === 'all') return false;
    if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
    return true;
  });

  return (
    <div className="bg-[#f8f6f8]">
      {/* Hero */}
      <section className="bg-gradient-to-br from-white to-blue-50 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <img
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6986a2ab487be21fdd4ca463/9391760f3_WelcomeWealth_Symbol.png"
            alt="WelcomeWealth"
            className="w-16 h-16 mx-auto mb-6"
          />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Insights & Resources
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Articles on financial literacy, newcomer tips, and community updates to help you navigate life in Canada.
          </p>
          {user?.role === 'admin' && (
            <div className="mt-6">
              <Link
                to={createPageUrl('BlogAdmin')}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                <Settings className="w-4 h-4" />
                Manage Articles
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Category Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-4 no-scrollbar">
            {categories.map(cat => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-[#1152d4] text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Articles */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex items-center justify-center py-24">
              <Loader2 className="w-8 h-8 text-[#1152d4] animate-spin" />
            </div>
          ) : (
            <>
              {/* Featured Article */}
              {featuredPost && (
                <div className="mb-14">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-px flex-1 bg-gray-200" />
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Featured Article</span>
                    <div className="h-px flex-1 bg-gray-200" />
                  </div>
                  <BlogCard post={featuredPost} featured={true} />
                </div>
              )}

              {/* Posts Grid */}
              {filteredPosts.length > 0 ? (
                <>
                  {featuredPost && (
                    <div className="flex items-center gap-4 mb-8">
                      <div className="h-px flex-1 bg-gray-200" />
                      <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">More Articles</span>
                      <div className="h-px flex-1 bg-gray-200" />
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts.map(post => (
                      <BlogCard key={post.id} post={post} />
                    ))}
                  </div>
                </>
              ) : (
                !featuredPost && (
                  <div className="text-center py-24">
                    <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles in this category yet</h3>
                    <p className="text-gray-600">Check back soon for new content.</p>
                  </div>
                )
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}