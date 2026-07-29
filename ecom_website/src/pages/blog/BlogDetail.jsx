import { useMemo, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { blogs as blogsData } from '../../utils/apiData';
import BlogLayout from '../../components/layout/BlogLayout';

const BlogDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [prevId, setPrevId] = useState(id);

  if (id !== prevId) {
    setPrevId(id);
    setLoading(true);
  }

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, [id]);

  const post = useMemo(() => {
    return blogsData.find((b) => b.id === id) || blogsData[0];
  }, [id]);

  return <BlogLayout type="detail" post={post} allBlogs={blogsData} loading={loading} />;
};

export default BlogDetail;
