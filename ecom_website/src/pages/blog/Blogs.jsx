import React, { memo } from "react";
import BlogLayout from "../../components/layout/BlogLayout";
import blogsData from "../../data/blogs.json";
import SeoHelmet from "../../components/seo/SeoHelmet";
import BreadcrumbSchema from "../../components/seo/BreadcrumbSchema";
import LatestArticles from "../home/sections/LatestArticles";
import BusinessPromo from "../home/sections/BusinessPromo";
import Review from "../home/sections/Review";

const Blogs = memo(() => {
    const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://ecom-website.example.com';
    return (
        <>
            <SeoHelmet
                title="B2B Industry Insights & Blogs | SOBO Marketing Solution"
                description="Read our latest articles on industrial trends, office supply optimization, and manufacturing best practices."
                keywords={['Industrial Blog', 'B2B Trends', 'Manufacturing Guide', 'Toner Cartridge Tips']}
                image={siteUrl + '/src/assets/sobo_logo.png'}
                path="/blog"
                type="blog"
            />
            <BreadcrumbSchema items={[
                { name: 'Home', url: siteUrl + '/home' },
                { name: 'Blog', url: siteUrl + '/blog' }
            ]} />
            <BlogLayout type="list" blogsData={blogsData} />
            <LatestArticles />
            <BusinessPromo />
            <Review />
        </>
    );
});

export default Blogs;
