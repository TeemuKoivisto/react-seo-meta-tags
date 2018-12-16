export interface ReactSEOMetaTagsProps {
  website: WebsiteProps
  blogPost?: BlogPostProps
  facebookProps?: FacebookProps
  twitterProps?: TwitterProps
}

export interface WebsiteProps {
  url?: string
  title: string
  description?: string
  image?: string
  author?: {
    name: string
    schemaType: 'Person'
  }
  site: {
    siteName?: string
    canonicalUrl?: string
  }
}

/**
 * https://developers.facebook.com/docs/sharing/webmasters/
 */
export interface FacebookProps {
  title: string // The title of your article without any branding such as your site name.
  description?: string // A brief description of the content, usually between 2 and 4 sentences.
  image?: string // Facebook recommends 1200x630 size, ratio of 1.91:1. PNG, JPEG, or GIF.
  facebookAppId?: string // "Insights lets you view analytics for traffic to your site from Facebook."
}

/**
 * https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/markup.html
 */
export interface TwitterProps {
  title: string // Title of content (max 70 characters). Fallback: og:title.
  description?: string // Description of content (maximum 200 characters). Fallback: og:description.
  image?: string // Twitter card image, optimal ratio 1.91:1. Recommended: 1200 x 628. PNG, JPEG, or GIF. Fallback: og:image.
  twitterUser?: string // @username of content creator.
}

export interface BlogPostProps {
  url?: string // The canonical URL for your page. This should be the undecorated URL, without session variables, user identifying parameters, or counters.
  title: string
  description?: string // Should be a short description about the topic, <=200 words. Mainly for SEO purposes.
  image?: string // Based on other SEO tags, an image of 1200x628 with 1.91:1 ratio in PNG, JPEG, or GIF is the optimum.
  datePublished?: string
  dateModified?: string
  tags?: string[]
  author?: {
    name: string
    schemaType: 'Person'
  }
  organization?: {
    name: string
    logo?: string
    url: string
  }
}

export type CombinedProps<T> = WebsiteProps & BlogPostProps & T
