import React from 'react'
import { generateSchema } from '../../utils/generateSchema'

const ProductSchema = ({ product, reviews = [] }) => {
  const schema = generateSchema.product(product, reviews);
  return (
    <script type="application/ld+json">
      {JSON.stringify(schema)}
    </script>
  )
}

export default ProductSchema;
