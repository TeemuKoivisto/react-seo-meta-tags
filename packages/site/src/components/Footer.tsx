import * as React from 'react'
import { Link } from 'gatsby'

import styled from '../theme/styled'
import { SiteData } from '../types/graphql'

interface IProps {
  site: SiteData
}

function FooterEl(props: IProps) {
  const { title } = props.site.siteMetadata
  return (
    <FooterContainer>
      <NavWrapper>
        <Nav>
          <NavLink to="/" className="title">
            <h2>{title}</h2>
          </NavLink>
          <NavLink to="/blog">Blog</NavLink>
          <ExternalLink href="https://www.npmjs.com/package/react-seo-meta-tags" rel="noopener">
            npm
          </ExternalLink>
        </Nav>
        <SmallPrint>
          <CopyrightNotice>{`${new Date().getFullYear()}, Teemu Koivisto`}</CopyrightNotice>
          <SourceLink href="https://github.com/TeemuKoivisto/react-seo-meta-tags">
            This site's code is Open Source
          </SourceLink>
        </SmallPrint>
      </NavWrapper>
    </FooterContainer>
  )
}

const FooterContainer = styled.footer`
  background: linear-gradient(#ff5f72 -59%, #ff5864);
  /* border-top: 1px solid hsla(0,0%,0%,0.2); */
  bottom: 0;
  position: absolute;
  width: 100%;
`
const NavWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: relative;
`
const Nav = styled.nav`
  display: flex;
  justify-content: center;
  padding: 20px;
  position: relative;
  @media screen and (max-width: 500px) {
    flex-direction: column;
    align-items: center;
  }
`
const NavLink = styled(Link)`
  color: #fff;
  margin-right: 40px;
  text-decoration: none;
  position: relative;
  @media screen and (max-width: 500px) {
    margin-bottom: 1rem;
    margin-right: 0px;
  }
  &.title {
    align-items: center;
    color: #fff;
    display: flex;
    text-shadow: 2px 2px #2b274f;
    & > h2 {
      font-size: 1.3rem;
      margin: 0;
    }
  }
  &.right-end {
    position: absolute;
    right: 5px;
  }
  &:not(:last-child):before {
    content: ' ';
    cursor: auto;
    display: block;
    height: 1rem;
    width: 1px;
    right: -20px;
    position: absolute;
    top: 6px; // Hmm
    background-color: #fff;
    @media screen and (max-width: 500px) {
      display: none;
    }
  }
`
const ExternalLink = styled.a`
  color: #fff;
`
const SmallPrint = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 10px;
  & > * {
    margin: 0;
  }
`
const CopyrightNotice = styled.p`
  font-size: 12px;
`
const SourceLink = styled.a`
  font-size: 12px;
`
export const Footer = styled(FooterEl)``
