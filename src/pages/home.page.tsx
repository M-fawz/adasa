import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Camera, Aperture, Sun, Mountain, Users, FileText, Clock, Mail } from 'lucide-react';
import { useBlogStore } from '@/features/blog/state/blog.store';
import { BlogCard } from '@/features/blog/components/blog-card';
import { Hero } from '@/features/blog/components/hero';
import { FeaturedPostsSection } from '@/features/blog/components/FeaturedPostsSection';
import { useDirection } from '@/shared/lib/hooks/useDirection';

/* Map category IDs to lucide icons for topic cards */
const CATEGORY_ICONS: Record<string, React.ReactNode> = {
    lighting: <Sun className="w-5 h-5" />,
    portrait: <Users className="w-5 h-5" />,
    landscape: <Mountain className="w-5 h-5" />,
    gear: <Aperture className="w-5 h-5" />,
};
const DEFAULT_ICON = <Camera className="w-5 h-5" />;

export default function HomePage() {
    const { t, i18n } = useTranslation();
    const lang = i18n.language as 'en' | 'ar';
    const dir = useDirection();
    const isRtl = dir === 'rtl';
    const { posts, categories, fetchPosts, fetchCategories } = useBlogStore();

    useEffect(() => {
        fetchPosts();
        fetchCategories();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const latestPosts = posts.slice(0, 3);

    /* Compute article count per category from posts data (no data shape change) */
    const categoryCounts = useMemo(() => {
        const counts: Record<string, number> = {};
        posts.forEach((p) => {
            const cid = (p as Record<string, unknown>).categoryId as string | undefined;
            if (cid) counts[cid] = (counts[cid] || 0) + 1;
        });
        return counts;
    }, [posts]);

    /* Direction-aware arrow */
    const DirArrow = ({ size = 'w-4 h-4' }: { size?: string }) =>
        isRtl ? <ArrowLeft className={size} /> : <ArrowRight className={size} />;

    return (
        <div className="flex flex-col pb-16">
            {/* ─── 1) Hero ─── */}
            <Hero />

            {/* ─── 2) Featured Posts ─── */}
            <FeaturedPostsSection />

            {/* ─── 3) Categories / Topics ─── */}
            <section className="relative py-14 sm:py-16">
                <div className="mx-auto max-w-6xl px-4 sm:px-6">

                    {/* Section header — centered */}
                    <div className="flex flex-col items-center text-center mb-8">
                        {/* Badge pill with two orange dots */}
                        <div
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-bold mb-4"
                            style={{
                                backgroundColor: 'var(--accent-soft)',
                                border: '1px solid rgba(255,122,24,0.25)',
                                color: 'var(--accent)',
                            }}
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] opacity-60" />
                            {t('categories.badge')}
                        </div>

                        <h2 className="text-4xl md:text-[44px] font-extrabold text-[var(--text)] mb-3 leading-tight">
                            {t('categories.title')}
                        </h2>
                        <p className="text-[var(--muted)] text-base max-w-lg">
                            {t('categories.subtitle')}
                        </p>
                    </div>

                    {/* Topic cards grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mt-8">
                        {categories.map((category, idx) => {
                            /* First card gets full accent (orange) background with white text */
                            const isHighlight = idx === 0;
                            const count = categoryCounts[category.id] ?? category.count ?? 0;

                            return (
                                <Link
                                    key={category.id}
                                    to={`/blog?category=${category.id}`}
                                    className="group relative flex flex-col justify-between p-5 transition-all duration-200 hover:-translate-y-0.5"
                                    style={{
                                        borderRadius: 'var(--radius-card)',
                                        border: isHighlight
                                            ? '1px solid rgba(255,122,24,0.5)'
                                            : '1px solid var(--border)',
                                        background: isHighlight
                                            ? 'var(--accent)'
                                            : 'var(--panel)',
                                        boxShadow: isHighlight
                                            ? '0 8px 32px rgba(255,122,24,0.25)'
                                            : 'var(--shadow-soft)',
                                        minHeight: '160px',
                                    }}
                                >
                                    {/* Icon container */}
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                                        style={{
                                            backgroundColor: isHighlight
                                                ? 'rgba(255,255,255,0.2)'
                                                : 'var(--accent-soft)',
                                            border: isHighlight
                                                ? '1px solid rgba(255,255,255,0.25)'
                                                : '1px solid rgba(255,122,24,0.2)',
                                            color: isHighlight ? '#fff' : 'var(--accent)',
                                        }}
                                    >
                                        {CATEGORY_ICONS[category.id] || DEFAULT_ICON}
                                    </div>

                                    {/* Name + count */}
                                    <div>
                                        <h3
                                            className="text-lg font-bold mb-1 transition-colors"
                                            style={{ color: isHighlight ? '#fff' : 'var(--text)' }}
                                        >
                                            {category.name[lang]}
                                        </h3>
                                        <p
                                            className="text-sm"
                                            style={{ color: isHighlight ? 'rgba(255,255,255,0.75)' : 'var(--muted)' }}
                                        >
                                            {count} {t('categories.articlesLabel')}
                                        </p>
                                    </div>

                                    {/* Arrow button on highlight card — white bg, accent icon */}
                                    {isHighlight && (
                                        <div
                                            className="absolute bottom-4 ltr:right-4 rtl:left-4 w-8 h-8 rounded-full flex items-center justify-center"
                                            style={{ backgroundColor: '#fff', color: 'var(--accent)' }}
                                        >
                                            {/* Arrow flips direction in RTL */}
                                            <DirArrow size="w-4 h-4" />
                                        </div>
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ─── 4) Latest Posts ─── */}
            <section className="relative py-14 sm:py-16">
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    {/* Section header */}
                    <div className="flex flex-col items-center text-center mb-8">
                        <div
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-bold mb-4"
                            style={{
                                backgroundColor: 'var(--accent-soft)',
                                border: '1px solid rgba(255,122,24,0.25)',
                                color: 'var(--accent)',
                            }}
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] opacity-60" />
                            {t('latestPosts.badge')}
                        </div>

                        <h2 className="text-4xl md:text-[44px] font-extrabold text-[var(--text)] mb-3 leading-tight">
                            {t('latestPosts.title')}
                        </h2>
                        <p className="text-[var(--muted)] text-base max-w-lg">
                            {t('latestPosts.subtitle')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {latestPosts.map(post => (
                            <BlogCard key={post.id} post={post} />
                        ))}
                    </div>

                    {/* View all link */}
                    <div className="flex justify-center mt-10">
                        <Link
                            to="/blog"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm transition-colors hover:bg-white/[0.04]"
                            style={{
                                backgroundColor: 'var(--accent-soft)',
                                border: '1px solid rgba(255,122,24,0.25)',
                                color: 'var(--accent)',
                            }}
                        >
                            <DirArrow />
                            {t('latestPosts.viewAll')}
                        </Link>
                    </div>
                </div>
            </section>

            {/* ─── 5) Newsletter CTA ─── */}
            <section className="relative py-14 sm:py-20">
                <div className="mx-auto max-w-3xl px-4 sm:px-6">
                    <div
                        className="flex flex-col items-center text-center p-8 sm:p-12"
                        style={{
                            backgroundColor: 'var(--panel)',
                            border: '1px solid var(--border)',
                            borderRadius: 'var(--radius-card)',
                            boxShadow: '0 8px 40px rgba(0,0,0,0.25)',
                        }}
                    >
                        {/* Mail icon container */}
                        <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                            style={{
                                backgroundColor: 'var(--accent-soft)',
                                border: '1px solid rgba(255,122,24,0.2)',
                                color: 'var(--accent)',
                            }}
                        >
                            <Mail className="w-5 h-5" />
                        </div>

                        {/* Title — last word accented */}
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text)] mb-3 leading-tight">
                            {t('newsletter.titleStart')}{' '}
                            <span className="text-[var(--accent)]">{t('newsletter.titleAccent')}</span>
                        </h2>

                        <p className="text-[var(--muted)] text-base mb-8 max-w-[520px] leading-relaxed">
                            {t('newsletter.subtitle')}
                        </p>

                        {/* Form row */}
                        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md mb-6">
                            <input
                                type="email"
                                placeholder={t('newsletter.placeholder')}
                                className="flex-1 min-w-0 px-4 py-3 rounded-full text-sm text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                                style={{
                                    backgroundColor: 'var(--panel-2)',
                                    border: '1px solid var(--border)',
                                }}
                            />
                            <button
                                className="px-6 py-3 rounded-full text-sm font-semibold text-white transition-all hover:brightness-110 hover:shadow-lg whitespace-nowrap"
                                style={{
                                    backgroundColor: 'var(--accent)',
                                    boxShadow: '0 4px 16px rgba(255,122,24,0.25)',
                                }}
                            >
                                {t('newsletter.button')}
                            </button>
                        </div>

                        {/* Trust row */}
                        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-[var(--muted)]">
                            <span>{t('newsletter.trustUnsubscribe')}</span>
                            <span className="w-1 h-1 rounded-full bg-white/20" />
                            <span>{t('newsletter.trustNoSpam')}</span>
                            <span className="w-1 h-1 rounded-full bg-white/20" />
                            <span>
                                <span className="text-[var(--accent)] font-bold">+10,000</span>{' '}
                                {t('newsletter.trustJoined')}
                            </span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
