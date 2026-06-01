import React from 'react'
import { generateSchema } from '../../utils/generateSchema'

const WebsiteSchema = ({ siteData }) => {
  const schema = generateSchema.website(siteData);
  return (
    <script type="application/ld+json">
      {JSON.stringify(schema)}
    </script>
  )
}

export default WebsiteSchema;
