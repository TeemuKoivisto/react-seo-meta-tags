import * as React from 'react'
import { Link, graphql } from 'gatsby'
import styled from 'styled-components'

import { Layout } from '../components/Layout'
import SEO from '../components/SEO'

import { SiteData } from '../types/graphql'

interface Props {
  data: {
    site: SiteData
    allMarkdownRemark: {
      nodes: any[]
    }
  }
  location: any
}

const BlogIndex = ({ data, location }: Props) => {
  const site = data.site
  const posts = data.allMarkdownRemark.nodes

  if (posts.length === 0) {
    return (
      <Layout site={site}>
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the directory you specified
          for the "gatsby-source-filesystem" plugin in gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout site={data.site}>
      <div>
        <h1>My blog posts</h1>
        <List>
          {posts.map(post => {
            const title = post.frontmatter.title || post.fields.slug
            return (
              <li key={post.fields.slug}>
                <article className="post-list-item" itemScope itemType="http://schema.org/Article">
                  <header>
                    <h2>
                      <Link to={post.fields.slug} itemProp="url">
                        <span itemProp="headline">{title}</span>
                      </Link>
                    </h2>
                    <small>{post.frontmatter.datePublished}</small>
                  </header>
                  <section>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: post.frontmatter.description || post.excerpt
                      }}
                      itemProp="description"
                    />
                  </section>
                </article>
              </li>
            )
          })}
        </List>
      </div>
    </Layout>
  )
}

const List = styled.ol`
  list-style: none;
  margin-top: 2rem;
  margin-bottom: 4rem;
`

export default BlogIndex

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <SEO title="All posts" />

export const pageQuery = graphql`
  {
    site {
      ...SiteData
    }
    allMarkdownRemark(sort: { frontmatter: { datePublished: DESC } }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          datePublished(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`
