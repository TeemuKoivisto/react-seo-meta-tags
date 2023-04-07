import React from 'react'
import { graphql } from 'gatsby'

import styled from '../theme/styled'

import { Layout } from './Layout'
import { BlogPager } from './BlogPager'
import { BlogHeader } from './BlogHeader'
import SEO from './SEO'
import { ShareButtons } from './ShareButtons'

import { ISiteData, ISEOBlogPost, IBlogPostFrontmatter } from '../types/graphql'

const BlogPostTemplate = ({ data: { previous, next, site, markdownRemark }, location }) => {
  // const imgBaseUrl =
  //   process.env.NODE_ENV === 'development'
  //     ? this.props.location.origin
  //     : site.siteMetadata.imgSiteUrl
  const baseUrl =
    process.env.NODE_ENV === 'development' ? location.origin : site.siteMetadata.siteUrl
  const postUrl = '' // `${baseUrl}${markdownRemark.fields.slug}`
  /**
   * This is a super hacky looking method for picking some image incase the default sharp-image fails
   */
  const getImage = () => {
    // In the seoImage -query I'm trying to fetch an optimized image (I think the size was scaled into different sizes)
    // However at times this fails for no apparent reason so ehh, it kinda sucks ass
    // if (seoImage && seoImage.landscape) {
    //   return `${imgBaseUrl}${seoImage.landscape.fluid.src}`
    // }
    // // This is the image specified in the markdown images-block (and first one of that list)
    // // Not optimized so don't use 2 MB images
    // if (markdownRemark.frontmatter.images && markdownRemark.frontmatter.images.length > 0) {
    //   return `${imgBaseUrl}${markdownRemark.frontmatter.images[0].publicURL}`
    // }
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
    <Layout title={title} site={site} seoBlogPost={blogPost}>
      <article>
        <BlogHeader frontmatter={markdownRemark.frontmatter} excerpt={excerpt} />
        <section className="blog-post" dangerouslySetInnerHTML={{ __html: markdownRemark.html }} />
        {/* <BlogPager previous={previous?.fields} next={next?.fields} /> */}
        <ShareButtons url={postUrl} title={title} />
      </article>
    </Layout>
  )
}

export const Head = ({ data: { markdownRemark: post } }) => {
  return (
    <SEO
      title={post.frontmatter.title}
      description={post.frontmatter.description || post.excerpt}
    />
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($id: String!, $previousPostId: String, $nextPostId: String) {
    site {
      ...SiteData
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
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
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
