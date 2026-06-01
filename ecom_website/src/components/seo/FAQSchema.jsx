import React from 'react'
import { generateSchema } from '../../utils/generateSchema'

const FAQSchema = ({ faqs = [] }) => {
  const schema = generateSchema.faq(faqs);
  return (
    <script type="application/ld+json">
      {JSON.stringify(schema)}
    </script>
  )
}

export default FAQSchema;
