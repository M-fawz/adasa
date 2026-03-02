import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useBlogStore } from '@/features/blog/state/blog.store';
import { SearchBar } from '@/features/blog/components/search-bar';
import { CategoryChips } from '@/features/blog/components/category-chips';
import { ViewToggle } from '@/features/blog/components/view-toggle';
import { BlogCardList } from '@/features/blog/components/blog-card-list';
import { Pagination } from '@/features/blog/components/pagination';
import { useQueryParams } from '@/shared/lib/hooks/useQueryParams';

export default function BlogListPage() {
    const { t } = useTranslation();
    const { queryParams, setQueryParams } = useQueryParams<{ q: string; category: string; page: string; view: string }>();
    const { q: searchParam, category: categoryParam, page: pageParam, view: viewParam } = queryParams;

    // Local state for view mode, synced with URL
    const viewMode = (viewParam === 'list' ? 'list' : 'grid') as 'grid' | 'list';

    const {
        posts, categories, isLoading, filter, pagination,
        setSearch, setCategory, setPage, fetchPosts, fetchCategories
    } = useBlogStore();

    // Initial sync from URL to Store
    useEffect(() => {
        fetchCategories();

        if (categoryParam) setCategory(categoryParam);
        if (searchParam) setSearch(searchParam);
        if (pageParam) setPage(Number(pageParam));

        fetchPosts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Sync URL when Store changes (Filter/Pagination)
    useEffect(() => {
        setQueryParams({
            category: filter.categoryId,
            q: filter.search,
            page: filter.page > 1 ? filter.page.toString() : undefined,
            view: viewMode // Keep view mode in URL
        }, true);
    }, [filter, viewMode, setQueryParams]);

    const handleViewChange = (mode: 'grid' | 'list') => {
        setQueryParams({ view: mode });
    };

    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="flex flex-col gap-8">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-4xl font-bold mb-2 text-zinc-900 dark:text-zinc-50">{t('common.blog')}</h1>
                        <p className="text-zinc-600 dark:text-zinc-400">Explore our latest stories, tutorials, and reviews.</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                        <SearchBar value={filter.search || ''} onChange={setSearch} />
                        <div className="hidden md:block">
                            <ViewToggle view={viewMode} onChange={handleViewChange} />
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-6">
                    <CategoryChips
                        categories={categories}
                        selectedCategoryId={filter.categoryId}
                        onSelect={setCategory}
                    />
                    <div className="md:hidden self-end">
                        <ViewToggle view={viewMode} onChange={handleViewChange} />
                    </div>
                </div>

                {/* Content */}
                <BlogCardList posts={posts} viewMode={viewMode} isLoading={isLoading} />

                {/* Pagination */}
                <Pagination
                    currentPage={pagination.page}
                    totalPages={pagination.totalPages}
                    onPageChange={setPage}
                />
            </div>
        </div>
    );
}
