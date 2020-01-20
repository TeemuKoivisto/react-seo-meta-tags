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
          <p>This is an example blog to show how <a>react-seo-meta-tags</a> work.</p>

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
