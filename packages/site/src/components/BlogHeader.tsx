import * as React from 'react'
import styled from 'styled-components'

import { raise } from '../theme/styled'
import { MdEvent, MdLocalOffer } from 'react-icons/md'

import { Frontmatter } from '../types/graphql'

interface IProps {
  frontmatter: Frontmatter
  excerpt: string
}

function BlogHeaderEl(props: IProps) {
  const {
    excerpt,
    frontmatter: { title, datePublished, tags }
  } = props
  return (
    <>
      <BlogHeaderContainer>
        <h1>{title}</h1>
        <Info>
          <BlogDate>
            <SvgWrapper>
              <MdEvent size={24} />
            </SvgWrapper>
            <Time>{datePublished}</Time>
          </BlogDate>
          <TagsContainer>
            <SvgWrapper>
              <MdLocalOffer size={24} />
            </SvgWrapper>
            <Tags>
              {(tags || []).map((t, i) => (
                <Tag key={i}>{t}</Tag>
              ))}
            </Tags>
          </TagsContainer>
        </Info>
        <Excerpt>{excerpt}</Excerpt>
      </BlogHeaderContainer>
      <hr />
    </>
  )
}

const BlogHeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  & > h1 {
    font-size: 3rem;
    line-height: 3.25rem;
    margin-bottom: 0;
    @media only screen and (max-width: 620px) {
      font-size: 2rem;
    }
  }
`
const Info = styled.div`
  align-items: center;
  display: flex;
  margin: 8px 0 8px 0;
  @media screen and (max-width: 550px) {
    align-items: flex-start;
    flex-direction: column;
    margin: 8px 0 18px 0;
  }
`
const BlogDate = styled.div`
  align-items: center;
  display: flex;
  margin: 10px 20px 10px 0;
  min-width: 130px; // Based on complex calculations and rocket science
`
const Time = styled.time`
  background: #607cff; // #081da9;
  border-radius: 5px;
  color: white;
  font-size: 1rem;
  padding: 0 3px;
  ${raise(1)}
`
// Keeps svgs from resizing themselves into oblivion
const SvgWrapper = styled.div`
  display: flex;
  margin-right: 10px;
`
const TagsContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  ${SvgWrapper} {
    padding-bottom: 3px; // Aligns the stupid svg icon to center
  }
`
const Tags = styled.ul`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
`
const Tag = styled.li`
  background: #ff3354c9;
  border-radius: 5px;
  color: white;
  font-size: 1rem;
  margin: 0 5px 5px 0;
  padding: 0 3px 0 3px;
  ${raise(1)};
`
const Excerpt = styled.h6`
  font-size: 1rem;
  font-weight: 300;
  margin: 0 0 0 0;
`
export const BlogHeader = styled(BlogHeaderEl)``
