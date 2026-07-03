import React, { memo } from "react";
import BlogLayout from "../../../components/layout/BlogLayout";
import blogsData from "../../../data/blogs.json";

const BlogList = memo(() => {
    return <BlogLayout type="list" blogsData={blogsData} />;
});

export default BlogList;
