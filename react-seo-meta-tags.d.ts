declare module 'react-seo-meta-tags' {
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
    url?: string // The URL of this page (eg https://google.com/about)
    title: string // Maximum 70 characters.
    // The original publication date. ISO 8601 timestamp eg "2019-10-06T13:56:03.123Z"
    // Don't know how useful for random webpages. Add it at least for blog posts.
    datePublished?: string
    description?: string // Maximum 200 characters.
    language?: string // Default "en-US" https://en.wikipedia.org/wiki/IETF_language_tag and https://datahub.io/core/language-codes
    image?: string // URL to the image, PNG, JPEG, or GIF recommended.
    imageAlt?: string // Alt for the image
    // Possibly redundant property. But at least bots can scrape your email and that's fun right? :)
    author?: PersonProps
    site?: {
      // "If your object is part of a larger web site, the name which should be displayed for the overall site. e.g., "IMDb"."
      // At least Telegram uses this as gray text above the title when sharing links.
      siteName?: string
      // If your website has a search functionality, enter the URL with parameter here eg "https://www.google.com/search?q="
      searchUrl?: string
    }
  }
  
  /**
   * https://developers.facebook.com/docs/sharing/webmasters/
   * http://ogp.me/
   */
  export interface FacebookProps {
    title?: string // The title of your article without any branding such as your site name.
    description?: string // A brief description of the content, usually between 2 and 4 sentences.
    language?: string // Used for og:locale. Default "en-US"
    // Facebook recommends 1200x630 size, ratio of 1.91:1. PNG, JPEG, or GIF.
    // But if you want your image to be displayed as a smaller image (aka thumbnail, similar to 'summary' Twitter card),
    // your image should be smaller than 400x209 and preferably with a ratio of 1:1. Unless your image can be cropped
    // into a 1:1 box without making it look bad. So you probably want to use something like 200x200.
    // Note the "minimum size constraint of 200px by 200px".
    image?: string
    imageAlt?: string // Alt for the image
    video?: string // "A URL to a video file that complements this object."
    audio?: string // "A URL to an audio file to accompany this object."
    facebookAppId?: string // "Insights lets you view analytics for traffic to your site from Facebook."
  }
  
  /**
   * https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/markup.html
   */
  export interface TwitterProps {
    title?: string // Title of content (max 70 characters). Fallback: og:title.
    description?: string // Description of content (maximum 200 characters). Fallback: og:description.
    image?: string // Twitter card image, optimal ratio 1.91:1. Recommended: 1200x628. PNG, JPEG, or GIF. Fallback: og:image.
    imageAlt?: string // Alt for the image. Fallback: og:image:alt.
    // So since I saw that the large image looked dumb if you are using your faceshot as the image, I added the smaller 'summary'
    // type as an option. It should be in 1:1 scale. Also there exists 'player' and 'app' types but since I'm not using those,
    // I'm not going to spend my precious time figuring out how they work for now.
    cardType?: 'summary_large_image' | 'summary' // Default 'summary_large_image'
    twitterUser?: string // @username of content creator.
    twitterSite?: string // @username of the site eg @nytimes
  }
  
  /**
   * https://schema.org/BlogPosting
   */
  export interface BlogPostProps {
    // The canonical URL for your page. This should be the undecorated URL, without session
    // variables, user identifying parameters, or counters.
    url?: string
    title: string // Title of the post. Max 70 characters.
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
      // "If your object is part of a larger web site, the name which should be displayed for the overall site. e.g., "IMDb"."
      // Used for og:site_name
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
    '@type'?: string // Default 'Organization'. You could use eg 'Corporation'.
    description?: string
    name: string // Eg "Google"
    legalName?: string // Eg "Google Inc"
    logo: string // URL to the logo image.
    // List of other webpages referencing this organization, eg Wikipedia, Facebook, Twitter, Instagram etc.
    // Will show these sites alongside your website in Google search results and probably boost your SEO rank too.
    sameAs?: string[]
    url: string // URL to the organization, eg "https://abc.xyz"
    parentOrganization?: OrganizationProps // You can nest as many organizations as you'd like, dunno how useful it's
  }
  
  export type CombinedProps<T> = (WebsiteProps | BlogPostProps) & T  

  export class ReactSEOMetaTags extends React.PureComponent<ReactSEOMetaTagsProps> {}
  export default ReactSEOMetaTags
}
