import React, { memo } from "react";
import BlogLayout from "../../components/layout/BlogLayout";
import blogsData from "../../data/blogs.json";
import SeoHelmet from "../../components/seo/SeoHelmet";
import BreadcrumbSchema from "../../components/seo/BreadcrumbSchema";
import PromoCTA from "../home/sections/PromoCTA";

const Blogs = memo(() => {
    const siteUrl = 'https://inraclick.com';
    return (
        <>
            <SeoHelmet
                title="Inraclick Blog | Digital Marketing & SEO Insights"
                description="Read the latest articles on SEO strategy, Meta ads optimization, React web engineering, and conversion rate optimization by Inraclick (inraclick.com)."
                keywords={['Inraclick Blog', 'Inraclick Insights', 'Digital Marketing Blog', 'SEO Guide Inraclick', 'inraclick.com']}
                image={siteUrl + '/sobo_logo.webp'}
                path="/blog"
                type="blog"
            />
            <BreadcrumbSchema items={[
                { name: 'Home', url: siteUrl + '/home' },
                { name: 'Blog', url: siteUrl + '/blog' }
            ]} />
            <BlogLayout type="list" blogsData={blogsData} />
            <PromoCTA />
        </>
    );
});

export default Blogs;
