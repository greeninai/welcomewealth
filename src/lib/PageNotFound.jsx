import { useLocation, Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Home, BookOpen, Users, FileText, AlertCircle } from 'lucide-react';
import { createPageUrl } from '@/utils';

export default function PageNotFound() {
    const location = useLocation();
    const pageName = location.pathname.substring(1);

    const { data: authData, isFetched } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            try {
                const user = await base44.auth.me();
                return { user, isAuthenticated: true };
            } catch (error) {
                return { user: null, isAuthenticated: false };
            }
        }
    });

    const quickLinks = [
        { label: 'Home', path: 'Home', icon: Home },
        { label: 'The App', path: 'App', icon: BookOpen },
        { label: 'Trusted Partners', path: 'Partners', icon: Users },
        { label: 'Blog', path: 'Blog', icon: FileText },
    ];

    return (
        <div className="min-h-screen bg-[#f8f6f8] flex flex-col items-center justify-center p-6">
            <div className="max-w-lg w-full text-center">
                {/* Logo */}
                <img
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6986a2ab487be21fdd4ca463/9391760f3_WelcomeWealth_Symbol.png"
                    alt="WelcomeWealth"
                    className="w-16 h-16 mx-auto mb-8 opacity-60"
                />

                {/* 404 */}
                <div className="mb-6">
                    <span className="text-8xl font-bold text-[#1152d4] opacity-20 select-none">404</span>
                </div>

                {/* Message */}
                <h1 className="text-3xl font-bold text-gray-900 mb-3">Page Not Found</h1>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                    Sorry, we couldn't find the page you were looking for. It may have been moved or doesn't exist.
                </p>

                {/* Admin Note */}
                {isFetched && authData?.isAuthenticated && authData?.user?.role === 'admin' && (
                    <div className="mb-8 p-4 bg-amber-50 rounded-xl border border-amber-200 text-left">
                        <div className="flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm font-semibold text-amber-800">Admin Note</p>
                                <p className="text-sm text-amber-700 mt-1">
                                    The page <strong>"{pageName}"</strong> hasn't been implemented yet. Ask the AI to create it in the chat.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Primary CTA */}
                <Link
                    to={createPageUrl('Home')}
                    className="inline-flex items-center gap-2 px-8 py-3 bg-[#1152d4] text-white rounded-xl font-medium hover:bg-[#0d3da3] transition-colors mb-10"
                >
                    <Home className="w-4 h-4" />
                    Back to Home
                </Link>

                {/* Quick Links */}
                <div>
                    <p className="text-sm text-gray-500 mb-4">Or explore these pages:</p>
                    <div className="grid grid-cols-2 gap-3">
                        {quickLinks.map((link) => {
                            const Icon = link.icon;
                            return (
                                <Link
                                    key={link.path}
                                    to={createPageUrl(link.path)}
                                    className="flex items-center gap-2 p-3 bg-white rounded-xl border border-gray-200 text-gray-700 hover:border-[#1152d4] hover:text-[#1152d4] transition-colors text-sm font-medium"
                                >
                                    <Icon className="w-4 h-4 flex-shrink-0" />
                                    {link.label}
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Footer note */}
                <p className="mt-10 text-xs text-gray-400">
                    © 2026 WelcomeWealth · A social impact initiative by{' '}
                    <a href="https://www.greenin.org" target="_blank" rel="noopener noreferrer" className="text-[#188a42] hover:underline">
                        GreenIn Impact
                    </a>
                </p>
            </div>
        </div>
    );
}