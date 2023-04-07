/**
 * JSON-LD is a format for encoding structured data in the Internet.
 * Its popularity is due to the fact Google uses it and advocates websites to use it.
 * There is a lot of different formats for publishing data on JSON-LD but since
 * my own use-case is only for publishing blog posts I'll be using but a small subset
 * of them.
 */

import {
  WebsiteProps,
  BlogPostProps,
  OrganizationProps,
  BreadcrumbList,
  PersonProps,
} from './types'

/**
 * This schema is the bread and butter of websites. It's a simple description which
 * only benefit is I guess that Google might showcase your site in a search result.
 * (if all stars are aligned)
 * @param props
 */
export function generateWebsite({
  author,
  datePublished,
  description,
  language,
  title,
  url,
  image,
  site,
} : WebsiteProps) {
  return {
    '@context': 'http://schema.org',
    '@type': 'WebPage',
    datePublished,
    description,
    image,
    inLanguage: language || 'en-US',
    name: title,
    url,
    author: author && generatePerson(author),
    potentialAction: site && site.searchUrl && {
      '@type': 'SearchAction',
      target: `${site.searchUrl}{search_term_string}`, // Eg "https://www.google.com/search?q=asdf"
      'query-input': 'required name=search_term_string',
    },
  }
}

function generatePerson({
  email,
  name,
  image,
}: PersonProps) {
  return {
    '@type': 'Person',
    name,
    email,
    image,
  }
}

/**
 * Breadcrumb is a nice way to show the structure of your site. People and bots both respect that.
 * The breadcrumb will be showed in the search result directly, so it's important to get it right.
 * I think Google bot tries to do by itself, but I guess it's helpful if you add it by yourself too.
 *
 * https://developers.google.com/search/docs/guides/enhance-site#enable-breadcrumb
 */
export function generateBreadcrumbList(breadcrumbList: BreadcrumbList) {
  return {
    '@context': 'http://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbList.map((b, i) => (
      {
        '@type': 'ListItem',
        position: i,
        item: {
          '@id': b.url,
          '@type': 'WebPage',
          url: b.url,
          name: b.title,
          image: b.image,
        }
      }
    ))
  }
}

export function generateOrganization(organization: OrganizationProps): Object {
  return {
    '@context': 'http://schema.org',
    '@type': organization['@type'] ? organization['@type'] : 'Organization',
    description: organization.description,
    name: organization.name,
    legalName: organization.legalName,
    sameAs: organization.sameAs,
    url: organization.url,
    logo: organization.logo,
    parentOrganization: organization.parentOrganization && generateOrganization(organization.parentOrganization),
  }
}

/**
 * This is a general BlogPosting schema which covers quite a few attributes.
 * @param props
 */
export function generateBlogPosting({
  url,
  title,
  description,
  image,
  datePublished,
  dateModified,
  tags,
  author,
  publisher,
} : WebsiteProps & BlogPostProps) {
  return {
    '@context': 'http://schema.org',
    '@type': 'BlogPosting',
    url,
    name: title,
    // From https://developers.google.com/search/docs/data-types/article#article_types
    // "The headline of the article. Headlines should not exceed 110 characters."
    headline: title,
    keywords: tags,
    description,
    author: author && generatePerson(author),
    publisher: publisher && generateOrganization(publisher),
    mainEntityOfPage: { // From example markup of JSON-LD https://developers.google.com/search/docs/data-types/article
      '@type': 'WebPage',
      '@id': url, // Indicates that this BlogPosting is the main thing in this URL.
    },
    // From https://developers.google.com/search/docs/data-types/article#article_types
    // "Images should be at least 1200 pixels wide."
    image,
    // thumbnailUrl ?
    datePublished,
    dateModified, // Recommended by https://search.google.com/structured-data/testing-tool
    // Reasoning https://bts.nomadgate.com/medium-evergreen-content
    // Not only does Google prefer to feature more recent content in its search results, but
    // users are also more likely to click an article with a recent date listed next to it.
    // Does it make sense as you can just manipulate the date? Eeeh... Perhaps Google is aware of that.
  }
}
