import { useTranslation } from 'react-i18next';
import { Link, NavLink } from 'react-router-dom';
import { cn } from '@/shared/lib/utils';
import { Globe, Search } from 'lucide-react';

export function Header() {
    const { t, i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'ar' ? 'en' : 'ar';
        i18n.changeLanguage(newLang);
    };

    /* ── Active / inactive pill styles for center nav ── */
    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
        cn(
            'px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200',
            isActive
                ? 'bg-[var(--accent)] text-white shadow-md shadow-[var(--accent)]/20'
                : 'text-[var(--muted)] hover:text-[var(--text)] hover:bg-white/[0.04]'
        );

    return (
        /* A) Header container — sticky, glassy dark, blurred backdrop */
        <header className="sticky top-0 z-50 w-full border-b backdrop-blur-lg"
            style={{
                backgroundColor: 'rgba(0,0,0,0.45)',
                borderColor: 'var(--border)',
            }}
        >
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">

                {/* ── B) Brand — logo + name + tagline (RIGHT in RTL) ── */}
                <Link to="/" className="flex items-center gap-2.5 group">
                    <img
                        src="/images/logo.png"
                        alt="Logo"
                        className="w-8 h-8 rounded-full ring-1 ring-white/10 transition-transform duration-200 group-hover:scale-105"
                    />
                    <div className="flex flex-col leading-tight">
                        <span className="text-lg font-bold text-[var(--text)] tracking-tight">
                            {t('brand.name')}
                        </span>
                        {/* Orange tagline under the brand name */}
                        <span className="text-[10px] font-medium text-[var(--accent)] -mt-0.5 tracking-wide">
                            {t('brand.tagline')}
                        </span>
                    </div>
                </Link>

                {/* ── C) Center navigation pill ──
                     Outer pill with dark panel bg + hairline border.
                     Each NavLink is an inner pill (filled orange when active). */}
                <nav
                    className="hidden md:flex items-center gap-1 rounded-full px-1.5 py-1"
                    style={{
                        backgroundColor: 'var(--panel)',
                        border: '1px solid var(--border)',
                    }}
                >
                    <NavLink to="/" end className={navLinkClass}>
                        {t('common.home')}
                    </NavLink>
                    <NavLink to="/blog" className={navLinkClass}>
                        {t('common.blog')}
                    </NavLink>
                    <NavLink to="/about" className={navLinkClass}>
                        {t('common.about')}
                    </NavLink>
                </nav>

                {/* ── D) Right actions (LEFT in RTL): search + CTA + lang toggle ── */}
                <div className="flex items-center gap-3">
                    {/* Ghost search icon */}
                    <button
                        aria-label={t('common.search')}
                        className="p-2 rounded-full text-[var(--muted)] hover:text-[var(--text)] hover:bg-white/[0.06] transition-colors duration-200"
                    >
                        <Search className="w-[18px] h-[18px]" />
                    </button>

                    {/* Language toggle */}
                    <button
                        onClick={toggleLanguage}
                        className="flex items-center gap-1.5 text-sm font-medium text-[var(--muted)] hover:text-[var(--text)] transition-colors duration-200"
                    >
                        <Globe className="w-4 h-4" />
                        <span className="hidden sm:inline">
                            {i18n.language === 'ar' ? 'English' : 'العربية'}
                        </span>
                    </button>

                    {/* Orange CTA pill — "ابدأ القراءة" */}
                    <Link
                        to="/blog"
                        className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:brightness-110 hover:shadow-lg"
                        style={{
                            backgroundColor: 'var(--accent)',
                            boxShadow: '0 4px 16px rgba(255,122,24,0.25)',
                        }}
                    >
                        {t('header.startReading')}
                    </Link>
                </div>
            </div>
        </header>
    );
}
