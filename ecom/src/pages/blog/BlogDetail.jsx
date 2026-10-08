import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Banner from '../../components/layout/generic/Banner';
import MediaDetailSection from './sections/MediaDetailSection';
import SEO from '../../seo';
import blogData from '../../data/blog.json';

const BlogDetail = () => {
    const location = useLocation();
    const { id } = useParams();

    const currentBlog = React.useMemo(() => {
        if (location.state?.blog) return location.state.blog;
        if (id) {
            const found = (blogData || []).find((b) => String(b.id) === String(id) || b.slug === id);
            if (found) return found;
        }
        return blogData?.[0] || null;
    }, [location.state, id]);

    const title = currentBlog?.title ? `${currentBlog.title} | Ashmita Vinyls` : 'Blog Detail | Ashmita Vinyls';
    const description = currentBlog?.excerpt || currentBlog?.content?.slice(0, 160) || 'Read our latest blog post on PVC vinyl solutions.';
    const path = currentBlog?.slug ? `/blog/${currentBlog.slug}` : '/blog-detail';

    return (
        <>
            <SEO
                page="blogDetail"
                title={title}
                description={description}
                image={currentBlog?.image}
                path={path}
                type="article"
                article={{
                    title: currentBlog?.title,
                    description,
                    image: currentBlog?.image,
                    datePublished: currentBlog?.date,
                    author: currentBlog?.author || 'Ashmita Vinyls',
                }}
                breadcrumbs={[
                    { label: 'Home', path: '/home' },
                    { label: 'Blog', path: '/blog' },
                    { label: currentBlog?.title || 'Blog Detail', path }
                ]}
            />
            <Banner
                title="Blog Detail"
                desc={currentBlog?.category || 'Blog Details'}
                breadcrumbs={[
                    { label: 'Home', path: '/home' },
                    { label: 'Blog', path: '/blog' },
                    { label: currentBlog?.title || 'Blog Detail', path }
                ]}
            />
            <MediaDetailSection />
        </>
    );
};

export default React.memo(BlogDetail);