import { BlogListItem } from '../types/blog.types';
import { BlogCard } from './blog-card';
import { cn } from '@/shared/lib/utils';
import { useTranslation } from 'react-i18next';

interface BlogCardListProps {
    posts: BlogListItem[];
    viewMode: 'grid' | 'list';
    isLoading?: boolean;
}

export function BlogCardList({ posts, viewMode, isLoading }: BlogCardListProps) {
    const { t } = useTranslation();

    if (isLoading) {
        return (
            <div className={cn(
                'grid gap-6',
                viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
            )}>
                {Array.from({ length: 6 }).map((_, i) => (
                    /* Skeleton uses panel token — never white */
                    <div
                        key={i}
                        className="animate-pulse h-[400px]"
                        style={{ backgroundColor: 'var(--panel)', borderRadius: 'var(--radius-card)' }}
                    />
                ))}
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="text-center py-20">
                <p className="text-xl text-[var(--muted)]">{t('common.noPosts')}</p>
            </div>
        );
    }

    return (
        <div className={cn(
            'grid gap-6',
            viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 max-w-3xl mx-auto'
        )}>
            {posts.map(post => (
                <BlogCard key={post.id} post={post} viewMode={viewMode} />
            ))}
        </div>
    );
}
