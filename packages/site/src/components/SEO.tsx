/**
 * SEO component that queries for data with
 * Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from 'react'
import ReactSEOMetaTags from 'react-seo-meta-tags'
import { useStaticQuery, graphql } from 'gatsby'

import { BlogPost, SiteData } from '../types/graphql'

interface Props {
  title?: string
  description?: string
  blogPost?: BlogPost
  children?: React.ReactNode
}

const SEO = ({ description, title, blogPost, children }: Props) => {
  const {
    site: { siteMetadata }
  } = useStaticQuery<{ site: SiteData }>(
    graphql`
      query {
        site {
          ...SiteData
        }
      }
    `
  )
  const website = {
    ...siteMetadata,
    description,
    title
  } as any
  const post = {
    ...siteMetadata,
    ...blogPost?.frontmatter,
    image: 'poop',
    imageAlt: 'poop2'
  } as any
  return (
    <>
      <ReactSEOMetaTags
        website={website}
        blogPost={post}
        facebook={{ facebookAppId: siteMetadata.social.facebookAppId }}
        twitter={{ twitterUser: siteMetadata.social.twitter }}
        organization={siteMetadata.organization}
      />

      {/* <title>{defaultTitle ? `${title} | ${defaultTitle}` : title}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={site.siteMetadata?.social?.twitter || ``} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} /> */}
      {children}
    </>
  )
}

export default SEO
