import React, { useMemo, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import blogsData from '../../data/blogs.json';
import BlogLayout from '../../components/layout/BlogLayout';

const BlogDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, [id]);

  const post = useMemo(() => {
    return blogsData.find((b) => b.id === id) || blogsData[0];
  }, [id]);

  return <BlogLayout type="detail" post={post} allBlogs={blogsData} loading={loading} />;
};

export default BlogDetail;
