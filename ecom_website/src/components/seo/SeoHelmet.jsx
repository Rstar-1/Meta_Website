import React, { useEffect } from 'react'
import { generateMeta } from '../../utils/generateMeta'
import defaultSEO from '../../seo/defaultSEO'

const SeoHelmet = ({ title, description, keywords, image, path, type, robots, canonical }) => {
  useEffect(() => {
    const metaData = generateMeta(
      { title, description, keywords, image, path, type, robots, canonical },
      defaultSEO
    );

    // Set Document Title
    document.title = metaData.title;

    // Helper to set or update meta tag
    const updateMetaTag = (attributeName, attributeValue, contentValue) => {
      let tag = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attributeName, attributeValue);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', contentValue);
    };

    // Helper to set or update link tag
    const updateLinkTag = (relValue, hrefValue) => {
      let tag = document.querySelector(`link[rel="${relValue}"]`);
      if (!tag) {
        tag = document.createElement('link');
        tag.setAttribute('rel', relValue);
        document.head.appendChild(tag);
      }
      tag.setAttribute('href', hrefValue);
    };

    // Inject standard and social meta tags
    metaData.metaTags.forEach(meta => {
      const attrName = meta.name ? 'name' : 'property';
      const attrVal = meta.name || meta.property;
      updateMetaTag(attrName, attrVal, meta.content);
    });

    // Inject link tags
    metaData.linkTags.forEach(link => {
      updateLinkTag(link.rel, link.href);
    });
  }, [title, description, keywords, image, path, type, robots, canonical]);

  return null; // Render-less component (side-effects only)
}

export default SeoHelmet;
