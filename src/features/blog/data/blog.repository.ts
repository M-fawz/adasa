import { BlogFilter, BlogListItem, BlogPost, PaginatedResult, Category } from './blog.types';

export interface BlogRepository {
    getPosts(filter: BlogFilter): Promise<PaginatedResult<BlogListItem>>;
    getPostBySlug(slug: string): Promise<BlogPost | null>;
    getCategories(): Promise<Category[]>;
}
