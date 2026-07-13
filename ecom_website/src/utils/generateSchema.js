export const generateSchema = {
  organization: (orgData = {}) => {
    return {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: orgData.name || "SOBO Marketing Solution",
      url: orgData.url || "https://sobo-marketing.com",
      logo: orgData.logo || "https://sobo-marketing.com/sobo_logo.png",
      contactPoint: orgData.contact
        ? {
            "@type": "ContactPoint",
            telephone: orgData.contact.phone || "",
            contactType: "customer service",
            email: orgData.contact.email || "",
          }
        : undefined,
      sameAs: orgData.socials || [],
    };
  },

  website: (siteData = {}) => {
    return {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteData.name || "SOBO Marketing Solution",
      url: siteData.url || "https://sobo-marketing.com",
      potentialAction: {
        "@type": "SearchAction",
        target: `${siteData.url || "https://sobo-marketing.com"}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    };
  },

  localBusiness: (bizData = {}) => {
    return {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: bizData.name || "SOBO Marketing Solution",
      image: bizData.image || "https://sobo-marketing.com/sobo_logo.png",
      "@id": bizData.url || "https://sobo-marketing.com",
      url: bizData.url || "https://sobo-marketing.com",
      telephone: bizData.phone || "",
      address: {
        "@type": "PostalAddress",
        streetAddress: bizData.address?.street || "",
        addressLocality: bizData.address?.city || "",
        addressRegion: bizData.address?.region || "",
        postalCode: bizData.address?.postalCode || "",
        addressCountry: bizData.address?.country || "",
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
            ],
            opens: bizData.hours.opens || "09:00",
            closes: bizData.hours.closes || "18:00",
          }
        : undefined,
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
        name: "SOBO Marketing Solution",
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
      datePublished: post.datePublished || new Date().toISOString(),
      dateModified:
        post.dateModified || post.datePublished || new Date().toISOString(),
      author: {
        "@type": "Person",
        name: post.authorName || "Admin",
      },
      publisher: {
        "@type": "Organization",
        name: post.publisherName || "SOBO Marketing Solution",
        logo: {
          "@type": "ImageObject",
          url: post.publisherLogo || "https://sobo-marketing.com/sobo_logo.png",
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
      })),
    };
  },
};
