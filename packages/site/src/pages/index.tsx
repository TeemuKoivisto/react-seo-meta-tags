import * as React from 'react'
import { graphql, Link } from 'gatsby'
import styled from 'styled-components'

import { Layout } from '../components/Layout'

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

const FrontPage = ({ data, location }: Props) => {
  const posts = data.allMarkdownRemark.nodes
  return (
    <Layout site={data.site}>
      <Container>
        <h1>Hi there!</h1>
        <p>
          This is an example blog to show the functionality of{' '}
          <a href="https://github.com/TeemuKoivisto/react-seo-meta-tags" rel="noopener">
            react-seo-meta-tags
          </a>
          .
        </p>

        <p>You can try the different SEO tools to see what properties it adds.</p>

        <h2>/ (frontpage)</h2>
        <ul>
          <li>
            <a href="https://search.google.com/test/rich-results" rel="noopener">
              Google Rich Results
            </a>
          </li>
          <li>
            <a
              href="https://search.google.com/structured-data/testing-tool#url=https%3A%2F%2Fteemukoivisto.github.io%2Freact-seo-meta-tags"
              rel="noopener"
            >
              Google Structured Data Testing Tool
            </a>
          </li>
          <li>
            <a
              href="https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fteemukoivisto.github.io%2Freact-seo-meta-tags"
              rel="noopener"
            >
              Google PageSpeed insights
            </a>
          </li>
          <li>
            <a
              href="https://developers.facebook.com/tools/debug/?q=https%3A%2F%2Fteemukoivisto.github.io%2Freact-seo-meta-tags"
              rel="noopener"
            >
              Facebook Sharing Debugger (requires logging in)
            </a>
          </li>
          <li>
            <a href="https://cards-dev.twitter.com/validator" rel="noopener">
              Twitter Card validator (requires logging in)
            </a>
          </li>
        </ul>

        <h2>/blog/hello-world</h2>
        <ul>
          <li>
            <a href="https://search.google.com/test/rich-results" rel="noopener">
              Google Rich Results
            </a>
          </li>
          <li>
            <a
              href="https://search.google.com/structured-data/testing-tool#url=https%3A%2F%2Fteemukoivisto.github.io%2Freact-seo-meta-tags%2Fblog%2Fhello-world%2F"
              rel="noopener"
            >
              Google Structured Data Testing Tool
            </a>
          </li>
          <li>
            <a
              href="https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fteemukoivisto.github.io%2Freact-seo-meta-tags%2Fblog%2Fhello-world"
              rel="noopener"
            >
              Google PageSpeed insights
            </a>
          </li>
          <li>
            <a
              href="https://developers.facebook.com/tools/debug/?q=https%3A%2F%2Fteemukoivisto.github.io%2Freact-seo-meta-tags%2Fblog%2Fhello-world"
              rel="noopener"
            >
              Facebook Sharing Debugger (requires logging in)
            </a>
          </li>
          <li>
            <a href="https://cards-dev.twitter.com/validator" rel="noopener">
              Twitter Card validator (requires logging in)
            </a>
          </li>
        </ul>

        <p>
          The code for this Gatsby site is a bit complicated, but that's sadly how it is with Gatsby
          😶.
        </p>

        <div>
          <h2>My 5 most recent blog posts</h2>
          <ul>
            {posts.slice(0, 5).map((node: any) => (
              <li key={node.frontmatter.title}>
                <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Layout>
  )
}

export default FrontPage

const Container = styled.div`
  margin-bottom: 3rem;
`

export const query = graphql`
  query FrontPageQuery {
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
  fragment SiteData on Site {
    siteMetadata {
      title
      description
      image
      social {
        facebookAppId
        twitter
      }
      imgSiteUrl
      siteUrl
      site {
        siteName
      }
      author {
        name
        image
      }
      organization {
        name
        logo
        url
      }
    }
  }
  fragment BlogPost on MarkdownRemarkEdge {
    node {
      id
      frontmatter {
        title
        description
        datePublished(formatString: "YYYY-MM-DD")
        dateModified(formatString: "YYYY-MM-DD")
        tags
        images {
          publicURL
        }
      }
      fields {
        slug
      }
      excerpt
    }
  }
`
