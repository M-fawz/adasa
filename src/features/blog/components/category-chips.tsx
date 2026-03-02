import { cn } from '@/shared/lib/utils';
import { PostCategory } from '../types/blog.types';
import { useTranslation } from 'react-i18next';

interface CategoryChipsProps {
    categories: PostCategory[];
    selectedCategoryId?: string;
    onSelect: (categoryId: string | undefined) => void;
}

export function CategoryChips({ categories, selectedCategoryId, onSelect }: CategoryChipsProps) {
    const { t, i18n } = useTranslation();
    const lang = i18n.language as 'en' | 'ar';

    return (
        <div className="flex flex-wrap gap-2">
            <button
                onClick={() => onSelect(undefined)}
                className={cn(
                    'px-4 py-2 rounded-full text-sm font-medium transition-colors border',
                    !selectedCategoryId
                        ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-zinc-900 dark:border-white'
                        : 'bg-transparent text-zinc-600 border-zinc-200 hover:border-zinc-300 dark:text-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-700'
                )}
            >
                {t('common.all')}
            </button>
            {categories.map((category) => (
                <button
                    key={category.id}
                    onClick={() => onSelect(category.id === selectedCategoryId ? undefined : category.id)}
                    className={cn(
                        'px-4 py-2 rounded-full text-sm font-medium transition-colors border',
                        selectedCategoryId === category.id
                            ? 'bg-primary-500 text-white border-primary-500'
                            : 'bg-transparent text-zinc-600 border-zinc-200 hover:border-zinc-300 dark:text-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-700'
                    )}
                >
                    {category.name[lang]}
                </button>
            ))}
        </div>
    );
}
