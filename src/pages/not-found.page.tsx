import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
    const { t } = useTranslation();
    return (
        <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
            <h1 className="text-6xl font-bold text-primary-500 mb-4">404</h1>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8">Page not found</p>
            <Link
                to="/"
                className="px-6 py-2 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors"
            >
                {t('common.home')}
            </Link>
        </div>
    );
}
