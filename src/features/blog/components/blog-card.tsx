import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Calendar, Clock } from 'lucide-react';
import { BlogListItem } from '../types/blog.types';
import { motion } from 'framer-motion';
import { Badge } from '@/shared/ui/Badge';

interface BlogCardProps {
    post: BlogListItem;
    viewMode?: 'grid' | 'list';
}

export function BlogCard({ post, viewMode = 'grid' }: BlogCardProps) {
    const { i18n } = useTranslation();
    const lang = i18n.language as 'en' | 'ar';

    const formattedDate = new Date(post.publishedAt).toLocaleDateString(lang, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    if (viewMode === 'list') {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <Link
                    to={`/blog/${post.slug}`}
                    className="group flex flex-col md:flex-row gap-6 p-4 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all hover:border-primary-500/20"
                >
                    <div className="w-full md:w-1/3 aspect-video md:aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                        <img
                            src={post.coverImage}
                            alt={post.title[lang]}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                        />
                    </div>
                    <div className="flex-1 flex flex-col justify-center py-2">
                        <div className="flex gap-2 mb-3">
                            <Badge variant="outline">{post.categoryId}</Badge>
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-zinc-900 dark:text-zinc-100 group-hover:text-primary-500 transition-colors">
                            {post.title[lang]}
                        </h3>
                        <p className="text-zinc-500 dark:text-zinc-400 line-clamp-2 mb-4">
                            {post.excerpt[lang]}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-zinc-400 mt-auto">
                            <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {formattedDate}
                            </span>
                            <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {post.readTime} min read
                            </span>
                        </div>
                    </div>
                </Link>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
        >
            <Link
                to={`/blog/${post.slug}`}
                className="group flex flex-col h-full rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-lg transition-all hover:border-primary-500/20 overflow-hidden"
            >
                <div className="aspect-[4/3] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                    <img
                        src={post.coverImage}
                        alt={post.title[lang]}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                    />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-3">
                        <Badge variant="outline">{post.categoryId}</Badge>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-zinc-900 dark:text-zinc-100 group-hover:text-primary-500 transition-colors line-clamp-2">
                        {post.title[lang]}
                    </h3>
                    <p className="text-zinc-500 dark:text-zinc-400 line-clamp-3 mb-4 text-sm flex-1">
                        {post.excerpt[lang]}
                    </p>
                    <div className="flex items-center justify-between text-xs text-zinc-400 pt-4 border-t border-dark-border">
                        <div className="flex items-center gap-2">
                            <img
                                src={post.author.avatar}
                                alt={post.author.name[lang]}
                                className="w-5 h-5 rounded-full object-cover"
                            />
                            <span className="text-zinc-300">{post.author.name[lang]}</span>
                        </div>
                        <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {post.readTime} min
                        </span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
