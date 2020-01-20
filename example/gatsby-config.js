module.exports = {
  pathPrefix: '/react-seo-meta-tags',
  siteMetadata: {
    title: 'react-seo-meta-tags',
    description: 'React SEO meta tag library for quickly adding the basic meta-tags for a Gatsby blog site',
    image: 'https://teemukoivisto.github.io/react-seo-meta-tags/img/logo.png',
    facebookAppId: '3006370309470889',
    twitterUser: '@tegurus',
    author: {
      name: 'Teemu Koivisto',
      image: 'https://teemukoivisto.xyz/images/avatar-460.jpeg',
    },
    siteUrl: 'https://teemukoivisto.github.io/react-seo-meta-tags', // Required by gatsby-plugin-sitemap
    site: {
      siteName: 'React SEO Meta Tags npm library', // This is not very necessary for a personal blog but whatever
    },
  },
  plugins: [
    'gatsby-plugin-typescript',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1380,
              linkImagesToOriginal: false,
              showCaptions: true
            },
          },
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/theme/typography',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'blog-pages',
        path: `${__dirname}/content/blog`
      }
    },
  ],
}