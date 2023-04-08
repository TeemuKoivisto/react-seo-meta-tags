import * as React from 'react'

import {
  generateWebsite,
  generateBreadcrumbList,
  generateBlogPosting,
  generateOrganization
} from './SchemaOrg'

import {
  ReactSEOMetaTagsProps,
  WebsiteProps,
  BlogPostProps,
  FacebookProps,
  TwitterProps,
  CombinedProps
} from './types'

/**
 * Compact and comprehensive SEO meta tag component for general web pages and blog articles.
 * Includes basic meta tags as well as Facebook and Twitter tags and JSON-LD schema.
 * Originally designed for a Gatsby blog. Can be used in conjunction with react-helmet.
 */
export class ReactSEOMetaTags extends React.PureComponent<ReactSEOMetaTagsProps> {
  /**
   * General tags. OG and Twitter tags both fallback on these three incase description or image is not provided.
   * However by the way this library works, OG and Twitter tags are both extended from the same objects so
   * they'll always be defined or undefined.
   * @param props
   */
  renderGeneral({ title, description, image }: CombinedProps<Record<string, any>>) {
    return [
      <title key="title">{title}</title>,
      description && <meta key="description" name="description" content={description} />,
      image && <meta key="image" name="image" content={image} />
    ]
  }
  renderNonBlogOgTags() {
    return [<meta key="og:type" property="og:type" content="website" />]
  }
  renderBlogOgTags({ datePublished, dateModified }: BlogPostProps) {
    return [
      <meta key="og:type" property="og:type" content="article" />,
      datePublished && (
        <meta
          key="article:published_time"
          property="article:published_time"
          content={datePublished}
        />
      ),
      dateModified && (
        <meta key="article:modified_time" property="article:modified_time" content={dateModified} />
      )
    ]
  }
  /**
   * https://developers.facebook.com/docs/sharing/webmasters/
   * http://ogp.me/
   * @param props
   */
  renderFacebook(props: CombinedProps<FacebookProps>) {
    const {
      url,
      title,
      description,
      image,
      imageAlt,
      video,
      audio,
      site,
      language,
      facebookAppId
    } = props
    return [
      url && <meta key="og:url" property="og:url" content={url} />, // Important
      <meta key="og:locale" property="og:locale" content={language || 'en-US'} />,
      <meta key="og:title" property="og:title" content={title} />, // Important
      description && <meta key="og:description" property="og:description" content={description} />, // Somewhat important
      // Facebook recommends 1200x630 size, ratio of 1.91:1 but 1200x1200 is also fine
      image && <meta key="og:image" property="og:image" content={image} />, // Important
      imageAlt && <meta key="og:image:alt" property="og:image:alt" content={imageAlt} />, // For visually impaired people
      video && <meta key="og:video" property="og:video" content={video} />,
      audio && <meta key="og:audio" property="og:audio" content={audio} />,
      site && site.siteName && (
        <meta key="og:site_name" property="og:site_name" content={site!.siteName} />
      ), // Eeh... can't hurt?
      facebookAppId && <meta key="fb:app_id" property="fb:app_id" content={facebookAppId} />
    ]
  }
  renderTwitter(props: CombinedProps<TwitterProps>) {
    const { title, description, image, imageAlt, cardType, twitterUser, twitterSite } = props
    return [
      image && (
        <meta key="twitter:card" name="twitter:card" content={cardType || 'summary_large_image'} />
      ),
      twitterUser && <meta key="twitter:creator" name="twitter:creator" content={twitterUser} />,
      twitterSite && <meta key="twitter:site" name="twitter:site" content={twitterSite} />,
      <meta key="twitter:title" name="twitter:title" content={title} />,
      description && (
        <meta key="twitter:description" name="twitter:description" content={description} />
      ),
      image && <meta key="twitter:image" name="twitter:image" content={image} />,
      imageAlt && <meta key="twitter:image:alt" name="twitter:image:alt" content={imageAlt} />
    ]
  }
  renderBlogPostSEO(
    website: WebsiteProps | undefined,
    blogPost: BlogPostProps,
    props: Omit<ReactSEOMetaTagsProps, 'website' | 'blogPost'>
  ) {
    const { breadcrumb, facebook, twitter, organization } = props
    return [
      this.renderGeneral({ ...website, ...blogPost }),
      <script key="application/ld+json" type="application/ld+json">
        {JSON.stringify(
          [
            generateWebsite(blogPost),
            breadcrumb && generateBreadcrumbList(breadcrumb),
            generateBlogPosting(blogPost),
            organization && generateOrganization(organization)
          ].filter(obj => obj !== undefined && obj !== null)
        )}
      </script>,
      this.renderBlogOgTags(blogPost),
      this.renderFacebook({ ...website, ...blogPost, ...facebook }),
      this.renderTwitter({ ...website, ...blogPost, ...twitter })
    ]
  }
  renderWebsiteSEO(
    website: WebsiteProps,
    props: Omit<ReactSEOMetaTagsProps, 'website' | 'blogPost'>
  ) {
    const { facebook, breadcrumb, twitter, organization } = props
    return [
      this.renderGeneral(website),
      <script key="application/ld+json" type="application/ld+json">
        {
          /**
           * Stringifying eliminates the undefined values, which keeps the JSON-LD somewhat tidy.
           * Some empty objects might remain, but that shouldn't be a problem.
           */
          JSON.stringify(
            [
              generateWebsite(website),
              breadcrumb && generateBreadcrumbList(breadcrumb),
              organization && generateOrganization(organization)
            ].filter(obj => obj !== undefined && obj !== null)
          )
        }
      </script>,
      this.renderNonBlogOgTags(),
      this.renderFacebook({ ...website, ...facebook }),
      this.renderTwitter({ ...website, ...twitter })
    ]
  }
  render() {
    let el: React.ReactNode
    const { website, blogPost, render, ...rest } = this.props
    if (blogPost) {
      el = this.renderBlogPostSEO(website, blogPost, rest)
    } else if (website) {
      el = this.renderWebsiteSEO(website, rest)
    }
    if (render) {
      return render(el)
    }
    return el
  }
}
