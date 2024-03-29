import * as React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi'

import type { Page } from './BlogPostTemplate'

interface IProps {
  previous: Page | null
  next: Page | null
}

function BlogPagerEl(props: IProps) {
  const { previous, next } = props
  return (
    <BlogPagerContainer>
      {previous === null ? (
        <div></div>
      ) : (
        <IconLink to={previous.fields.slug}>
          <FiChevronsLeft size={24} />
          <LinkText className="m-left">
            <p>{previous.frontmatter.title}</p>
            <p>{previous.frontmatter.datePublished}</p>
          </LinkText>
        </IconLink>
      )}
      {next === null ? (
        <div></div>
      ) : (
        <IconLink to={next.fields.slug}>
          <LinkText className="m-right">
            <p>{next.frontmatter.title}</p>
            <p>{next.frontmatter.datePublished}</p>
          </LinkText>
          <FiChevronsRight size={24} />
        </IconLink>
      )}
    </BlogPagerContainer>
  )
}

const IconLink = styled(Link)`
  align-items: center;
  color: black;
  display: flex;
  margin-top: 2rem;
`
const BlogPagerContainer = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap-reverse;
  margin-bottom: 2rem;
  margin-top: -2rem; // Cool trick https://stackoverflow.com/questions/30887071/margin-top-only-when-the-flex-item-is-wrapped
  padding: 20px;
  @media screen and (max-width: 600px) {
    padding: 0;
  }
  ${IconLink}:last-child {
    margin-left: auto;
  }
`
const LinkText = styled.div`
  margin: 0;
  &.m-left {
    margin-left: 20px;
    @media screen and (max-width: 400px) {
      margin: 5px;
    }
  }
  &.m-right {
    margin-right: 20px;
    @media screen and (max-width: 400px) {
      margin: 5px;
    }
  }
  & > p:first-child {
    font-weight: bold;
  }
  & > p {
    margin: 0;
  }
`
export const BlogPager = styled(BlogPagerEl)``
