export interface SiteData {
  siteMetadata: {
    title: string
    description: string
    image: string
    social: {
      facebookAppId: string
      twitter: string
    }
    imgSiteUrl: string
    siteUrl: string
    site: {
      siteName: string
    }
    author: {
      name: string
      image: string
    }
    organization: {
      name: string
      logo: string
      url: string
    }
  }
}

export interface ISEOBlogPost {
  // url: string
  image: string
  title: string
  datePublished: string
  dateModified: string
  description: string
  tags: string[]
  facebookAppId: string
  twitterUser: string
  siteUrl: string
  site: {
    siteName: string
  }
  author: {
    name: string
    image: string
  }
  publisher: {
    name: string
    logo: string
    url: string
  }
}

export interface IBlogPosts {
  totalCount: number
  edges: INode[]
}
/**
 * @example
  {
    "id": "c61756ed-81a1-537a-8552-b231de1c77d3",
    "excerpt": "This is another blog post, just to show that the react-seo-meta-tags work.",
    "html": "<p>This is another blog post, just to show that the react-seo-meta-tags work.</p>",
    "frontmatter": {
      "title": "Another post",
      "datePublished": "2020-01-21",
      "dateModified": "2020-01-21",
      "tags": [
        "seo",
        "open-graph",
        "react-seo-meta-tags"
      ],
      "description": "I'm another post, which is quite something. Yes this description is quite bad and it probably should include couple keywords such as awesome, SEO, meta-tags, open-graph, facebook, twitter",
      "imageAlt": null,
      "slug": "this-is-a-seo-optimized-slug",
      "images": null
    }
  }
 */
export interface BlogPost {
  id: string
  excerpt: string
  html: string
  frontmatter: Frontmatter
}
export interface Frontmatter {
  title: string
  datePublished: string
  dateModified: string
  description: string
  tags: string[] | null
  images: IImage[] | null
  imageAlt: string | null
  slug: string
}

export interface IImage {
  publicURL: string
}

export interface INode {
  node: {
    frontmatter: Frontmatter
    fields: {
      slug: string
    }
  }
}
