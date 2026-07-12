import React from 'react'
import { generateSchema } from '../../utils/generateSchema'
import logoImg from '../../assets/sobo_logo.webp'

const FAQSchema = ({ faqs = [], logo = logoImg }) => {
  const schema = generateSchema.faq(faqs, logo);
  return (
    <script type="application/ld+json">
      {JSON.stringify(schema)}
    </script>
  )
}

export default FAQSchema;
