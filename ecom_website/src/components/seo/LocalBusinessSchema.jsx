import React from 'react'
import { generateSchema } from '../../utils/generateSchema'

const LocalBusinessSchema = ({ bizData }) => {
  const schema = generateSchema.localBusiness(bizData);
  return (
    <script type="application/ld+json">
      {JSON.stringify(schema)}
    </script>
  )
}

export default LocalBusinessSchema;
