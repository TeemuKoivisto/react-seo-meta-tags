import * as React from 'react'
import { graphql, Link } from 'gatsby'
import styled from '../theme/styled'

import { DefaultLayout } from '../layouts/DefaultLayout'

import { IBlogPosts, INode } from '../types/graphql'

interface IFrontPageProps {
  data: {
    site: {
      siteMetadata: {
        title: string
      }
    },
    allMarkdownRemark: IBlogPosts
  }
}

export default class FrontPage extends React.PureComponent<IFrontPageProps> {
  render() {
    const { data: { allMarkdownRemark } } = this.props
    return (
      <DefaultLayout>
        <Container>
          <h1>Hi there!</h1>
          <p>
            This is an example blog to show the functionality of <a href="https://github.com/TeemuKoivisto/react-seo-meta-tags" rel="noopener">
            react-seo-meta-tags</a>.
          </p>

          <p>
            You can try the different SEO tools to see what properties it adds.
          </p>

          <h2>/ (frontpage)</h2>
          <ul>
          <li><a href="https://search.google.com/test/rich-results" rel="noopener">
              Google Rich Results
            </a></li>
            <li><a href="https://search.google.com/structured-data/testing-tool#url=https%3A%2F%2Fteemukoivisto.github.io%2Freact-seo-meta-tags" rel="noopener">
              Google Structured Data Testing Tool
            </a></li>
            <li><a href="https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fteemukoivisto.github.io%2Freact-seo-meta-tags" rel="noopener">
              Google PageSpeed insights
            </a></li>
            <li><a href="https://developers.facebook.com/tools/debug/?q=https%3A%2F%2Fteemukoivisto.github.io%2Freact-seo-meta-tags" rel="noopener">
              Facebook Sharing Debugger (requires logging in)
            </a></li>
            <li><a href="https://cards-dev.twitter.com/validator" rel="noopener">
              Twitter Card validator (requires logging in)
            </a></li>
          </ul>

          <h2>/blog/hello-world</h2>
          <ul>
            <li><a href="https://search.google.com/structured-data/testing-tool#url=https%3A%2F%2Fteemukoivisto.github.io%2Freact-seo-meta-tags%2Fblog%2Fhello-world%2F" rel="noopener">
              Google Structured Data Testing Tool
            </a></li>
            <li><a href="https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fteemukoivisto.github.io%2Freact-seo-meta-tags%2Fblog%2Fhello-world" rel="noopener">
              Google PageSpeed insights
            </a></li>
            <li><a href="https://developers.facebook.com/tools/debug/?q=https%3A%2F%2Fteemukoivisto.github.io%2Freact-seo-meta-tags%2Fblog%2Fhello-world" rel="noopener">
              Facebook Sharing Debugger (requires logging in)
            </a></li>
            <li><a href="https://cards-dev.twitter.com/validator" rel="noopener">
              Twitter Card validator (requires logging in)
            </a></li>
          </ul>

          <p>
            The code for this Gatsby site is a bit complicated, but that's sadly how it is with Gatsby 😶.
          </p>

          <div>
            <h2>My 5 most recent blog posts</h2>
            <ul>
              { allMarkdownRemark.edges.slice(0, 5).map(({ node }: INode) =>
              <li key={node.frontmatter.title}><Link to={node.fields.slug}>{node.frontmatter.title}</Link></li>
              )}
            </ul>
          </div>
        </Container>
      </DefaultLayout>
    )
  }
}
const Container = styled.div`
  margin-bottom: 3rem;
`

export const query = graphql`
  query FrontPageQuery {
    site {
      ...SiteData
    }
    allMarkdownRemark(sort: { fields: [frontmatter___datePublished], order: DESC }) {
      totalCount
      edges {
        ...BlogPost
      }
    }
  }
`
