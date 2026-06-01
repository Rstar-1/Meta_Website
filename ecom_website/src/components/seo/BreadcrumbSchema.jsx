import React from 'react'
import { generateSchema } from '../../utils/generateSchema'

const BreadcrumbSchema = ({ items = [] }) => {
  const schema = generateSchema.breadcrumb(items);
  return (
    <script type="application/ld+json">
      {JSON.stringify(schema)}
    </script>
  )
}

export default BreadcrumbSchema;
