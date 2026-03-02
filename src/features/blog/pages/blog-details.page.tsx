import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import { BlogPost } from '../types/blog.types';
import { blogRepo } from '../services/blog.repo'; // Correct repo import
import { Badge } from '@/shared/ui/Badge';
import { Button } from '@/shared/ui/Button';

export default function BlogDetailsPage() {
    const { slug } = useParams<{ slug: string }>();
    const { t, i18n } = useTranslation();
    const lang = i18n.language as 'en' | 'ar';

    const [post, setPost] = useState<BlogPost | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadPost = async () => {
            if (!slug) return;
            setIsLoading(true); // Ensure loading state is true when slug changes
            try {
                // Simulate network delay
                await new Promise(resolve => setTimeout(resolve, 300));

                const data = blogRepo.getPostBySlug(slug) || null; // Handle undefined check if needed
                setPost(data);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        loadPost();
    }, [slug]);

    if (isLoading) {
        return <div className="container mx-auto px-4 py-20 text-center">{t('common.loading')}</div>;
    }

    if (!post) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-2xl font-bold mb-4">{t('common.noPosts')}</h1>
                <Link to="/blog">
                    <Button>{t('common.back')}</Button>
                </Link>
            </div>
        );
    }

    const formattedDate = new Date(post.publishedAt).toLocaleDateString(lang, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <article className="pb-20">
            {/* Header / Cover */}
            <div className="relative h-[40vh] md:h-[50vh] min-h-[400px] w-full bg-zinc-900">
                <img
                    src={post.coverImage}
                    alt={post.title[lang]}
                    className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
                    <div className="container mx-auto max-w-4xl">
                        <Link to="/blog" className="inline-flex items-center text-zinc-300 hover:text-white mb-6 transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0 rtl:rotate-180" />
                            {t('common.back')}
                        </Link>

                        <div className="flex gap-2 mb-4">
                            <Badge>{post.categoryId}</Badge>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            {post.title[lang]}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 text-zinc-300 text-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold overflow-hidden">
                                    {post.author.avatar ? (
                                        <img src={post.author.avatar} alt={post.author.name[lang]} className="w-full h-full object-cover" />
                                    ) : (
                                        <User className="w-4 h-4" />
                                    )}
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-semibold text-white">{post.author.name[lang]}</span>
                                    <span className="text-xs text-zinc-400">{post.author.role[lang]}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{formattedDate}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>{post.readTime} min read</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 mt-12 max-w-3xl">
                <div className="prose prose-lg dark:prose-invert max-w-none">
                    <p className="lead text-xl text-zinc-600 dark:text-zinc-300 mb-8 font-medium">
                        {post.excerpt[lang]}
                    </p>
                    <div className="whitespace-pre-line text-zinc-800 dark:text-zinc-200">
                        {post.content[lang]}
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex justify-between">
                    <Link to="/blog">
                        <Button variant="outline">{t('common.back')}</Button>
                    </Link>
                </div>
            </div>
        </article>
    );
}
