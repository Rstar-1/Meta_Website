import React, { useEffect } from 'react'
import { generateMeta } from '../../utils/generateMeta'
import defaultSEO from '../../seo/defaultSEO'
import { routeMeta } from '../../seo/seoConfig'

const SeoHelmet = ({
  title,
  description,
  keywords,
  path,
  image,
  type,
  robots,
  canonical,
  themeColor,
  author,
  referrer,
  imageAlt,
  imageWidth,
  imageHeight,
  twitterSite
}) => {
  const currentPath = path || (typeof window !== 'undefined' ? window.location.pathname : '');
  const config = routeMeta[currentPath] || routeMeta[currentPath.replace(/\/$/, '')] || {};

  const resolvedTitle = title || config.title;
  const resolvedDescription = description || config.description;
  const resolvedKeywords = keywords || config.keywords;
  const resolvedPath = path || config.path;

  useEffect(() => {
    const metaData = generateMeta(
      {
        title: resolvedTitle,
        description: resolvedDescription,
        keywords: resolvedKeywords,
        path: resolvedPath,
        image, type, robots, canonical, themeColor, author, referrer, imageAlt, imageWidth, imageHeight, twitterSite
      },
      defaultSEO
    );

    document.title = metaData.title;

    const updateTag = (tagType, attr, val, targetAttr, targetVal) => {
      let el = document.querySelector(`${tagType}[${attr}="${val}"]`);
      if (!el) {
        el = document.createElement(tagType);
        el.setAttribute(attr, val);
        document.head.appendChild(el);
      }
      el.setAttribute(targetAttr, targetVal);
    };

    metaData.metaTags.forEach(meta => {
      const attrName = meta.name ? 'name' : 'property';
      const attrVal = meta.name || meta.property;
      updateTag('meta', attrName, attrVal, 'content', meta.content);
    });

    metaData.linkTags.forEach(link => {
      updateTag('link', 'rel', link.rel, 'href', link.href);
    });
  }, [
    resolvedTitle, resolvedDescription, resolvedKeywords, resolvedPath,
    image, type, robots, canonical, themeColor, author, referrer, imageAlt, imageWidth, imageHeight, twitterSite
  ]);

  return null;
}

export default SeoHelmet;
