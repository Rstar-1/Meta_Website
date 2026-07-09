
export const generateSchema = {

  organization: (orgData = {}) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': orgData.name || 'SOBO Marketing Solution',
      'url': orgData.url || 'https://sobo-marketing.com',
      'logo': orgData.logo || 'https://sobo-marketing.com/sobo_logo.png',
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
      'name': siteData.name || 'SOBO Marketing Solution',
      'url': siteData.url || 'https://sobo-marketing.com',
      'potentialAction': {
        '@type': 'SearchAction',
        'target': `${siteData.url || 'https://sobo-marketing.com'}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    };
  },


  localBusiness: (bizData = {}) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      'name': bizData.name || 'SOBO Marketing Solution',
      'image': bizData.image || 'https://sobo-marketing.com/sobo_logo.png',
      '@id': bizData.url || 'https://sobo-marketing.com',
      'url': bizData.url || 'https://sobo-marketing.com',
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
      'priceCurrency': product.priceCurrency || 'INR',
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

  faq: (faqs = [], logo = '/sobo_logo.png') => {
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
        'name': post.publisherName || 'SOBO Marketing Solution',
        'logo': {
          '@type': 'ImageObject',
          'url': post.publisherLogo || 'https://sobo-marketing.com/sobo_logo.png'
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
