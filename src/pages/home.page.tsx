import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useBlogStore } from '@/features/blog/state/blog.store';
import { BlogCard } from '@/features/blog/components/blog-card';
import { Hero } from '@/features/blog/components/hero';
import { FeaturedPostsSection } from '@/features/blog/components/FeaturedPostsSection';

export default function HomePage() {
    const { t, i18n } = useTranslation();
    const lang = i18n.language as 'en' | 'ar';
    const { posts, categories, fetchPosts, fetchCategories } = useBlogStore();

    useEffect(() => {
        fetchPosts();
        fetchCategories();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const latestPosts = posts.slice(0, 3);

    return (
        <div className="flex flex-col gap-16 pb-16 bg-[#0B0B0B]">
            {/* Hero Section */}
            <Hero />

            {/* Featured Posts Section */}
            <FeaturedPostsSection />

            {/* Categories Section */}
            <section className="container mx-auto px-4">
                <div className="flex justify-between items-end mb-8">
                    <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">{t('common.categories')}</h2>
                    <Link to="/blog" className="text-primary-500 hover:text-primary-600 font-medium flex items-center gap-1 group">
                        {t('common.readMore')}
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            to={`/blog?category=${category.id}`}
                            className="group relative aspect-square overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800"
                        >
                            {/* Ideally fetch category image or use placeholder */}
                            <div className="absolute inset-0 bg-zinc-900/40 group-hover:bg-zinc-900/30 transition-colors z-10" />
                            <img
                                src={category.image || `https://source.unsplash.com/random/400x400?${category.id}`}
                                alt={category.name[lang]}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 z-20 flex flex-col justify-end p-4">
                                <h3 className="text-white font-bold text-lg">{category.name[lang]}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Latest Posts Section */}
            <section className="container mx-auto px-4">
                <div className="flex justify-between items-end mb-8">
                    <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">{t('common.latestPosts')}</h2>
                    <Link to="/blog" className="text-primary-500 hover:text-primary-600 font-medium flex items-center gap-1 group">
                        {t('common.readMore')}
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {latestPosts.map(post => (
                        <BlogCard key={post.id} post={post} />
                    ))}
                </div>
            </section>
        </div>
    );
}
