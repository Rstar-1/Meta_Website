
export const generateSchema = {

  organization: (orgData = {}) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': orgData.name || 'E-Commerce Store',
      'url': orgData.url || 'https://example.com',
      'logo': orgData.logo || 'https://example.com/logo.webp',
      'contactPoint': orgData.contact ? {
        '@type': 'ContactPoint',
        'telephone': orgData.contact.phone || '',
        'contactType': 'customer service',
        'email': orgData.contact.email || ''
      } : undefined,
      'sameAs': orgData.socials || []
    };
  },

  website: (siteData = {}) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      'name': siteData.name || 'E-Commerce Store',
      'url': siteData.url || 'https://example.com',
      'potentialAction': {
        '@type': 'SearchAction',
        'target': `${siteData.url || 'https://example.com'}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    };
  },


  localBusiness: (bizData = {}) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      'name': bizData.name || 'E-Commerce Store',
      'image': bizData.image || 'https://example.com/logo.webp',
      '@id': bizData.url || 'https://example.com',
      'url': bizData.url || 'https://example.com',
      'telephone': bizData.phone || '',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': bizData.address?.street || '',
        'addressLocality': bizData.address?.city || '',
        'addressRegion': bizData.address?.region || '',
        'postalCode': bizData.address?.postalCode || '',
        'addressCountry': bizData.address?.country || ''
      },
      'geo': bizData.geo ? {
        '@type': 'GeoCoordinates',
        'latitude': bizData.geo.latitude,
        'longitude': bizData.geo.longitude
      } : undefined,
      'openingHoursSpecification': bizData.hours ? {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': bizData.hours.days || ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        'opens': bizData.hours.opens || '09:00',
        'closes': bizData.hours.closes || '18:00'
      } : undefined
    };
  },

  product: (product = {}, reviews = []) => {
    const offers = {
      '@type': 'Offer',
      'priceCurrency': product.priceCurrency || 'USD',
      'price': product.price || '0.00',
      'priceValidUntil': product.priceValidUntil || '2030-12-31',
      'availability': product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      'url': product.url || ''
    };

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      'name': product.name || '',
      'image': product.images || [],
      'description': product.description || '',
      'sku': product.sku || '',
      'mpn': product.mpn || '',
      'brand': {
        '@type': 'Brand',
        'name': product.brand || 'Generic'
      },
      'offers': offers
    };

    if (product.aggregateRating) {
      schema.aggregateRating = {
        '@type': 'AggregateRating',
        'ratingValue': product.aggregateRating.ratingValue || '5',
        'reviewCount': product.aggregateRating.reviewCount || '1'
      };
    }

    if (reviews.length > 0) {
      schema.review = reviews.map(r => ({
        '@type': 'Review',
        'author': {
          '@type': 'Person',
          'name': r.author || 'Anonymous'
        },
        'datePublished': r.date || new Date().toISOString().split('T')[0],
        'reviewRating': {
          '@type': 'Rating',
          'ratingValue': r.rating || '5'
        },
        'reviewBody': r.content || ''
      }));
    }

    return schema;
  },

  breadcrumb: (items = []) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': items.map((item, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'name': item.name,
        'item': item.url
      }))
    };
  },

  faq: (faqs = [], logo = '/sobo_logo.webp') => {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'image': logo,
      'publisher': {
        '@type': 'Organization',
        'name': 'SOBO Marketing Solution',
        'logo': {
          '@type': 'ImageObject',
          'url': logo
        }
      },
      'mainEntity': faqs.map(faq => ({
        '@type': 'Question',
        'name': faq.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': faq.answer
        }
      }))
    };
  },

  article: (post = {}) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      'headline': post.title || '',
      'image': post.image || [],
      'datePublished': post.datePublished || new Date().toISOString(),
      'dateModified': post.dateModified || post.datePublished || new Date().toISOString(),
      'author': {
        '@type': 'Person',
        'name': post.authorName || 'Admin'
      },
      'publisher': {
        '@type': 'Organization',
        'name': post.publisherName || 'E-Commerce Store',
        'logo': {
          '@type': 'ImageObject',
          'url': post.publisherLogo || 'https://example.com/logo.webp'
        }
      },
      'description': post.description || ''
    };
  },

  siteNavigation: (navItems = []) => {
    return {
      '@context': 'https://schema.org',
      '@graph': navItems.map((item) => ({
        '@context': 'https://schema.org',
        '@type': 'SiteNavigationElement',
        '@id': item.url,
        'name': item.name,
        'url': item.url
      }))
    };
  }
};
