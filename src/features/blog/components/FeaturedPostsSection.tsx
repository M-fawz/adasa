
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Clock, Calendar } from 'lucide-react';
import { useBlogStore } from '@/features/blog/state/blog.store';
import { useDirection } from '@/shared/lib/hooks/useDirection';

export const FeaturedPostsSection = () => {
    const { t, i18n } = useTranslation();
    const dir = useDirection();
    const isRtl = dir === 'rtl';
    const lang = i18n.language as 'en' | 'ar';
    const { featuredPosts, fetchFeaturedPosts, categories } = useBlogStore();

    useEffect(() => {
        fetchFeaturedPosts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /* Build a quick lookup: categoryId → localized name */
    const categoryMap = useMemo(() => {
        const map: Record<string, string> = {};
        categories.forEach((c) => {
            map[c.id] = c.name[lang];
        });
        return map;
    }, [categories, lang]);

    if (featuredPosts.length === 0) return null;

    /* Direction-aware arrow component */
    const DirArrow = ({ size = 'w-4 h-4' }: { size?: string }) =>
        isRtl
            ? <ArrowLeft className={size} />
            : <ArrowRight className={size} />;

    return (
        <section className="relative py-14 sm:py-16 overflow-hidden">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 relative z-10">

                {/* ── A) Section header ── */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">

                    {/* Title block — aligns to "start" (right in RTL) */}
                    <div className="flex flex-col items-start">
                        {/* Badge pill with two orange dots */}
                        <div
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-bold mb-3"
                            style={{
                                backgroundColor: 'var(--accent-soft)',
                                border: '1px solid rgba(255,122,24,0.25)',
                                color: 'var(--accent)',
                            }}
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] opacity-60" />
                            {t('featured.badge')}
                        </div>

                        <h2 className="text-4xl md:text-[44px] font-extrabold text-[var(--text)] mb-2 leading-tight">
                            {t('featured.title')}
                        </h2>
                        <p className="text-[var(--muted)] text-base">
                            {t('featured.subtitle')}
                        </p>
                    </div>

                    {/* "View all" pill — aligns to "end" (left in RTL) */}
                    <Link
                        to="/blog"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-colors hover:bg-white/[0.04]"
                        style={{
                            backgroundColor: 'var(--accent-soft)',
                            border: '1px solid rgba(255,122,24,0.25)',
                            color: 'var(--accent)',
                        }}
                    >
                        <DirArrow />
                        {t('featured.viewAll')}
                    </Link>
                </div>

                {/* ── B) Featured cards — stacked split layout ── */}
                <div className="flex flex-col gap-6">
                    {featuredPosts.map((post) => {
                        const catName = categoryMap[post.categoryId] || post.categoryId;

                        return (
                            /* Single outer card wrapper with border + radius */
                            <div
                                key={post.id}
                                className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden"
                                style={{
                                    backgroundColor: 'var(--panel)',
                                    border: '1px solid var(--border)',
                                    borderRadius: 'var(--radius-card)',
                                }}
                            >
                                {/* ── Text panel ──
                                    First in DOM → right side in RTL (start).
                                    On mobile: stacks below image (order-2). */}
                                <div className="flex flex-col justify-between p-6 lg:p-7 order-2 lg:order-1 min-h-[220px]">
                                    <div>
                                        {/* Category pill + meta row */}
                                        <div className="flex flex-wrap items-center gap-3 mb-3">
                                            <span
                                                className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold"
                                                style={{
                                                    backgroundColor: 'var(--accent-soft)',
                                                    color: 'var(--accent)',
                                                    border: '1px solid rgba(255,122,24,0.2)',
                                                }}
                                            >
                                                {catName}
                                            </span>
                                            <span className="flex items-center gap-1 text-[var(--muted)] text-xs">
                                                <Clock className="w-3 h-3" />
                                                {post.readTime} {t('featured.minRead')}
                                            </span>
                                            <span className="w-1 h-1 rounded-full bg-white/20" />
                                            <span className="flex items-center gap-1 text-[var(--muted)] text-xs">
                                                <Calendar className="w-3 h-3" />
                                                {new Date(post.publishedAt).toLocaleDateString(
                                                    lang === 'ar' ? 'ar-EG' : 'en-US'
                                                )}
                                            </span>
                                        </div>

                                        {/* Title — large, bold, high contrast */}
                                        <h3 className="text-xl md:text-2xl font-bold text-[var(--text)] mb-2 line-clamp-2 leading-snug">
                                            <Link
                                                to={`/blog/${post.slug}`}
                                                className="hover:text-[var(--accent)] transition-colors"
                                            >
                                                {post.title[lang]}
                                            </Link>
                                        </h3>

                                        {/* Excerpt — muted, 2–3 lines */}
                                        <p className="text-[var(--muted)] text-sm line-clamp-3 leading-relaxed">
                                            {post.excerpt[lang]}
                                        </p>
                                    </div>

                                    {/* Author row + CTA */}
                                    <div className="flex items-center justify-between mt-5 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={post.author.avatar}
                                                alt={post.author.name[lang]}
                                                className="w-8 h-8 rounded-full object-cover"
                                            />
                                            <div className="flex flex-col">
                                                <span className="text-[var(--text)] text-xs font-bold">
                                                    {post.author.name[lang]}
                                                </span>
                                                <span className="text-[var(--muted)] text-[10px]">
                                                    {post.author.role[lang]}
                                                </span>
                                            </div>
                                        </div>

                                        <Link
                                            to={`/blog/${post.slug}`}
                                            className="text-[var(--accent)] text-sm font-bold flex items-center gap-1 hover:brightness-110 transition-all"
                                        >
                                            {t('featured.readArticle')}
                                            <DirArrow size="w-3.5 h-3.5" />
                                        </Link>
                                    </div>
                                </div>

                                {/* ── Image panel ──
                                    Second in DOM → left side in RTL (end).
                                    On mobile: stacks above text (order-1). */}
                                <div className="relative group overflow-hidden min-h-[200px] lg:min-h-0 order-1 lg:order-2">
                                    <img
                                        src={post.coverImage}
                                        alt={post.title[lang]}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                    {/* "Featured" badge on image corner */}
                                    <div
                                        className="absolute top-4 ltr:right-4 rtl:left-4 text-white text-xs font-bold px-3 py-1.5 rounded-full"
                                        style={{ backgroundColor: 'var(--accent)' }}
                                    >
                                        {t('featured.badge')}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
