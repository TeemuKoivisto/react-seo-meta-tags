import React from 'react'
import { graphql } from 'gatsby'

import styled from '../theme/styled'

import { DefaultLayout } from '../layouts/DefaultLayout'
import { BlogPager } from '../components/BlogPager'
import { BlogHeader } from '../components/BlogHeader'
import { ShareButtons } from '../components/ShareButtons'

import { ISiteData, ISEOBlogPost, IBlogPostFrontmatter } from '../types/graphql'

// There is a lot of other stuff in props, provided by Gatsby, that I'm not typing here
// since it would quite a lot of work.
interface IProps {
  data: {
    site: ISiteData
    markdownRemark: {
      html: any
      excerpt: string
      frontmatter: IBlogPostFrontmatter
      fields: {
        slug: string
      }
    }
    seoImage: {
      landscape: {
        fluid: {
          src: string
        }
      }
    }
  }
  pageContext: {
    slug: string
    previous: {
      slug?: string
      title?: string
      datePublished?: string
    }
    next: {
      slug?: string
      title?: string
      datePublished?: string
    }
  }
  pathContext: {
    slug: string
    previous: {
      slug?: string
      title?: string
      datePublished?: string
    }
    next: {
      slug?: string
      title?: string
      datePublished?: string
    }
  }
  '*': string
  children: any
  location: any // lots of stuff
  navigate: (to: any, options: any) => void
  pageResources: {
    component: () => void
    page: any
  }
  path: string
}

export default class BlogPostTemplate extends React.PureComponent<IProps> {
  render() {
    const {
      data: { site, markdownRemark, seoImage },
      pageContext
    } = this.props
    const imgBaseUrl =
      process.env.NODE_ENV === 'development'
        ? this.props.location.origin
        : site.siteMetadata.imgSiteUrl
    const baseUrl =
      process.env.NODE_ENV === 'development'
        ? this.props.location.origin
        : site.siteMetadata.siteUrl
    const postUrl = `${baseUrl}${markdownRemark.fields.slug}`
    /**
     * This is a super hacky looking method for picking some image incase the default sharp-image fails
     */
    const getImage = () => {
      // In the seoImage -query I'm trying to fetch an optimized image (I think the size was scaled into different sizes)
      // However at times this fails for no apparent reason so ehh, it kinda sucks ass
      if (seoImage && seoImage.landscape) {
        return `${imgBaseUrl}${seoImage.landscape.fluid.src}`
      }
      // This is the image specified in the markdown images-block (and first one of that list)
      // Not optimized so don't use 2 MB images
      if (markdownRemark.frontmatter.images && markdownRemark.frontmatter.images.length > 0) {
        return `${imgBaseUrl}${markdownRemark.frontmatter.images[0].publicURL}`
      }
      // If all else fails use the site image
      return site.siteMetadata.image
    }
    const image = getImage()
    // This abomination is the combination of siteMetadata from gatsby-config.js,
    // data from the markdown file this blog-post is generated from and the beautifully
    // mushed together URLs of the blog-post & its image so that in development it picks up
    // the localhost address and in production the canonical URL defined in gatsby-config.js
    const blogPost = {
      ...site.siteMetadata,
      ...markdownRemark.frontmatter,
      ...{
        image,
        publisher: site.siteMetadata.organization
      }
    } as ISEOBlogPost
    const title = markdownRemark.frontmatter.title
    // Use markdown's description field if provided, otherwise just 100 first characters.
    const excerpt = markdownRemark.frontmatter.description || markdownRemark.excerpt
    return (
      <DefaultLayout title={title} seoBlogPost={blogPost}>
        <BlogContainer>
          <BlogHeader frontmatter={markdownRemark.frontmatter} excerpt={excerpt} />
          <section
            className="blog-post"
            dangerouslySetInnerHTML={{ __html: markdownRemark.html }}
          />
          <BlogPager previous={pageContext.previous} next={pageContext.next} />
          <ShareButtons url={postUrl} title={title} />
        </BlogContainer>
      </DefaultLayout>
    )
  }
}

const BlogContainer = styled.div``

export const pageQuery = graphql`
  query BlogPostBySlug($imageRegex: String!, $slug: String!) {
    site {
      ...SiteData
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      frontmatter {
        title
        datePublished(formatString: "YYYY-MM-DD")
        dateModified(formatString: "YYYY-MM-DD")
        tags
        description
        imageAlt
        slug
        images {
          publicURL
        }
      }
      fields {
        slug
      }
    }
    seoImage: file(relativePath: { regex: $imageRegex }) {
      landscape: childImageSharp {
        fluid(maxWidth: 1000) {
          src
        }
      }
    }
  }
`
