import React, { lazy, Suspense, memo, useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import LazySection from '../../components/common/LazySection';
import Container from '../../components/common/Container';
import Banner from '../../components/layout/generic/Banner';
import SEO from '../../seo';
import blogData from '../../data/blog.json';

const MediaDetailSection = lazy(() => import('./sections/MediaDetailSection'));
const PatchSection = lazy(() => import('../home/sections/ecom/PatchSection'));

const blogDetailSections = [
    {
        id: 'media',
        Component: MediaDetailSection,
        minHeight: '600px',
        isContainer: false
    },
    {
        id: 'patch',
        Component: PatchSection,
        minHeight: '300px',
        isContainer: true,
        containerClass: 'relative z-10',
        containerStyle: {
            backgroundImage: `linear-gradient(90deg, rgba(10, 15, 25, 0.94) 0%, rgba(10, 15, 25, 0.82) 50%, rgba(10, 15, 25, 0.45) 100%), url(${import.meta.env.VITE_IMAGE + 'Patch1.jpg'})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed'
        }
    },
];

const SectionFallback = memo(({ minHeight = '100px' }) => (
    <div className="w-full" style={{ minHeight }} />
));

const BlogDetail = () => {
    const location = useLocation();
    const { id } = useParams();

    const currentBlog = useMemo(() => {
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

    const breadcrumbs = useMemo(() => [
        { label: 'Home', path: '/home' },
        { label: 'Blog', path: '/blog' },
        { label: currentBlog?.title || 'Blog Detail', path }
    ], [currentBlog?.title, path]);

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
                breadcrumbs={breadcrumbs}
            />
            <Banner
                title="Blog Detail"
                desc={currentBlog?.category || 'Blog Details'}
                breadcrumbs={breadcrumbs}
            />
            {blogDetailSections.map(({ id: secId, Component, isEager, minHeight, isContainer, containerClass, containerStyle }) => {
                const SectionContent = (
                    <Suspense fallback={<SectionFallback minHeight={minHeight} />}>
                        <Component />
                    </Suspense>
                );

                const Content = isContainer ? (
                    <Container className={containerClass} style={containerStyle}>
                        {SectionContent}
                    </Container>
                ) : (
                    SectionContent
                );

                return isEager ? (
                    <React.Fragment key={secId}>
                        {Content}
                    </React.Fragment>
                ) : (
                    <LazySection
                        key={secId}
                        placeholderHeight={minHeight}
                        placeholder={<SectionFallback minHeight={minHeight} />}
                    >
                        {Content}
                    </LazySection>
                );
            })}
        </>
    );
};

export default memo(BlogDetail);