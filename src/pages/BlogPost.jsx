import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Clock, ArrowLeft, Loader2, BookOpen } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { categoryColors } from '../components/blog/BlogCard';

export default function BlogPost() {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('id');

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['all-blog-posts'],
    queryFn: () => base44.entities.BlogPost.list('-created_date'),
    initialData: [],
  });

  const post = posts.find(p => p.id === postId);
  const relatedPosts = posts.filter(p => p.id !== postId && p.category === post?.category).slice(0, 3);

  const colors = post ? (categoryColors[post.category] || { bg: '#f3f4f615', text: '#6b7280' }) : {};

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f8f6f8]">
        <Loader2 className="w-8 h-8 text-[#1152d4] animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#f8f6f8] flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Article not found</h2>
          <p className="text-gray-600 mb-6">This article may have been moved or removed.</p>
          <Link
            to={createPageUrl('Blog')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#1152d4] text-white rounded-xl font-medium hover:bg-[#0d3da3] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f8f6f8]">
      {/* Back Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to={createPageUrl('Blog')}
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#1152d4] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all articles
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <header className="mb-10">
          <span
            className="inline-block text-sm font-semibold px-4 py-1.5 rounded-full mb-6"
            style={{ backgroundColor: colors.bg, color: colors.text }}
          >
            {post.category}
          </span>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
            {post.title}
          </h1>

          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            {post.excerpt}
          </p>

          <div className="flex items-center gap-6 text-sm text-gray-500 pb-8 border-b border-gray-200">
            {post.author && (
              <div>
                <span className="font-semibold text-gray-900">{post.author}</span>
                {post.author_title && (
                  <span className="ml-2 text-gray-500">· {post.author_title}</span>
                )}
              </div>
            )}
            {post.read_time && (
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {post.read_time} min read
              </span>
            )}
          </div>
        </header>

        {/* Featured Image */}
        {post.featured_image && (
          <div className="rounded-2xl overflow-hidden mb-12 shadow-lg">
            <img
              src={post.featured_image}
              alt={post.title}
              className="w-full h-72 md:h-96 object-cover"
            />
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-lg prose-gray max-w-none
          prose-headings:font-bold prose-headings:text-gray-900
          prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
          prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
          prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-5
          prose-li:text-gray-700 prose-li:leading-relaxed
          prose-strong:text-gray-900 prose-strong:font-semibold
          prose-a:text-[#1152d4] prose-a:no-underline hover:prose-a:underline
          prose-blockquote:border-l-4 prose-blockquote:border-[#1152d4] prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-600 prose-blockquote:bg-blue-50 prose-blockquote:py-2 prose-blockquote:rounded-r-lg
          prose-ul:list-disc prose-ul:ml-6
          prose-ol:list-decimal prose-ol:ml-6
        ">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>

        {/* Author Bio Footer */}
        {post.author && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="bg-white rounded-2xl p-6 flex items-start gap-4 shadow-sm">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#1152d4] to-[#0d3da3] flex items-center justify-center flex-shrink-0 text-white font-bold text-xl">
                {post.author.charAt(0)}
              </div>
              <div>
                <div className="font-bold text-gray-900">{post.author}</div>
                {post.author_title && (
                  <div className="text-sm text-gray-600 mb-2">{post.author_title}</div>
                )}
                <p className="text-sm text-gray-600 leading-relaxed">
                  Part of the WelcomeWealth editorial team, committed to providing clear and accessible financial education.
                </p>
              </div>
            </div>
          </div>
        )}
      </article>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">More in {post.category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map(related => {
                const relColors = categoryColors[related.category] || { bg: '#f3f4f615', text: '#6b7280' };
                return (
                  <Link
                    key={related.id}
                    to={createPageUrl(`BlogPost?id=${related.id}`)}
                    className="group block bg-[#f8f6f8] rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
                  >
                    {related.featured_image && (
                      <div className="h-44 overflow-hidden">
                        <img
                          src={related.featured_image}
                          alt={related.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <span
                        className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3"
                        style={{ backgroundColor: relColors.bg, color: relColors.text }}
                      >
                        {related.category}
                      </span>
                      <h3 className="font-bold text-gray-900 group-hover:text-[#1152d4] transition-colors line-clamp-2">
                        {related.title}
                      </h3>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Back CTA */}
      <div className="bg-[#f8f6f8] py-12 text-center">
        <Link
          to={createPageUrl('Blog')}
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#1152d4] text-white rounded-xl font-medium hover:bg-[#0d3da3] transition-colors shadow-lg"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to all articles
        </Link>
      </div>
    </div>
  );
}