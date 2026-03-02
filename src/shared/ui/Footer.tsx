import { useTranslation } from 'react-i18next';

export function Footer() {
    const { t } = useTranslation();

    return (
        <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 py-8 mt-auto">
            <div className="container mx-auto px-4 text-center text-sm text-zinc-500 dark:text-zinc-400">
                <p>{t('footer.rights')}</p>
            </div>
        </footer>
    );
}
