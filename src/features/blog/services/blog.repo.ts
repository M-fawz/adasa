import postsData from '@/shared/data/posts.json';
import categoriesData from '@/data/categories.json';
import { BlogPost, BlogFilter, PaginatedResult, PostCategory } from '@/features/blog/types/blog.types';

// Cast the JSON data to our typed structure
// In a real app, this might involve more robust mapping
const posts: BlogPost[] = postsData.posts as unknown as BlogPost[];

export const blogRepo = {
    getPosts(filter?: BlogFilter): PaginatedResult<BlogPost> {
        let filteredPosts = [...posts];

        // Filter by category
        if (filter?.categoryId) {
            filteredPosts = filteredPosts.filter(post => post.categoryId === filter.categoryId);
        }

        // Search
        if (filter?.search) {
            const query = filter.search.toLowerCase();
            filteredPosts = filteredPosts.filter(post =>
                post.title.ar.toLowerCase().includes(query) ||
                post.title.en.toLowerCase().includes(query) ||
                post.excerpt.ar.toLowerCase().includes(query) ||
                post.excerpt.en.toLowerCase().includes(query)
            );
        }

        // Pagination
        const total = filteredPosts.length;
        const page = filter?.page || 1;
        const limit = filter?.limit || 10;
        const totalPages = Math.ceil(total / limit);
        const start = (page - 1) * limit;
        const end = start + limit;
        const data = filteredPosts.slice(start, end);

        return {
            data,
            total,
            page,
            totalPages
        };
    },

    getPostBySlug(slug: string): BlogPost | undefined {
        return posts.find(post => post.slug === slug);
    },

    getFeaturedPosts(): BlogPost[] {
        const featured = posts.filter(post => post.featured);
        if (featured.length >= 3) {
            return featured.slice(0, 3);
        }

        // Fallback to latest posts to fill up to 3
        const others = posts
            .filter(post => !post.featured)
            .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

        return [...featured, ...others].slice(0, 3);
    },

    getRecentPosts(limit: number = 3): BlogPost[] {
        // Sort by date desc
        return [...posts]
            .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
            .slice(0, limit);
    },

    getCategories(): PostCategory[] {
        // Import categories from JSON
        // Since we are inside the object, we need to import it at top level if possible, or require
        // But for now, let's use the ones we have in categories.json
        // I need to import categories.json at the top
        return categoriesData as unknown as PostCategory[];
    }
};
