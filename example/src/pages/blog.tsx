import * as React from 'react'
import { graphql, Link } from 'gatsby'
import styled, { raise } from '../theme/styled'

import { DefaultLayout } from '../layouts/DefaultLayout'

import { IBlogPosts, INode } from '../types/graphql'

interface IBlogPageProps {
  data: {
    allMarkdownRemark: IBlogPosts
  }
}

export default class BlogPage extends React.PureComponent<IBlogPageProps> {
  render() {
    const {
      data: { allMarkdownRemark }
    } = this.props
    return (
      <DefaultLayout>
        <Container>
          <h1>My blog posts</h1>
          <BlogList>
            {allMarkdownRemark.edges.map(({ node }: INode) => (
              <li key={node.frontmatter.title}>
                <BlogLink to={node.fields.slug}>
                  <Date>{node.frontmatter.datePublished}</Date>
                  <Title>{node.frontmatter.title}</Title>
                </BlogLink>
                <Tags>
                  {node.frontmatter.tags.map((t, i) => (
                    <Tag key={i}>{t}</Tag>
                  ))}
                </Tags>
              </li>
            ))}
          </BlogList>
        </Container>
      </DefaultLayout>
    )
  }
}

const Container = styled.div`
  min-width: 600px;
`
const BlogList = styled.ul`
  margin: 0 0 3rem 0;
  & > li {
    display: flex;
    flex-direction: column;
  }
`

const BlogLink = styled(Link)`
  align-items: center;
  display: flex;
`

const Date = styled.div`
  margin-right: 15px;
`

const Title = styled.div`
  margin-right: 15px;
`

const Tags = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  margin-top: 5px;
`

const Tag = styled.p`
  background: #ff3354c9;
  border-radius: 5px;
  color: white;
  font-size: 1rem;
  margin: 0 5px 5px 0 !important; // god damn typography library, drives me crazy with its dumb global styles
  padding: 0 3px 0 3px;
  ${raise(1)};
`

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___datePublished], order: DESC }) {
      totalCount
      edges {
        ...BlogPost
      }
    }
  }
`
