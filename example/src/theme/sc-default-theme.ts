import { ITheme } from '../types/theme'
import { createGlobalStyle } from 'styled-components'

export const defaultTheme : ITheme = {
  color: {
    textLight: '#666',
    textDark: '#222',
    black: '#272822',
    bg: ' #fff1f4', // light reddish
    white: '#fff',
    primary: '#ff5864', // medium red
    secondary: '#82B1FF',
    danger: '#ff3354c9',
  },
  fontSize: {
    small: '16px',
    medium: '18px',
    large: '24px',
    xlarge: '40px',
    largeIcon: '50px'
  },
  margins: {
    default: '2rem',
  }
}

export const GlobalStyle = createGlobalStyle`
  html.scroll-lock {
    overflow: hidden;
  }
  body {
    margin: 0;
    min-height: 100%;
    padding: 0;
    position: absolute;
    width: 100%;
    // TODO this shit
    & > div {
      height: 100%;
      & > div {
        height: 100%;
      }
    }
  }
  img {
    margin: 0;
    padding: 0;
  }
  * {
    box-sizing: border-box;
  }
  .blog-post {
    a {
      color: #5917ff;
      font-weight: bold;
      text-decoration: underline;
    }
    figcaption {
      color: rgba(0, 0, 0, 0.7);
      font-family: 'Teko',sans-serif;
      font-size: 1.2rem;
      padding-top: 6px;
      text-align: center;
    }
  }
  .figure-caption__body {

  }
`
