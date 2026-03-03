import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useBlogStore } from '@/features/blog/state/blog.store';
import { Mail } from 'lucide-react';

/* ── Inline social icon SVGs (no new deps) ── */
const YouTubeIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2 31.5 31.5 0 000 12a31.5 31.5 0 00.5 5.8 3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1c.4-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z" />
    </svg>
);
const LinkedInIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 013.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zm1.78 13.02H3.56V9h3.56v11.45zM22.23 0H1.77A1.75 1.75 0 000 1.73v20.54A1.75 1.75 0 001.77 24h20.46A1.75 1.75 0 0024 22.27V1.73A1.75 1.75 0 0022.23 0z" />
    </svg>
);
const GitHubIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 .3a12 12 0 00-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6a3.2 3.2 0 00-1.3-1.7c-1.1-.7.1-.7.1-.7a2.5 2.5 0 011.8 1.2 2.5 2.5 0 003.4 1 2.5 2.5 0 01.7-1.6c-2.6-.3-5.4-1.3-5.4-5.9a4.6 4.6 0 011.2-3.2 4.3 4.3 0 01.1-3.2s1-.3 3.3 1.2a11.3 11.3 0 016 0c2.3-1.5 3.3-1.2 3.3-1.2a4.3 4.3 0 01.1 3.2 4.6 4.6 0 011.2 3.2c0 4.6-2.8 5.6-5.5 5.9a2.8 2.8 0 01.8 2.2v3.2c0 .3.2.7.8.6A12 12 0 0012 .3z" />
    </svg>
);
const XIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18.9 1.2h3.7l-8 9.2L24 22.8h-7.4l-5.8-7.6-6.6 7.6H.5l8.6-9.8L0 1.2h7.6l5.2 6.9 6.1-6.9zm-1.3 19.4h2L6.5 3.2H4.4l13.2 17.4z" />
    </svg>
);

export function Footer() {
    const { t, i18n } = useTranslation();
    const lang = i18n.language as 'en' | 'ar';
    const { categories } = useBlogStore();

    const socialLinks = [
        { icon: <YouTubeIcon />, label: 'YouTube', href: '#' },
        { icon: <LinkedInIcon />, label: 'LinkedIn', href: '#' },
        { icon: <GitHubIcon />, label: 'GitHub', href: '#' },
        { icon: <XIcon />, label: 'X', href: '#' },
    ];

    return (
        <footer className="relative w-full pt-16 pb-6">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">

                {/* ── 4-column grid ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

                    {/* Column 1: Brand */}
                    <div className="flex flex-col items-start">
                        {/* Orange badge square with "ع" */}
                        <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg mb-4"
                            style={{ backgroundColor: 'var(--accent)' }}
                        >
                            ع
                        </div>
                        <h3 className="text-lg font-bold text-[var(--text)] mb-2">
                            {t('brand.name')}
                        </h3>
                        <p className="text-sm text-[var(--muted)] leading-relaxed mb-4 max-w-[260px]">
                            {t('footer.description')}
                        </p>
                        {/* Social icons row */}
                        <div className="flex items-center gap-2">
                            {socialLinks.map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    aria-label={s.label}
                                    className="w-9 h-9 rounded-xl flex items-center justify-center text-[var(--muted)] transition-all duration-200 hover:text-[var(--accent)] hover:border-[var(--accent)]"
                                    style={{
                                        backgroundColor: 'var(--panel)',
                                        border: '1px solid var(--border)',
                                    }}
                                >
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: Discover links */}
                    <div>
                        <h4 className="text-sm font-bold text-[var(--text)] mb-4 uppercase tracking-wider">
                            {t('footer.explore')}
                        </h4>
                        <ul className="flex flex-col gap-2.5">
                            <li>
                                <Link to="/" className="text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors">
                                    {t('common.home')}
                                </Link>
                            </li>
                            <li>
                                <Link to="/blog" className="text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors">
                                    {t('common.blog')}
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors">
                                    {t('common.about')}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Categories (from store) */}
                    <div>
                        <h4 className="text-sm font-bold text-[var(--text)] mb-4 uppercase tracking-wider">
                            {t('common.categories')}
                        </h4>
                        <ul className="flex flex-col gap-2.5">
                            {categories.slice(0, 5).map((cat) => (
                                <li key={cat.id}>
                                    <Link
                                        to={`/blog?category=${cat.id}`}
                                        className="text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
                                    >
                                        {cat.name[lang]}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Mini subscribe */}
                    <div>
                        <h4 className="text-sm font-bold text-[var(--text)] mb-4 uppercase tracking-wider">
                            {t('footer.stayUpdated')}
                        </h4>
                        <p className="text-sm text-[var(--muted)] mb-4 leading-relaxed">
                            {t('footer.subscribeDesc')}
                        </p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder={t('newsletter.placeholder')}
                                className="flex-1 min-w-0 px-3 py-2 rounded-xl text-sm text-[var(--text)] placeholder:text-[var(--muted)]"
                                style={{
                                    backgroundColor: 'var(--panel-2)',
                                    border: '1px solid var(--border)',
                                }}
                            />
                            <button
                                className="px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:brightness-110"
                                style={{ backgroundColor: 'var(--accent)' }}
                            >
                                <Mail className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* ── Bottom bar ── */}
                <div
                    className="pt-6 text-center"
                    style={{ borderTop: '1px solid var(--border)' }}
                >
                    <p className="text-xs text-[var(--muted)]">
                        {t('footer.copyright')}
                    </p>
                </div>
            </div>
        </footer>
    );
}
