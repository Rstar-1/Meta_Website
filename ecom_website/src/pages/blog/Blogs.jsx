import React, { memo } from "react";
import BlogList from "./sections/BlogList";

const Blogs = memo(() => {

    return (
        <>
            {/* --- Main Content Area --- */}
            <BlogList />
        </>
    );
});

export default Blogs;
