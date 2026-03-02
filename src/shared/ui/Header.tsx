import { useTranslation } from 'react-i18next';
import { Link, NavLink } from 'react-router-dom';
import { cn } from '@/shared/lib/utils';
import { Globe } from 'lucide-react';

export function Header() {
    const { t, i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'ar' ? 'en' : 'ar';
        i18n.changeLanguage(newLang);
    };

    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
        cn(
            'text-sm font-medium transition-colors hover:text-primary-500',
            isActive ? 'text-primary-500' : 'text-zinc-600 dark:text-zinc-400'
        );

    return (
        <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 text-2xl font-bold tracking-tight text-primary-500">
                    <img src="/images/logo.png" alt="Logo" className="w-8 h-8" />
                    {t('brand.name')}
                </Link>

                {/* Navigation */}
                <nav className="flex items-center gap-6">
                    <NavLink to="/" className={navLinkClass}>
                        {t('common.home')}
                    </NavLink>
                    <NavLink to="/blog" className={navLinkClass}>
                        {t('common.blog')}
                    </NavLink>
                    <NavLink to="/about" className={navLinkClass}>
                        {t('common.about')}
                    </NavLink>
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleLanguage}
                        className="flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-primary-500 transition-colors"
                    >
                        <Globe className="w-4 h-4" />
                        <span>{i18n.language === 'ar' ? 'English' : 'العربية'}</span>
                    </button>
                </div>
            </div>
        </header>
    );
}
