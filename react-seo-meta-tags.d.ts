declare module 'react-seo-meta-tags' {
  export interface ReactSEOMetaTagsProps {
    render?: (el: React.ReactNode) => React.ReactNode
    website?: WebsiteProps
    blogPost?: BlogPostProps
    facebook?: FacebookProps
    twitter?: TwitterProps
  }
  
  export interface WebsiteProps {
    url?: string // The URL of this page (eg https://google.com/about)
    title: string // Maximum 70 characters.
    description?: string // Maximum 200 characters.
    image?: string // URL to the image, PNG, JPEG, or GIF recommended.
    author?: {
      name: string
      schemaType: string // 'Person', etc
    }
    site?: {
      siteName?: string // "If your object is part of a larger web site, the name which should be displayed for the overall site. e.g., "IMDb"."
      canonicalUrl?: string // The index URL of the website (eg https://google.com), used for BlogPosting JSON-LD schema.
    }
  }
  
  /**
   * https://developers.facebook.com/docs/sharing/webmasters/
   * http://ogp.me/
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
    image?: string // Twitter card image, optimal ratio 1.91:1. Recommended: 1200x628. PNG, JPEG, or GIF. Fallback: og:image.
    twitterUser?: string // @username of content creator.
  }
  
  export interface BlogPostProps {
    url?: string // The canonical URL for your page. This should be the undecorated URL, without session variables, user identifying parameters, or counters.
    title: string // Title of the post. Max 70 characters.
    description?: string // Should be a short description about the topic, <=200 words. Mainly for SEO purposes.
    image?: string // Based on other SEO tags, an image of 1200x628 with 1.91:1 ratio in PNG, JPEG, or GIF is the optimum.
    datePublished?: string // The original publication date. Don't change arbitrarily, Google might downrank you.
    dateModified?: string // Google prefers recent content in search results and also users are more likely to click a recent article
    tags?: string[]
    author?: {
      name: string
      schemaType: string // 'Person', etc
    }
    organization?: {
      name: string // Name of the organization (Google Inc.) or the owner of the website (Larry Page).
      logo?: string // URL to the logo image.
      url: string // URL of the organization eg. https://google.com
    }
  }
  
  export class ReactSEOMetaTags extends React.PureComponent<ReactSEOMetaTagsProps> {}
  export default ReactSEOMetaTags
}
