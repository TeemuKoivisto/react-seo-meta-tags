import * as React from 'react'
import { createWebsiteJSONLD, createBlogPostJSONLD } from './SchemaOrg'

import {
  ReactSEOMetaTagsProps,
  WebsiteProps,
  BlogPostProps,
  FacebookProps,
  TwitterProps,
  CombinedProps,
} from './types'

// interface ISEOProps {
//   site: ISiteData
//   blogPost?: IBlogPost
// }

// interface IBlogPost {
//   frontmatter: IBlogPostFrontmatter
//   url: string
//   description: string
//   seoImage: string
// }

/**
 * General SEO element that renders meta tags with react-helmet
 * Which is kinda shitty library, as it doesn't allow nested components inside of it.
 * So instead everything is rendered here as methods of this SEO. Sigh.
 */
export class ReactSEOMetaTags extends React.PureComponent<ReactSEOMetaTagsProps> {
  renderGeneral({ title, description, image }: CombinedProps<{}>) {
    return ([
      // General tags. OG and Twitter tags both fallback on these two incase description or image is not provided.
      // However by the way this library works, OG and Twitter tags are both extended from the same objects so
      // they'll always be defined or undefined.
      <title>{ title }</title>,
      description && <meta key="description" name="description" content={description} />,
      image && <meta key="image" name="image" content={image} />,
    ])
  }
  renderNonBlogOgTags() {
    return ([
      <meta key="og:type" property="og:type" content="website" />,
    ])
  }
  renderBlogOgTags() {
    return ([
      <meta key="og:type" property="og:type" content="article" />,
    ])
  }
  /**
   * https://developers.facebook.com/docs/sharing/webmasters/
   * @param props 
   */
  renderFacebook({ url, title, description, image, site: { siteName }, facebookAppId }: CombinedProps<FacebookProps>) {
    return ([
      url && <meta key="og:url" property="og:url" content={url} />, // Important
      <meta key="og:title" property="og:title" content={title} />, // Important
      description && <meta key="og:description" property="og:description" content={description} />, // Somewhat important
      // Facebook recommends 1200x630 size, ratio of 1.91:1
      // But 1200x1200 is also fine
      image && <meta key="og:image" property="og:image" content={image} />, // Important
      siteName && <meta key="og:site_name" property="og:site_name" content={siteName} />, // Eeh... can't hurt?
      facebookAppId && <meta key="fb:app_id" property="fb:app_id" content={facebookAppId}/>
    ])
  }
  renderFacebook2(url: string, title: string, description: string, image: string, siteName: string, facebookAppId: string) {
    return ([
      <meta key="og:url" property="og:url" content={url} />, // Important
      <meta key="og:title" property="og:title" content={title} />, // Important
      <meta key="og:description" property="og:description" content={description} />, // Somewhat important
      // Facebook recommends 1200x630 size, ratio of 1.91:1
      // But 1200x1200 is also fine
      <meta key="og:image" property="og:image" content={image} />, // Important
      <meta key="og:site_name" property="og:site_name" content={siteName} />, // Eeh... can't hurt?
      <meta key="fb:app_id" property="fb:app_id" content={facebookAppId}/>
    ])
  }
  renderTwitter({ title, description, image, twitterUser }: CombinedProps<TwitterProps>) {
    return ([
      image && <meta key="twitter:card" name="twitter:card" content="summary_large_image" />,
      twitterUser && <meta name="twitter:creator" content={twitterUser} />,
      <meta key="twitter:title" name="twitter:title" content={title} />,
      description && <meta key="twitter:description" name="twitter:description" content={description} />,
      image && <meta key="twitter:image" name="twitter:image" content={image} />
    ])
  }
  renderTwitter2(title: string, description: string, image: string) {
    return ([
      <meta key="twitter:card" name="twitter:card" content="summary_large_image" />,
      // <meta name="twitter:creator" content={twitterUser} />,
      <meta key="twitter:title" name="twitter:title" content={title} />,
      <meta key="twitter:description" name="twitter:description" content={description} />,
      <meta key="twitter:image" name="twitter:image" content={image} />
    ])
  }
  renderBlogPostSEO({ website, blogPost, facebookProps, twitterProps }: ReactSEOMetaTagsProps) {
    return (
      this.renderGeneral({ ...website, ...blogPost }),
      <script key="application/ld+json" type="application/ld+json">
        { createBlogPostJSONLD({ ...website, ...blogPost })}
      </script>,
      this.renderBlogOgTags(),
      this.renderFacebook({ ...website, ...blogPost, ...facebookProps }),
      this.renderTwitter({ ...website, ...blogPost, ...twitterProps }),
    )
  }
  renderWebsiteSEO({ website, facebookProps, twitterProps }: ReactSEOMetaTagsProps) {
    return (
        this.renderGeneral({ ...website }),
        <script key="application/ld+json" type="application/ld+json">
          { createWebsiteJSONLD(website)}
        </script>,
        this.renderNonBlogOgTags(),
        this.renderFacebook({ ...website, ...facebookProps }),
        this.renderTwitter({ ...website, ...twitterProps })
    )
  }
  render() {
    // http://ogp.me/#types
    if (this.props.blogPost) {
      return this.renderBlogPostSEO(this.props)
    }
    return this.renderWebsiteSEO(this.props)
  }
}
