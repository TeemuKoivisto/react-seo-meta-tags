import * as React from 'react'
import {
  generateWebsite,
  generateBreadcrumbList,
  generateBlogPosting,
  generateOrganization,
} from './SchemaOrg'

import {
  ReactSEOMetaTagsProps,
  WebsiteProps,
  BlogPostProps,
  FacebookProps,
  TwitterProps,
  CombinedProps,
} from './types'

/**
 * General SEO element that renders meta tags with react-helmet
 * Which is kinda shitty library, as it doesn't allow nested components inside of it.
 * So instead everything is rendered here as methods of this SEO. Sigh.
 */
export class ReactSEOMetaTags extends React.PureComponent<ReactSEOMetaTagsProps> {
  /**
   * General tags. OG and Twitter tags both fallback on these three incase description or image is not provided.
   * However by the way this library works, OG and Twitter tags are both extended from the same objects so
   * they'll always be defined or undefined.
   * @param props
   */
  renderGeneral({ title, description, image }: CombinedProps<{}>) {
    return ([
      <title key="title">{ title }</title>,
      description && <meta key="description" name="description" content={description} />,
      image && <meta key="image" name="image" content={image} />
    ])
  }
  renderNonBlogOgTags() {
    return ([
      <meta key="og:type" property="og:type" content="website" />,
    ])
  }
  renderBlogOgTags({ datePublished, dateModified } : BlogPostProps) {
    return ([
      <meta key="og:type" property="og:type" content="article" />,
      datePublished && <meta key="article:published_time" property="article:published_time" content={datePublished} />,
      dateModified && <meta key="article:modified_time" property="article:modified_time" content={dateModified} />,
    ])
  }
  /**
   * https://developers.facebook.com/docs/sharing/webmasters/
   * http://ogp.me/
   * @param props
   */
  renderFacebook({ url, title, description, image, site, language = 'en-US', facebookAppId }: CombinedProps<FacebookProps>) {
    return ([
      url && <meta key="og:url" property="og:url" content={url} />, // Important
      <meta property="og:locale" content={language}/>,
      <meta key="og:title" property="og:title" content={title} />, // Important
      description && <meta key="og:description" property="og:description" content={description} />, // Somewhat important
      // Facebook recommends 1200x630 size, ratio of 1.91:1 but 1200x1200 is also fine
      image && <meta key="og:image" property="og:image" content={image} />, // Important
      site && site.siteName && <meta key="og:site_name" property="og:site_name" content={site!.siteName} />, // Eeh... can't hurt?
      facebookAppId && <meta key="fb:app_id" property="fb:app_id" content={facebookAppId}/>
    ])
  }
  renderTwitter({ title, description, image, twitterUser }: CombinedProps<TwitterProps>) {
    return ([
      image && <meta key="twitter:card" name="twitter:card" content="summary_large_image" />,
      twitterUser && <meta key="twitter:creator" name="twitter:creator" content={twitterUser} />,
      <meta key="twitter:title" name="twitter:title" content={title} />,
      description && <meta key="twitter:description" name="twitter:description" content={description} />,
      image && <meta key="twitter:image" name="twitter:image" content={image} />
    ])
  }
  renderBlogPostSEO(props: ReactSEOMetaTagsProps) {
    const { website, breadcrumb, facebook, twitter, organization } = props
    const blogPost = props.blogPost as BlogPostProps
    return ([
      this.renderGeneral({ ...website, ...blogPost }),
      <script key="application/ld+json" type="application/ld+json">
        {
          JSON.stringify([
            generateWebsite(blogPost),
            breadcrumb && generateBreadcrumbList(breadcrumb),
            generateBlogPosting(blogPost),
            organization && generateOrganization(organization),
          ])
        }
      </script>,
      this.renderBlogOgTags(blogPost),
      this.renderFacebook({ ...website, ...blogPost, ...facebook }),
      this.renderTwitter({ ...website, ...blogPost, ...twitter })
    ])
  }
  renderWebsiteSEO(props: ReactSEOMetaTagsProps) {
    const { facebook, breadcrumb, twitter, organization } = props
    const website = props.website as WebsiteProps
    return ([
      this.renderGeneral(website),
      <script key="application/ld+json" type="application/ld+json">
        {
        /**
         * Stringifying eliminates the undefined values, which keeps the JSON-LD somewhat tidy.
         * Some empty objects might remain, but that shouldn't be a problem.
         */
          JSON.stringify([
            generateWebsite(website),
            breadcrumb && generateBreadcrumbList(breadcrumb),
            organization && generateOrganization(organization),
          ])
        }
      </script>,
      this.renderNonBlogOgTags(),
      this.renderFacebook({ ...website, ...facebook }),
      this.renderTwitter({ ...website, ...twitter })
    ])
  }
  render() {
    let el: React.ReactNode
    if (this.props.blogPost) {
      el = this.renderBlogPostSEO(this.props)
    } else if (this.props.website) {
      el = this.renderWebsiteSEO(this.props)
    }
    if (this.props.render) {
      return this.props.render(el)
    }
    return el
  }
}
