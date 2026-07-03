import React from 'react';
import { generateSchema } from '../../utils/generateSchema';

const SiteNavigationSchema = ({ navItems }) => {
  const schema = generateSchema.siteNavigation(navItems);
  return (
    <script type="application/ld+json">
      {JSON.stringify(schema)}
    </script>
  );
};

export default SiteNavigationSchema;
