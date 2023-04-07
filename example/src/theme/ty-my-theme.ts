import gray from 'gray-percentage'
import { MOBILE_MEDIA_QUERY, TABLET_MEDIA_QUERY } from './theme-breakpoints'

// Uses typography-theme-sutro as its base
// https://github.com/KyleAMathews/typography.js/blob/master/packages/typography-theme-sutro/src/index.js
const theme = {
  title: 'my-theme',
  baseFontSize: '16px',
  baseLineHeight: 1.625,
  // scaleRatio: 2,
  googleFonts: [
    {
      name: 'Arvo',
      styles: ['400', '700']
    },
    {
      name: 'Teko',
      styles: ['500', '700']
    }
  ],
  headerFontFamily: ['Teko', 'sans-serif'],
  bodyFontFamily: ['Arvo', 'serif'],
  bodyColor: 'hsla(0,0%,0%,0.9)',
  headerWeight: 700,
  bodyWeight: 400,
  boldWeight: 700,
  overrideStyles: ({ adjustFontSizeTo, scale, rhythm }, options) => ({
    a: {
      textDecoration: 'underline'
    },
    'a:hover,a:active': {
      outline: '1px solid',
      outlineStyle: 'dashed'
    },
    blockquote: {
      ...scale(1 / 5),
      color: gray(41),
      fontStyle: 'italic',
      paddingLeft: rhythm(13 / 16),
      marginLeft: 0,
      borderLeft: `${rhythm(3 / 16)} solid ${gray(80)}`
    },
    'blockquote > :last-child': {
      marginBottom: 0
    },
    'blockquote cite': {
      ...adjustFontSizeTo(options.baseFontSize),
      color: options.bodyColor,
      fontWeight: options.bodyWeight
    },
    'blockquote cite:before': {
      content: '"— "'
    },
    [MOBILE_MEDIA_QUERY]: {
      blockquote: {
        marginLeft: rhythm(-3 / 4),
        marginRight: 0,
        paddingLeft: rhythm(9 / 16)
      }
    },
    [TABLET_MEDIA_QUERY]: {
      h1: {
        ...scale(6 / 5)
      }
    },
    'h1,h2,h3,h4,h5,h6': {
      marginTop: rhythm(1),
      marginBottom: rhythm(3 / 5)
    },
    h1: {
      ...scale(7 / 5),
      letterSpacing: '-1px'
    },
    h6: {
      fontStyle: 'italic'
    },
    hr: {
      marginTop: rhythm(5 / 4),
      marginBottom: rhythm(5 / 4)
    },
    p: {
      marginTop: rhythm(1 / 2),
      marginBottom: rhythm(1 / 2)
    },
    figure: {
      marginBottom: rhythm(1.5)
    }
  })
}

export default theme
