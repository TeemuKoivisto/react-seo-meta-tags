import * as React from 'react'
import styled, { ThemeProvider } from 'styled-components'

import { defaultTheme } from '../theme/theme'

import { NavBar } from './NavBar'
import { Footer } from './Footer'

import { LARGE_DISPLAY_WIDTH } from '../theme/breakpoints'
import { SiteData } from '../types/graphql'

interface Props {
  children: React.ReactNode
  site: SiteData
}

export const Layout = ({ site, children }: Props) => (
  <ThemeProvider theme={defaultTheme}>
    <DefaultWrapper>
      <NavBar site={site} />
      <DefaultContainer>{children}</DefaultContainer>
      <Footer site={site} />
    </DefaultWrapper>
  </ThemeProvider>
)

const DefaultWrapper = styled.div`
  background: ${({ theme }) => theme.color.bg};
  background-size: cover;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  position: absolute;
  width: 100%;
`
const DefaultContainer = styled.main`
  background: #fff;
  border-radius: 20px;
  /* box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24); */
  height: 100%;
  margin: 2rem 0.5rem 16rem 0.5rem; /* Massive bottom margin for footer which breaks here into column-wise form */
  max-width: 600px;
  position: relative;
  & > *:first-child {
    min-height: 400px; /* Required to keep the footer at the bottom of the screen (otherwise empty space appears, a long story..) */
    padding: 0rem 3vw 0 4vw;
  }
  @media screen and (min-width: 500px) {
    margin: 2rem 1rem 10rem 1rem;
    & > *:first-child {
      padding: 1rem 3vw 0 4vw;
    }
  }
  @media screen and (min-width: 650px) {
    margin: 4rem auto 12rem auto; /* Massive margin-bottom again to keep the footer from getting funky */
  }
  @media screen and (min-width: 900px) {
    max-width: 800px;
    width: 100%;
    & > *:first-child {
      padding: 2rem 8vw 0 8vw;
    }
  }
  @media screen and (min-width: ${LARGE_DISPLAY_WIDTH}) {
    & > *:first-child {
      padding: 2rem 6rem 0 6rem;
    }
  }
`
