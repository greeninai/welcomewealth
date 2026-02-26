import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Clock, ArrowRight } from 'lucide-react';

export const categoryColors = {
  'Financial Education': { bg: '#1152d415', text: '#1152d4', border: '#1152d430' },
  'Community Resilience': { bg: '#188a4215', text: '#188a42', border: '#188a4230' },
  'Responsible Innovation': { bg: '#d86c0015', text: '#d86c00', border: '#d86c0030' },
  'GreenIn Impact News': { bg: '#7c3aed15', text: '#7c3aed', border: '#7c3aed30' },
};

export default function BlogCard({ post, featured = false }) {
  const colors = categoryColors[post.category] || { bg: '#f3f4f615', text: '#6b7280', border: '#e5e7eb' };

  if (featured) {
    return (
      <Link to={createPageUrl(`BlogPost?id=${post.id}`)} className="group block">
        <div className="grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
          {post.featured_image && (
            <div className="h-64 md:h-80 overflow-hidden">
              <img
                src={post.featured_image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          )}
          <div className="p-8 md:p-10 flex flex-col justify-center">
            <span
              className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 w-fit"
              style={{ backgroundColor: colors.bg, color: colors.text }}
            >
              {post.category}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 group-hover:text-[#1152d4] transition-colors leading-tight line-clamp-3">
              {post.title}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">{post.excerpt}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-gray-500">
                {post.author && <span className="font-medium">{post.author}</span>}
                {post.read_time && (
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.read_time} min read
                  </span>
                )}
              </div>
              <ArrowRight className="w-5 h-5 text-[#1152d4] group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={createPageUrl(`BlogPost?id=${post.id}`)} className="group block h-full">
      <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
        {post.featured_image && (
          <div className="h-52 overflow-hidden flex-shrink-0">
            <img
              src={post.featured_image}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}
        <div className="p-6 flex flex-col flex-grow">
          <span
            className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3 w-fit"
            style={{ backgroundColor: colors.bg, color: colors.text }}
          >
            {post.category}
          </span>
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#1152d4] transition-colors leading-tight line-clamp-2 flex-shrink-0">
            {post.title}
          </h3>
          <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3 flex-grow text-sm">{post.excerpt}</p>
          <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
            <div className="flex items-center gap-3 text-sm text-gray-500">
              {post.author && <span className="font-medium">{post.author}</span>}
              {post.read_time && (
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {post.read_time} min
                </span>
              )}
            </div>
            <ArrowRight className="w-4 h-4 text-[#1152d4] group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}