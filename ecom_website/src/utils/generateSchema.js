export const generateSchema = {
  organization: (orgData = {}) => {
    return {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: orgData.name || "Inraclick Digital Agency",
      alternateName: orgData.alternateName || ["Inraclick", "Inraclick.com", "Inraclick Agency", "Inraclick Marketing"],
      url: orgData.url || "https://inraclick.com",
      logo: orgData.logo || "https://inraclick.com/sobo_logo.webp",
      contactPoint: orgData.contact
        ? {
            "@type": "ContactPoint",
            telephone: orgData.contact.phone || "+91 98765 43210",
            contactType: "customer service",
            email: orgData.contact.email || "hello@inraclick.com",
          }
        : {
            "@type": "ContactPoint",
            telephone: "+91 98765 43210",
            contactType: "customer service",
            email: "hello@inraclick.com",
          },
      sameAs: orgData.socials || [
        "https://facebook.com/inraclick",
        "https://twitter.com/inraclick",
        "https://instagram.com/inraclick",
        "https://linkedin.com/company/inraclick"
      ],
    };
  },

  website: (siteData = {}) => {
    return {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteData.name || "Inraclick",
      alternateName: ["Inraclick", "Inraclick.com", "Inraclick Digital Agency"],
      url: siteData.url || "https://inraclick.com",
      potentialAction: {
        "@type": "SearchAction",
        target: `${siteData.url || "https://inraclick.com"}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    };
  },

  localBusiness: (bizData = {}) => {
    return {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: bizData.name || "Inraclick Digital Agency",
      image: bizData.image || "https://inraclick.com/sobo_logo.webp",
      "@id": bizData.url || "https://inraclick.com",
      url: bizData.url || "https://inraclick.com",
      telephone: bizData.phone || "+91 98765 43210",
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: bizData.address?.street || "Bandra Kurla Complex",
        addressLocality: bizData.address?.city || "Mumbai",
        addressRegion: bizData.address?.region || "Maharashtra",
        postalCode: bizData.address?.postalCode || "400051",
        addressCountry: bizData.address?.country || "India",
      },
      geo: bizData.geo
        ? {
            "@type": "GeoCoordinates",
            latitude: bizData.geo.latitude,
            longitude: bizData.geo.longitude,
          }
        : undefined,
      openingHoursSpecification: bizData.hours
        ? {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: bizData.hours.days || [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday"
            ],
            opens: bizData.hours.opens || "09:00",
            closes: bizData.hours.closes || "19:00",
          }
        : {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday"
            ],
            opens: "09:00",
            closes: "19:00",
          },
    };
  },

  breadcrumb: (items = []) => {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    };
  },

  faq: (faqs = [], logo = "/sobo_logo.webp") => {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      image: logo,
      publisher: {
        "@type": "Organization",
        name: "Inraclick Digital Agency",
        logo: {
          "@type": "ImageObject",
          url: logo,
        },
      },
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    };
  },

  article: (post = {}) => {
    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title || "",
      image: post.image || [],
      datePublished: post.createdAt || post.datePublished || new Date().toISOString(),
      dateModified:
        post.updatedAt || post.dateModified || post.createdAt || post.datePublished || new Date().toISOString(),
      author: {
        "@type": "Person",
        name: post.authorName || "Inraclick Team",
      },
      publisher: {
        "@type": "Organization",
        name: post.publisherName || "Inraclick Digital Agency",
        logo: {
          "@type": "ImageObject",
          url: post.publisherLogo || "https://inraclick.com/sobo_logo.webp",
        },
      },
      description: post.description || "",
    };
  },

  siteNavigation: (navItems = []) => {
    return {
      "@context": "https://schema.org",
      "@graph": navItems.map((item) => ({
        "@context": "https://schema.org",
        "@type": "SiteNavigationElement",
        "@id": item.url,
        name: item.name,
        url: item.url,
        description: item.description || ""
      })),
    };
  },
};
