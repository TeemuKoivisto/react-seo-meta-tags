module.exports = {
  siteMetadata: {
    title: 'My example site',
    description: 'A more detailed description of my site, less than 100 characters long',
    image: 'https://teemukoivisto.xyz/images/avatar-460.jpeg',
    facebookAppId: 'abc123',
    twitterUser: '@mickey_mouse',
    author: {
      name: 'Teemu Koivisto',
      image: 'https://teemukoivisto.xyz/images/avatar-460.jpeg',
    },
    siteUrl: 'https://teemukoivisto.github.io/react-seo-meta-tags', // Required by gatsby-plugin-sitemap
    site: {
      siteName: 'Example Inc.', // This is not very necessary for a personal blog but whatever
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