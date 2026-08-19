import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Search, X, FileText, Info, Users, DollarSign, Smartphone, BookOpen, Shield, Heart, Scale, Accessibility, HelpCircle } from 'lucide-react';

const INFO_PAGES = [
  { title: 'Home', path: 'Home', icon: BookOpen, keywords: 'home welcome wealth inicio' },
  { title: 'About', path: 'About', icon: Info, keywords: 'about mission values nosotros mission' },
  { title: 'The App', path: 'App', icon: Smartphone, keywords: 'app mobile download ios android' },
  { title: 'Trusted Partners', path: 'Partners', icon: Users, keywords: 'partners directory trusted support socios' },
  { title: 'Apply as Partner', path: 'PartnerApplication', icon: Users, keywords: 'apply partner application socios aplicar' },
  { title: 'Transparency', path: 'Transparency', icon: DollarSign, keywords: 'transparency funding contributions report transparencia' },
  { title: 'Blog', path: 'Blog', icon: FileText, keywords: 'blog articles insights noticias' },
  { title: 'FAQ', path: 'FAQ', icon: HelpCircle, keywords: 'faq questions help preguntas frecuentes' },
  { title: 'Privacy Policy', path: 'Privacy', icon: Shield, keywords: 'privacy policy data privacidad' },
  { title: 'Terms of Use', path: 'Terms', icon: Scale, keywords: 'terms use legal terminos' },
  { title: 'Accessibility', path: 'Accessibility', icon: Accessibility, keywords: 'accessibility aoda wcag accesibilidad' },
  { title: 'Disclaimer', path: 'Disclaimer', icon: Heart, keywords: 'disclaimer advice financial aviso' },
];

export default function GlobalSearch() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  // Debounce
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 200);
    return () => clearTimeout(timer);
  }, [query]);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcut: Cmd/Ctrl + K
  useEffect(() => {
    function handleKeyDown(event) {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
      if (event.key === 'Escape') {
        setIsOpen(false);
        setQuery('');
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const { data: posts = [] } = useQuery({
    queryKey: ['blog-posts-search'],
    queryFn: () => base44.entities.BlogPost.filter({ status: 'published' }, '-created_date'),
    initialData: [],
  });

  const q = debouncedQuery.toLowerCase().trim();

  const matchedPages = q.length < 2 ? [] : INFO_PAGES.filter(page => {
    const titleMatch = page.title.toLowerCase().includes(q);
    const keywordMatch = page.keywords.toLowerCase().includes(q);
    return titleMatch || keywordMatch;
  }).slice(0, 5);

  const matchedPosts = q.length < 2 ? [] : posts.filter(post => {
    const titleMatch = post.title?.toLowerCase().includes(q);
    const excerptMatch = post.excerpt?.toLowerCase().includes(q);
    const categoryMatch = post.category?.toLowerCase().includes(q);
    return titleMatch || excerptMatch || categoryMatch;
  }).slice(0, 5);

  const hasResults = matchedPages.length > 0 || matchedPosts.length > 0;
  const showResults = isOpen && q.length >= 2;

  const handleResultClick = () => {
    setIsOpen(false);
    setQuery('');
    setDebouncedQuery('');
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search..."
          className="w-40 md:w-56 pl-9 pr-8 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1152d4]/20 focus:border-[#1152d4] focus:bg-white transition-all"
        />
        {query ? (
          <button
            onClick={() => { setQuery(''); setDebouncedQuery(''); inputRef.current?.focus(); }}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        ) : (
          <kbd className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-medium text-gray-400 bg-white border border-gray-200 rounded">
            ⌘K
          </kbd>
        )}
      </div>

      {/* Results Dropdown */}
      {showResults && (
        <div className="absolute right-0 mt-2 w-80 md:w-96 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50 max-h-[70vh] overflow-y-auto">
          {hasResults ? (
            <div className="py-2">
              {/* Info Pages */}
              {matchedPages.length > 0 && (
                <div>
                  <div className="px-4 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-50">
                    Pages
                  </div>
                  {matchedPages.map((page, idx) => {
                    const Icon = page.icon;
                    return (
                      <Link
                        key={`page-${idx}`}
                        to={createPageUrl(page.path)}
                        onClick={handleResultClick}
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-[#1152d4]/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-4 h-4 text-[#1152d4]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{page.title}</p>
                          <p className="text-xs text-gray-400">Page</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}

              {/* Blog Posts */}
              {matchedPosts.length > 0 && (
                <div className={matchedPages.length > 0 ? 'mt-1' : ''}>
                  <div className="px-4 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-50">
                    Blog Articles
                  </div>
                  {matchedPosts.map((post, idx) => (
                    <Link
                      key={`post-${idx}`}
                      to={createPageUrl('BlogPost') + `?id=${post.id}`}
                      onClick={handleResultClick}
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors group"
                    >
                      {post.featured_image ? (
                        <img src={post.featured_image} alt="" className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-[#d86c00]/10 flex items-center justify-center flex-shrink-0">
                          <FileText className="w-4 h-4 text-[#d86c00]" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 line-clamp-1">{post.title}</p>
                        <p className="text-xs text-gray-400 line-clamp-1">{post.category}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* Full results link */}
              <div className="border-t border-gray-100 mt-1 pt-1">
                <Link
                  to={createPageUrl('Blog')}
                  onClick={handleResultClick}
                  className="flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm text-[#1152d4] hover:bg-blue-50 transition-colors font-medium"
                >
                  <Search className="w-3.5 h-3.5" />
                  See all results for "{query}"
                </Link>
              </div>
            </div>
          ) : (
            <div className="py-10 px-4 text-center">
              <Search className="w-10 h-10 text-gray-200 mx-auto mb-3" />
              <p className="text-sm text-gray-500 font-medium">No results found</p>
              <p className="text-xs text-gray-400 mt-1">Try searching for "blog", "partners", or "privacy"</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}