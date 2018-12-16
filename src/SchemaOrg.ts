/**
 * JSON-LD is a format for encoding structured data in the Internet.
 * Its popularity is due to the fact Google uses it and advocates websites to use it.
 * There is a lot of different formats for publishing data on JSON-LD but since
 * this is a shabby blog I'll be only using a small subset of them.
 */

import {
  ReactSEOMetaTagsProps,
  WebsiteProps,
  BlogPostProps,
  FacebookProps,
  TwitterProps,
  CombinedProps,
} from './types'

/**
 * This schema is the bread and butter of websites. It's a simple description which
 * only benefit is I guess that Google might showcase your site in a search result.
 * (if all stars are aligned)
 * @param props
 */
const generateSiteJSONLD = ({ url, title, description, author } : WebsiteProps) => (
{
  '@context': 'http://schema.org',
  '@type': 'WebSite',
  url,
  name: title,
  description,
  author: {
    '@type': author!.schemaType,
    name: author!.name
  }
})

/**
 * This schema is a bit tricker one but it's simply a showcase of your page on say Google results.
 * A small box with a word or and and a picture.
 * https://developers.google.com/search/docs/guides/enhance-site#enable-breadcrumb
 * @param props
 */
const generateBreadcrumbList = ({ url, title, image } : WebsiteProps & BlogPostProps) => (
{
  '@context': 'http://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      item: {
        '@id': url,
        name: title,
        image,
      },
    },
  ],
})

/**
 * This is a general BlogPosting schema which covers quite a few attributes.
 * @param props
 */
const generateBlogPosting = ({ url, title, description, image, datePublished, dateModified, tags, site: { canonicalUrl }, author, organization } : WebsiteProps & BlogPostProps) => (
{
  '@context': 'http://schema.org',
  '@type': 'BlogPosting',
  url,
  name: title,
  // alternateName: defaultTitle,
  headline: title,
  keywords: tags,
  description,
  author: {
    '@type': 'Person',
    name: author.name,
  },
  image: {
    '@type': 'ImageObject',
    url: image,
  },
  publisher: {
    '@type': 'Organization',
    url: organization.url,
    // logo: organization.logo,
    name: organization.name,
  },
  mainEntityOfPage: {
    '@type': 'WebSite',
    '@id': canonicalUrl,
  },
  datePublished,
  dateModified, // Recommended by https://search.google.com/structured-data/testing-tool
  // Reasoning https://bts.nomadgate.com/medium-evergreen-content
  // Not only does Google prefer to feature more recent content in its search results, but
  // users are also more likely to click an article with a recent date listed next to it.
  // Does it make sense as you can just manipulate the date? Eeeh... Perhaps Google is aware of that.
})

export const createWebsiteJSONLD = (props: WebsiteProps) =>
  JSON.stringify([
    generateSiteJSONLD(props)
  ])

export const createBlogPostJSONLD = (props: WebsiteProps & BlogPostProps) =>
  JSON.stringify([
    generateSiteJSONLD(props),
    generateBreadcrumbList(props),
    generateBlogPosting(props)
  ])
