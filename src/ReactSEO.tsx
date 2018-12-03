import * as React from 'react'

import { ISiteData, IBlogPostFrontmatter } from '../types/graphql'

interface IProps {
  site: ISiteData
  blogPost?: {
    frontmatter: IBlogPostFrontmatter
    url: string
    description: string
  }
}

interface IBlogPost {
  frontmatter: IBlogPostFrontmatter
  url: string
}

const generateBlogJSONLD = ({ frontmatter, url }: IBlogPost) => ([
  {
    "@context": "http://schema.org",
    "@type": "BlogPosting",
    headline: frontmatter.title,
    keywords: frontmatter.tags,
    url,
    datePublished: frontmatter.date,
    dateCreated: frontmatter.date,
    //image
    //publisher
    //dateModified
    //mainEntityOfPage
    author: {
      '@type': 'Person',
      name: 'Teemu Koivisto'
    },
  }
])

const generateSiteJSONLD = ({ siteMetadata }: ISiteData) => ([
  {
    "@context": "http://schema.org",
    "@type": "WebSite",
    url: siteMetadata.url,
    name: siteMetadata.title,
    description: siteMetadata.description,
    author: {
      '@type': 'Person',
      name: 'Teemu Koivisto'
    }
  }
])

/**
 * General SEO element that renders meta tags with react-helmet
 * Which is kinda shitty library, as it doesn't allow nested components inside of it.
 * So instead everything is rendered here as methods of this SEO. Sigh.
 */
export class ReactSEO extends React.PureComponent<IProps> {
  renderGeneral(description: string, image: string, JSONLD: object) {
    return ([
      // General tags
      <meta key="description" name="description" content={description} />,
      <meta key="image" name="image" content={image} />,
      // Schema.org tags
      <script key="application/ld+json" type="application/ld+json">
        {JSON.stringify(JSONLD)}
      </script>,

      <meta key="google-site-verification" name="google-site-verification" content="4GIke6DKlXgvoQ1caBPxl2PHfw9Ul81M46TI3KhGwS8" />
    ])
  }
  renderNonBlogOgTags() {
    return ([
      <meta key="og:type" property="og:type" content="website" />,
    ])
  }
  renderBlogOgTags(date: string) {
    return ([
      <meta key="og:type" property="og:type" content="article" />,
      <meta key="og:article:published_time" property="og:article:published_time" content={date} />,
    ])
  }
  renderFacebook(url: string, title: string, description: string, image: string, siteName: string, facebookAppId: string) {
    return ([
      <meta key="og:url" property="og:url" content={url} />, // Important
      <meta key="og:title" property="og:title" content={title} />, // Important
      <meta key="og:description" property="og:description" content={description} />, // Somewhat important
      <meta key="og:image" property="og:image" content={image} />, // Important
      <meta key="og:site_name" property="og:site_name" content={siteName} />, // Eeh... can't hurt?
      <meta key="fb:app_id" property="fb:app_id" content={facebookAppId}/>
    ])
  }
  renderTwitter(title: string, description: string, image: string) {
    return ([
      <meta key="twitter:card" name="twitter:card" content="summary_large_image" />,
      // <meta name="twitter:creator" content={twitterUser} />,
      <meta key="twitter:title" name="twitter:title" content={title} />,
      <meta key="twitter:description" name="twitter:description" content={description} />,
      <meta key="twitter:image" name="twitter:image" content={image} />
    ])
  }
  render() {
    const { site, blogPost } = this.props
    const JSONLD = blogPost ? generateBlogJSONLD(blogPost) : generateSiteJSONLD(site)
    const { siteMetadata: { url, title, siteName, description, image, facebookAppId } } = site
    // http://ogp.me/#types
    if (blogPost) {
      return ([
        this.renderGeneral(description, image, JSONLD),
        this.renderBlogOgTags(blogPost.frontmatter.date),
        this.renderFacebook(blogPost.url, blogPost.frontmatter.title, blogPost.description, image, siteName, facebookAppId),
        this.renderTwitter(blogPost.frontmatter.title, blogPost.description, image),
      ])
    }
    return ([
      this.renderGeneral(description, image, JSONLD),
      this.renderNonBlogOgTags(),
      this.renderFacebook(url, title, description, image, siteName, facebookAppId),
      this.renderTwitter(title, description, image),
    ])
  }
}
