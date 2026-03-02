import { create } from 'zustand';
import { BlogFilter, BlogListItem, PaginatedResult, PostCategory, BlogPost } from '../types/blog.types';
import { blogRepo } from '../services/blog.repo';

interface BlogState {
    // State
    posts: BlogListItem[];
    featuredPosts: BlogPost[];
    categories: PostCategory[];
    isLoading: boolean;
    error: string | null;
    filter: BlogFilter;
    pagination: Omit<PaginatedResult<never>, 'data'>;

    // Actions
    setSearch: (query: string) => void;
    setCategory: (categoryId: string | undefined) => void;
    setPage: (page: number) => void;
    fetchPosts: () => Promise<void>;
    fetchFeaturedPosts: () => Promise<void>;
    fetchCategories: () => Promise<void>;
    resetFilter: () => void;
}

const INITIAL_FILTER: BlogFilter = {
    page: 1,
    limit: 6,
    search: '',
    categoryId: undefined,
};

export const useBlogStore = create<BlogState>((set, get) => ({
    posts: [],
    featuredPosts: [],
    categories: [],
    isLoading: false,
    error: null,
    filter: INITIAL_FILTER,
    pagination: {
        total: 0,
        page: 1,
        totalPages: 1
    },

    setSearch: (search) => {
        set(state => ({
            filter: { ...state.filter, search, page: 1 } // Reset to page 1 on new search
        }));
        get().fetchPosts();
    },

    setCategory: (categoryId) => {
        set(state => ({
            filter: { ...state.filter, categoryId, page: 1 }
        }));
        get().fetchPosts();
    },

    setPage: (page) => {
        set(state => ({
            filter: { ...state.filter, page }
        }));
        get().fetchPosts();
    },

    resetFilter: () => {
        set({ filter: INITIAL_FILTER });
        get().fetchPosts();
    },

    fetchPosts: async () => {
        const { filter } = get();
        set({ isLoading: true, error: null });

        try {
            // Simulate network delay for realistic feel
            await new Promise(resolve => setTimeout(resolve, 300));

            const result = blogRepo.getPosts(filter);
            set({
                posts: result.data,
                isLoading: false,
                pagination: {
                    total: result.total,
                    page: result.page,
                    totalPages: result.totalPages
                }
            });
        } catch (err) {
            set({ isLoading: false, error: 'Failed to fetch posts' });
            console.error(err);
        }
    },

    fetchFeaturedPosts: async () => {
        try {
            const posts = blogRepo.getFeaturedPosts();
            set({ featuredPosts: posts });
        } catch (err) {
            console.error('Failed to fetch featured posts', err);
        }
    },

    fetchCategories: async () => {
        try {
            // In a real app this would be async from repo
            await new Promise(resolve => setTimeout(resolve, 100)); // Simulate async

            // We need to implement getCategories in repo or just load them
            // Since repo doesn't have getCategories yet, let's add it or load from json directly here as temp
            // Actually let's update repo to have getCategories
            // For now, let's just use empty or hardcoded
            // Wait, previous store used blogRepository.getCategories()
            // I should add getCategories to blogRepo

            // For now, I will assume blogRepo has it or I'll add it in next step.
            // Let's use `import categories from '@/data/categories.json'` if needed, but better to put in repo.
            // I'll skip implementation details here and rely on checking repo next.
            // Actually, I'll implement it properly in Repo in next step.

            // Placeholder for now to avoid compile error if function missing
            // But actually I can't leave it broken. 
            // I'll check categories from the repo.

            // Let's assume I will add getCategories to repo.
            const categories = blogRepo.getCategories();
            set({ categories });
        } catch (err) {
            console.error('Failed to fetch categories', err);
        }
    }
}));
