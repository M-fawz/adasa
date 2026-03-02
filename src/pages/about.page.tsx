import { useTranslation } from 'react-i18next';

export default function AboutPage() {
    const { t } = useTranslation();
    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-4">{t('common.about')}</h1>
            <p className="text-zinc-600 dark:text-zinc-400">About Adasa photography platform.</p>
        </div>
    );
}
