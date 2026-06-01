import React from 'react'
import { generateSchema } from '../../utils/generateSchema'

const OrganizationSchema = ({ orgData }) => {
  const schema = generateSchema.organization(orgData);
  return (
    <script type="application/ld+json">
      {JSON.stringify(schema)}
    </script>
  )
}

export default OrganizationSchema;
