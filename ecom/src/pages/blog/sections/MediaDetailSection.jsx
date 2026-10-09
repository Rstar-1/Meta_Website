import React from 'react';
import { useNavigate, useLocation, useParams, useSearchParams } from 'react-router-dom';

import Container from '../../../components/common/Container';
import Button from '../../../components/common/Button';
import Modal from '../../../components/common/Modal';
import Image from '../../../components/common/Image';
import Icon from '../../../components/common/Icon';
import Fields from '../../../components/forms/Fields';
import Badge from '../../../components/common/Badge';
import { resolveImagePath } from '../../../utils/imageResolver';
import blogData from '../../../data/blog.json';

const CategorySection = React.lazy(() => import('./CategorySection'));

const MediaDetailSection = React.memo(() => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const [isMobileCategoryOpen, setIsMobileCategoryOpen] = React.useState(false);

    const blogsList = React.useMemo(() => blogData || [], []);

    const currentBlog = React.useMemo(() => {
        if (location.state?.blog) return location.state.blog;
        const blogParam = id || searchParams.get('id') || searchParams.get('slug');
        if (blogParam) {
            const found = blogsList.find((b) => String(b.id) === String(blogParam) || b.slug === blogParam);
            if (found) return found;
        }
        return blogsList[0] || null;
    }, [location.state, id, searchParams, blogsList]);

    const [comments, setComments] = React.useState([]);

    React.useEffect(() => {
        if (currentBlog?.reviews) {
            setComments(currentBlog.reviews);
        } else {
            setComments([]);
        }
    }, [currentBlog]);

    const handleBlogClick = React.useCallback((post) => {
        setIsMobileCategoryOpen(false);
        navigate(`/blog-detail?id=${post.id || post.slug}`, { state: { blog: post } });
    }, [navigate]);

    const handleShare = React.useCallback((platform) => {
        const origin = window.location.origin;
        const blogId = currentBlog?.id || currentBlog?.slug;
        const shareUrl = `${origin}/blog-detail${blogId ? `?id=${blogId}` : ''}`;
        const shareTitle = currentBlog?.title || 'Check out this article';

        switch (platform) {
            case 'Facebook':
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank', 'noopener,noreferrer');
                break;
            case 'WhatsApp':
                window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareTitle} - ${shareUrl}`)}`, '_blank', 'noopener,noreferrer');
                break;
            case 'Instagram':
                if (navigator.share) {
                    navigator.share({
                        title: shareTitle,
                        url: shareUrl,
                    }).catch(() => {});
                } else if (navigator.clipboard) {
                    navigator.clipboard.writeText(shareUrl).then(() => {
                        window.open('https://www.instagram.com', '_blank', 'noopener,noreferrer');
                    }).catch(() => {
                        window.open('https://www.instagram.com', '_blank', 'noopener,noreferrer');
                    });
                } else {
                    window.open('https://www.instagram.com', '_blank', 'noopener,noreferrer');
                }
                break;
            default:
                break;
        }
    }, [currentBlog]);

    if (!currentBlog) return null;

    return (
        <Container>
            <div className="py-60">
                <div className="hidden sm-flex items-center justify-between mb-20">
                    <Button
                        onClick={() => setIsMobileCategoryOpen(true)}
                        icon="Filter"
                        text="Categories & Articles"
                        iconWidth="11"
                        iconHeight="11"
                        version="v2"
                        variant="outline"
                        color="dark"
                        bg="tertiary"
                        className="rounded-30 font-500"
                    />
                </div>

                <div className="flex sm-grid-cols-1 items-start gap-12 w-full">
                    <div className="w-70 sm-w-full pr-10 sm-pr-1">
                        <Image
                            src={resolveImagePath(currentBlog.image)}
                            alt={currentBlog.title}
                            className="flex rounded-10 h-450 sm-h-300 w-full object-cover"
                        />

                        <div className="flex items-center flex-wrap gap-12 mt-20">
                            <div className="flex items-center gap-6">
                                <Icon name="Customers" width="15" height="15" stroke="var(--gray)" />
                                <p className="small-text text-gray font-400">By {currentBlog.author || 'Admin'}</p>
                            </div>
                            <div className="flex items-center gap-6 ml-10">
                                <Icon name="Box" width="15" height="15" stroke="var(--gray)" />
                                <p className="small-text text-gray font-400">{currentBlog.date}</p>
                            </div>
                            {currentBlog.readTime && (
                                <div className="flex items-center gap-6">
                                    <Icon name="Clock" width="15" height="15" stroke="var(--gray)" />
                                    <p className="small-text text-gray font-400">{currentBlog.readTime}</p>
                                </div>
                            )}
                        </div>

                        <h3 className="text-dark font-600 head-text uppercase mt-16">
                            {currentBlog.title}
                        </h3>

                        <p className="text-gray font-400 para-text mt-14">
                            {currentBlog.content}
                        </p>

                        {currentBlog.quote && (
                            <div className="rounded-5 p-20 relative mt-16 bg-light-warning">
                                <p className="para-text font-500 text-dark">
                                    "{currentBlog.quote}"
                                </p>
                            </div>
                        )}

                        <p className="text-gray font-400 para-text mt-16">
                            {currentBlog.excerpt}
                        </p>

                        <div className="flex sm-grid-cols-1 sm-gap-12 justify-between items-center py-20">
                            <div className="flex gap-8 items-center flex-wrap">
                                {currentBlog.tags?.map((tag) => (
                                    <Badge
                                        key={tag}
                                        text={tag}
                                        color="gray"
                                        size="md"
                                        shape="pill"
                                        className="font-500"
                                    />
                                ))}
                            </div>

                            <div className="flex gap-10 items-center">
                                {['Facebook', 'WhatsApp', 'Instagram'].map((iconName, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => handleShare(iconName)}
                                        className="cursor-pointer hover:opacity-80 flex items-center justify-center p-4 transition-all"
                                        title={`Share on ${iconName}`}
                                        role="button"
                                        tabIndex={0}
                                        onKeyDown={(e) => e.key === 'Enter' && handleShare(iconName)}
                                    >
                                        <Icon name={iconName} width="16" height="16" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-20">
                            <h3 className="text-dark uppercase mid-text font-600">
                                Reviews & Comments <span className="font-400 headmini-text">({comments.length.toString().padStart(2, '0')})</span>
                            </h3>

                            <div className="grid-cols-1 gap-12">
                                {comments.map((c) => (
                                    <div key={c.id} className="flex gap-12 items-start py-30 bordb w-85 sm-w-full">
                                        <div className="w-15 sm-w-30">
                                            <Image src={c.avatar} alt={c.name} width="100" height="100" className="object-cover flex rounded-full mx-auto" />
                                        </div>

                                        <div className="w-85 sm-w-70">
                                            <h5 className="text-dark mid-text font-600 uppercase">
                                                {c.name}
                                            </h5>
                                            <Fields
                                                type="rating"
                                                value={c.rating || 5}
                                                disabled
                                                size={15}
                                                gap={2}
                                                className="mt-6"
                                            />

                                            <p className="small-text text-gray font-400 mt-12">
                                                {c.text}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="w-30 sm-hidden pl-10 overflow-auto h-550 sticky" style={{ top: '19%' }}>
                        <React.Suspense fallback={<div className="w-full h-300" />}>
                            <CategorySection
                                excludeBlogId={currentBlog.id}
                                onBlogClick={handleBlogClick}
                            />
                        </React.Suspense>
                    </div>
                </div>

                <Modal
                    type="sidebar"
                    placement="left"
                    size="sm"
                    title="Categories & Articles"
                    isOpen={isMobileCategoryOpen}
                    onClose={() => setIsMobileCategoryOpen(false)}
                    footer={null}
                >
                    <div className="py-10">
                        <React.Suspense fallback={<div className="w-full h-300" />}>
                            <CategorySection
                                excludeBlogId={currentBlog.id}
                                onBlogClick={handleBlogClick}
                            />
                        </React.Suspense>
                    </div>
                </Modal>
            </div>
        </Container>
    );
});

MediaDetailSection.displayName = 'MediaDetailSection';

export default MediaDetailSection;
