import React, { memo } from "react";
import Banner from "../../components/layout/Banner";
import BlogList from "./sections/BlogList";

const Blogs = memo(() => {

    return (
        <>
            {/* --- Page Banner --- */}
            <Banner
                style={{ background: "linear-gradient(135deg, #021B44 0%, #00102A 100%)" }}
                // img="https://metatechnical.org/images/banners/blog.png"
                title="Latest Articles"
                desc="Tips to help your business grow with smart marketing."
            />

            {/* --- Main Content Area --- */}
            <BlogList />
        </>
    );
});

export default Blogs;
