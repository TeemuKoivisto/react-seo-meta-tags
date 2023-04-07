import * as React from 'react'
import { Link } from 'gatsby'

import styled, { raise } from '../theme/styled'
import { ISiteData } from '../types/graphql'

import { NavDropdown } from '../elements/NavDropdown'

interface IProps {
  site: ISiteData
}

function NavBarEl(props: IProps) {
  const { title } = props.site.siteMetadata
  const navDropdownOptions = [
    { key: '/', title: 'Frontpage' },
    { key: '/blog', title: 'Blog' }
  ]
  return (
    <NavBarContainer>
      <Nav>
        <TitleLink to="/">
          <Title>{title}</Title>
        </TitleLink>
        <NavLink className="hide-in-mobile" to="/blog">
          Blog
        </NavLink>
        <ExternalLink
          className="hide-in-mobile"
          href="https://www.npmjs.com/package/react-seo-meta-tags"
          rel="noopener"
        >
          npm
        </ExternalLink>
        <NavDropdown options={navDropdownOptions} onSelect={(e: any) => console.log(e)} />
      </Nav>
    </NavBarContainer>
  )
}

const NavBarContainer = styled.header`
  background: linear-gradient(#ff5f72 -59%, #ff5864);
  position: relative;
  z-index: 1;
`
const Title = styled.h1`
  color: #fff;
  font-size: 26px;
  letter-spacing: 2px;
  line-height: 26px;
  margin: 0;
  text-rendering: optimizeLegibility;
  text-shadow: 2px 2px #2b274f;
  &:nth-child(2) {
    margin-left: 12px;
  }
`
const TitleLink = styled(Link)`
  cursor: pointer;
  color: #fff;
  display: flex;
  flex-direction: column;
  margin: 0 40px 0 40px;
`
const Nav = styled.nav`
  align-items: center;
  display: flex;
  padding: 32px 0;
  position: relative;
  ${raise(2)}
  ${NavDropdown} {
    margin-right: 20px;
    position: absolute;
    right: 0;
    visibility: hidden;
  }
  @media screen and (max-width: 500px) {
    padding: 20px 0;
    .hide-in-mobile {
      display: none;
      visibility: hidden;
    }
    ${NavDropdown} {
      visibility: visible;
    }
  }
`
const NavLink = styled(Link)`
  color: #fff;
  margin-right: 40px; // For spacing out the dividing bars
  text-decoration: none;
  position: relative;
  @media screen and (max-width: 460px) {
    margin-right: 20px;
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
    background-color: #fff; // #757575; #cbcbcb;
    @media screen and (max-width: 460px) {
      right: -10px;
    }
  }
`
const ExternalLink = styled.a`
  color: #fff;
`
export const NavBar = styled(NavBarEl)``
