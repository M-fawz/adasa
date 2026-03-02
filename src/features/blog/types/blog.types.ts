export type Language = 'en' | 'ar';

export interface LocalizedText {
    en: string;
    ar: string;
}

export interface Author {
    id: string;
    name: LocalizedText;
    role: LocalizedText;
    avatar: string;
}

export interface BlogPost {
    id: string;
    slug: string;
    title: LocalizedText;
    excerpt: LocalizedText;
    content: LocalizedText;
    coverImage: string;
    categoryId: string;
    author: Author;
    publishedAt: string;
    readTime: number;
    featured?: boolean;
    tags?: string[];
}

export interface PostCategory {
    id: string;
    slug: string;
    name: LocalizedText;
    image: string;
    description: LocalizedText;
    count?: number;
    color?: string;
}

// Derived types for UI
export interface BlogListItem extends Omit<BlogPost, 'content'> { }

export interface BlogFilter {
    search?: string;
    categoryId?: string;
    page?: number;
    limit?: number;
}

export interface PaginatedResult<T> {
    data: T[];
    total: number;
    page: number;
    totalPages: number;
}
