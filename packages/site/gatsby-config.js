/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  // For deploying to Github pages with a correct prefix -> https://teemukoivisto.github.io/react-seo-meta-tags/
  pathPrefix: '/react-seo-meta-tags',
  siteMetadata: {
    title: 'react-seo-meta-tags',
    description:
      'React SEO meta tag library for quickly adding the basic meta-tags for eg a Gatsby website',
    image: 'https://teemukoivisto.github.io/react-seo-meta-tags/img/logo.png',
    social: {
      facebookAppId: '3006370309470889',
      twitter: '@tegurus'
    },
    author: {
      name: 'Teemu Koivisto',
      image: 'https://teemukoivisto.xyz/img/avatar-460.jpeg'
    },
    organization: {
      name: 'react-seo-meta-tags',
      logo: 'https://teemukoivisto.github.io/react-seo-meta-tags/img/logo.png',
      url: 'https://teemukoivisto.github.io/react-seo-meta-tags'
    },
    imgSiteUrl: 'https://teemukoivisto.github.io',
    siteUrl: 'https://teemukoivisto.github.io/react-seo-meta-tags',
    site: {
      siteName: 'React SEO Meta Tags npm library' // This is not very necessary for a personal blog but whatever
    }
  },
  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630
            }
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`
            }
          },
          `gatsby-remark-prismjs`
        ]
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes.map(node => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [{ 'content:encoded': node.html }]
                })
              })
            },
            query: `{
              allMarkdownRemark(sort: {frontmatter: {date: DESC}}) {
                nodes {
                  excerpt
                  html
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                    date
                  }
                }
              }
            }`,
            output: '/rss.xml',
            title: 'Gatsby Starter Blog RSS Feed'
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter Blog`,
        short_name: `Gatsby`,
        start_url: `/`,
        background_color: `#ffffff`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/logo.png` // This path is relative to the root of the site.
      }
    }
  ]
}
