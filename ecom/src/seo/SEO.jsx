import React from "react";
import {
    SITE_URL,
    SITE_NAME,
    DEFAULT_IMAGE,
    siteInfo,
    pageSeoData,
    getUrl,
    getImageUrl,
} from "./seoConfig";

const setMeta = (key, value, property = false) => {
    if (!value) return;
    const attr = property ? "property" : "name";
    let tag = document.head.querySelector(`meta[${attr}="${key}"]`);
    if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attr, key);
        document.head.appendChild(tag);
    }
    tag.setAttribute("content", value);
};

const setCanonical = (url) => {
    let tag = document.head.querySelector('link[rel="canonical"]');
    if (!tag) {
        tag = document.createElement("link");
        tag.rel = "canonical";
        document.head.appendChild(tag);
    }
    tag.href = url;
};

const SEO = ({
    page,
    title,
    description,
    image,
    path,
    type = "website",
    faqs = [],
    product,
    article,
    breadcrumbs,
}) => {
    const config = pageSeoData[page] || {};

    const finalTitle =
        title ||
        config.title ||
        `${SITE_NAME} | PVC Vinyl Products Manufacturer`;

    const finalDescription =
        description ||
        config.description ||
        siteInfo.description;

    const finalPath = path || config.path || "/";
    const canonical = getUrl(finalPath);
    const finalImage = getImageUrl(image);
    const finalBreadcrumbs = (breadcrumbs && breadcrumbs.length > 0)
        ? breadcrumbs
        : (config.breadcrumbs || []);

    React.useEffect(() => {
        document.title = finalTitle;

        setMeta("description", finalDescription);
        setMeta("robots", "index, follow, max-image-preview:large");
        setCanonical(canonical);

        setMeta("og:site_name", SITE_NAME, true);
        setMeta("og:title", finalTitle, true);
        setMeta("og:description", finalDescription, true);
        setMeta("og:url", canonical, true);
        setMeta("og:type", article ? "article" : type, true);
        setMeta("og:image", finalImage, true);
        setMeta("og:image:alt", finalTitle, true);

        setMeta("twitter:card", "summary_large_image");
        setMeta("twitter:title", finalTitle);
        setMeta("twitter:description", finalDescription);
        setMeta("twitter:image", finalImage);
        setMeta("twitter:image:alt", finalTitle);

        const graph = [
            {
                "@type": "Organization",
                "@id": `${SITE_URL}/#organization`,
                name: SITE_NAME,
                url: SITE_URL,
                logo: getUrl(DEFAULT_IMAGE),
                description: siteInfo.description,
                telephone: siteInfo.phone,
                email: siteInfo.email,
                address: {
                    "@type": "PostalAddress",
                    ...siteInfo.address,
                },
                geo: {
                    "@type": "GeoCoordinates",
                    ...siteInfo.geo,
                },
                sameAs: siteInfo.sameAs,
            },
            {
                "@type": "WebSite",
                "@id": `${SITE_URL}/#website`,
                url: SITE_URL,
                name: SITE_NAME,
                publisher: {
                    "@id": `${SITE_URL}/#organization`,
                },
            },
            {
                "@type": "WebPage",
                "@id": `${canonical}#webpage`,
                url: canonical,
                name: finalTitle,
                description: finalDescription,
                isPartOf: {
                    "@id": `${SITE_URL}/#website`,
                },
            },
        ];

        if (finalBreadcrumbs.length) {
            graph.push({
                "@type": "BreadcrumbList",
                itemListElement: finalBreadcrumbs.map((item, index) => ({
                    "@type": "ListItem",
                    position: index + 1,
                    name: item.name || item.label || `Page ${index + 1}`,
                    item: getUrl(item.path),
                })),
            });
        }

        if (faqs.length) {
            graph.push({
                "@type": "FAQPage",
                mainEntity: faqs.map((faq) => ({
                    "@type": "Question",
                    name: faq.question,
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: faq.answer,
                    },
                })),
            });
        }

        if (product) {
            graph.push({
                "@type": "Product",
                name: product.name,
                description: product.description,
                image: product.images?.length ? product.images.map(getImageUrl) : [finalImage],
                sku: product.sku,
                mpn: product.productCode || product.sku,
                brand: {
                    "@type": "Brand",
                    name: product.brand || SITE_NAME,
                },
                ...(product.review && {
                    review: {
                        "@type": "Review",
                        reviewRating: {
                            "@type": "Rating",
                            ratingValue: product.review.rating,
                            bestRating: "5",
                        },
                        author: {
                            "@type": "Person",
                            name: product.review.author,
                        },
                        reviewBody: product.review.text,
                    },
                }),
                ...(product.price && {
                    offers: {
                        "@type": "Offer",
                        url: canonical,
                        priceCurrency: product.currency || "INR",
                        price: product.price,
                        availability:
                            product.stock > 0
                                ? "https://schema.org/InStock"
                                : "https://schema.org/OutOfStock",
                        seller: {
                            "@id": `${SITE_URL}/#organization`,
                        },
                    },
                }),
            });
        }

        if (article) {
            graph.push({
                "@type": "Article",
                "@id": `${canonical}#article`,
                headline: article.title || finalTitle,
                description: article.description || finalDescription,
                image: [getImageUrl(article.image || image || finalImage)],
                datePublished: article.datePublished,
                dateModified: article.dateModified || article.datePublished,
                author: {
                    "@type": article.authorType || "Person",
                    name: article.author || SITE_NAME,
                },
                publisher: {
                    "@id": `${SITE_URL}/#organization`,
                },
                mainEntityOfPage: {
                    "@id": `${canonical}#webpage`,
                },
            });
        }

        let script = document.getElementById("site-seo-jsonld");
        if (!script) {
            script = document.createElement("script");
            script.id = "site-seo-jsonld";
            script.type = "application/ld+json";
            document.head.appendChild(script);
        }

        script.textContent = JSON.stringify({
            "@context": "https://schema.org",
            "@graph": graph,
        });
    }, [
        finalTitle,
        finalDescription,
        canonical,
        finalImage,
        type,
        product,
        article,
        faqs,
        finalBreadcrumbs,
    ]);

    return null;
};

export default React.memo(SEO);