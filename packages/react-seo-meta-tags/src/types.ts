import * as React from 'react'

export interface ReactSEOMetaTagsProps {
  render?: (el: React.ReactNode) => React.ReactNode
  website?: WebsiteProps
  breadcrumb?: BreadcrumbList
  organization?: OrganizationProps
  blogPost?: BlogPostProps
  facebook?: FacebookProps
  twitter?: TwitterProps
}

/**
 * https://schema.org/WebSite
 */
export interface WebsiteProps {
  /**
   * The URL of this page (eg https://google.com/about)
   */
  url?: string
  /**
   * Maximum 70 characters.
   */
  title: string
  /**
   * The original publication date. ISO 8601 timestamp eg "2019-10-06T13:56:03.123Z"
   * Don't know how useful for random webpages. Add it at least for blog posts.
   */
  datePublished?: string
  /**
   * Maximum 200 characters.
   */
  description?: string
  /**
   * Default "en-US" https://en.wikipedia.org/wiki/IETF_language_tag and https://datahub.io/core/language-codes
   */
  language?: string
  /**
   * URL to the image, PNG, JPEG, or GIF recommended.
   */
  image?: string
  imageAlt?: string
  /**
   * Possibly redundant property. But at least bots can scrape your email and that's fun right? :)
   */
  author?: PersonProps
  site?: {
    /**
     * "If your object is part of a larger web site, the name which should be displayed for the overall site. e.g., "IMDb"."
     * At least Telegram uses this as gray text above the title when sharing links.
     */
    siteName?: string
    /**
     * If your website has a search functionality, enter the URL with parameter here eg "https://www.google.com/search?q="
     */
    searchUrl?: string
  }
}

/**
 * https://developers.facebook.com/docs/sharing/webmasters/
 * http://ogp.me/
 */
export interface FacebookProps {
  /**
   * The title of your article without any branding such as your site name.
   */
  title?: string
  /**
   * A brief description of the content, usually between 2 and 4 sentences.
   */
  description?: string
  /**
   * Used for og:locale. Default "en-US"
   */
  language?: string
  /**
   * Facebook recommends 1200x630 size, ratio of 1.91:1. PNG, JPEG, or GIF.
   * But if you want your image to be displayed as a smaller image (aka thumbnail, similar to 'summary' Twitter card),
   * your image should be smaller than 400x209 and preferably with a ratio of 1:1. Unless your image can be cropped
   * into a 1:1 box without making it look bad. So you probably want to use something like 200x200.
   * Note the "minimum size constraint of 200px by 200px".
   */
  image?: string
  imageAlt?: string
  /**
   * "A URL to a video file that complements this object."
   */
  video?: string
  /**
   * "A URL to an audio file to accompany this object."
   */
  audio?: string
  /**
   * "Insights lets you view analytics for traffic to your site from Facebook."
   */
  facebookAppId?: string
}

/**
 * https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/markup.html
 */
export interface TwitterProps {
  /**
   * Title of content (max 70 characters). Fallback: og:title.
   */
  title?: string
  /**
   * Description of content (maximum 200 characters). Fallback: og:description.
   */
  description?: string
  /**
   * Twitter card image, optimal ratio 1.91:1. Recommended: 1200x628. PNG, JPEG, or GIF. Fallback: og:image.
   */
  image?: string
  /**
   * Alt for the image. Fallback: og:image:alt.
   */
  imageAlt?: string
  /**
   * So since I saw that the large image looked dumb if you are using your faceshot as the image, I added the smaller 'summary'
   * type as an option. It should be in 1:1 scale. Also there exists 'player' and 'app' types but since I'm not using those,
   * I'm not going to spend my precious time figuring out how they work for now.
   * @default 'summary_large_image'
   */
  cardType?: 'summary_large_image' | 'summary'
  /**
   * @username of content creator.
   */
  twitterUser?: string
  /**
   * @username of the site eg @nytimes
   */
  twitterSite?: string
}

/**
 * https://schema.org/BlogPosting
 */
export interface BlogPostProps {
  /**
   * The canonical URL for your page. This should be the undecorated URL, without session variables,
   * user identifying parameters, or counters.
   */
  url?: string
  /**
   * Title of the post. Max 70 characters.
   */
  title: string
  description?: string // Should be a short description about the topic, <=200 words. Mainly for SEO purposes.
  image: string // You should add this. Just use the same image as og/twitter eg 1200x630 with 1.91:1 ratio in PNG, JPEG, or GIF.
  imageAlt?: string // Some SEO tools really want this so it's probably wise to add it
  datePublished?: string // The original publication date. Don't change arbitrarily, Google might downrank you.
  dateModified?: string // Google prefers recent content in search results and also users are more likely to click a recent article
  tags?: string[]
  /**
   * Technically either Person or Organization, but since it doesn't make any sense to not to credit this content to a human, use person.
   * From schema.org:
   * "Please note that author is special in that HTML 5 provides a special mechanism for indicating authorship
   * via the rel tag. That is equivalent to this and may be used interchangeably."
   * Which means.. something.
   */
  author?: PersonProps
  /**
   * You should add this since otherwise Google's structured-data tool will complain...
   * However https://webmasters.stackexchange.com/questions/110332/personal-blog-using-structured-data-fails-validation-on-publisher
   */
  publisher?: OrganizationProps
  site?: {
    /**
     * "If your object is part of a larger web site, the name which should be displayed for the overall site. e.g., "IMDb"."
     * Used for og:site_name
     */
    siteName?: string
  }
}

/**
 * https://schema.org/BreadcrumbList
 */
export type BreadcrumbList = BreadcrumbProps[]

export interface BreadcrumbProps {
  url: string
  title: string
  image?: string
}

/**
 * https://schema.org/Person
 */
export interface PersonProps {
  email?: string
  name?: string
  image?: string
}

/**
 * https://schema.org/Organization
 */
export interface OrganizationProps {
  /**
   * @default "Organization"
   * You could use eg "Corporation"
   */
  '@type'?: string
  description?: string
  /**
   * @example "Google"
   */
  name: string
  /**
   * @example "Google Inc"
   */
  legalName?: string
  /**
   *  URL to the logo image.
   */
  logo: string
  /**
   * List of other webpages referencing this organization, eg Wikipedia, Facebook, Twitter, Instagram etc.
   * Will show these sites alongside your website in Google search results and probably boost your SEO rank too.
   */
  sameAs?: string[]
  /**
   * URL to the organization
   * @example "https://abc.xyz"
   */
  url: string
  /**
   * You can nest as many organizations as you'd like, dunno how useful it's
   */
  parentOrganization?: OrganizationProps
}

export type CombinedProps<T> = (WebsiteProps | BlogPostProps) & T
