import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '@/shared/ui/layout/MainLayout';
import HomePage from '@/pages/home.page';
import BlogListPage from '@/features/blog/pages/blog-list.page';
import BlogDetailsPage from '@/features/blog/pages/blog-details.page';
import AboutPage from '@/pages/about.page';
import NotFoundPage from '@/pages/not-found.page';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <NotFoundPage />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: 'blog',
                element: <BlogListPage />,
            },
            {
                path: 'blog/:slug',
                element: <BlogDetailsPage />,
            },
            {
                path: 'about',
                element: <AboutPage />,
            },
            {
                path: '*',
                element: <NotFoundPage />,
            },
        ],
    },
]);
