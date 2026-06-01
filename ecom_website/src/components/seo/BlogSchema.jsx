import React from 'react'
import { generateSchema } from '../../utils/generateSchema'

const BlogSchema = ({ post }) => {
  const schema = generateSchema.article(post);
  return (
    <script type="application/ld+json">
      {JSON.stringify(schema)}
    </script>
  )
}

export default BlogSchema;
