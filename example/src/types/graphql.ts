
export interface ISiteData {
  siteMetadata: {
    title: string
    description: string
    image: string
    facebookAppId: string
    twitterUser: string
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

export interface IBlogPostFrontmatter {
  title: string
  datePublished: string // Can be converted into date, which you can actually do in the graphql query
  dateModified: string // Eg. 2018-12-02
  description: string // Should be a short description about the topic, <=200 words. Mainly for SEO purposes.
  tags: string[]
  images: IImage[]
}

export interface IImage {
  publicURL: string
}

export interface INode {
  node: {
    frontmatter: IBlogPostFrontmatter
    fields: {
      slug: string
    }
  }
}
