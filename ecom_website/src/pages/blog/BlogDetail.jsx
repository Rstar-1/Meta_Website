import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import blogsData from '../../data/blogs.json';
import BlogLayout from '../../components/layout/BlogLayout';

const BlogDetail = () => {
  const { id } = useParams();
  const post = useMemo(() => {
    return blogsData.find((b) => b.id === id) || blogsData[0];
  }, [id]);

  return <BlogLayout type="detail" post={post} allBlogs={blogsData} />;
};

export default BlogDetail;
