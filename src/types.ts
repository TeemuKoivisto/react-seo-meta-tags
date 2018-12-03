
export interface ISiteData {
  siteMetadata: {
    url: string
    title: string
    siteName: string
    description: string
    image: string
    facebookAppId: string
    disqusShortname: string
  }
}

export interface IBlogPosts {
  totalCount: number
  edges: INode[]
}

export interface IBlogPostFrontmatter {
  title: string
  date: string // Can be converted into date, which you can actually do in the graphql query (parseDate or something)
  tags: string[]
  imagePath: string
}

export interface INode {
  node: {
    frontmatter: IBlogPostFrontmatter
    fields: {
      slug: string
    }
  }
}
