import { BlogFilter, BlogListItem, BlogPost, PaginatedResult, PostCategory } from '../types/blog.types';

export interface BlogRepository {
    getPosts(filter: BlogFilter): Promise<PaginatedResult<BlogListItem>>;
    getPostBySlug(slug: string): Promise<BlogPost | null>;
    getCategories(): Promise<PostCategory[]>;
}
