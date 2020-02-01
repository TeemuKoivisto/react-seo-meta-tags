# Simple Gatsby Site

I've used my own blog site's code as the basis of the app. Yes it's quite contrived but sadly this is quite necessary when you start customizing the Gatsby setup heavily. It's supposed to be a minimal setup to show how the react-seo-meta-tags work.

Note also that I had to do some dumb things to make things work with Github Pages and how all the pages it shows are redirected to the correct pages. This makes using `og:url` impossible as FB sharing debugger shows it creates this redirect loop.

Also because of this all the links have to be prefixed with `pathPrefix: '/react-seo-meta-tags',` to make it route to the correct Github pages deployment. Which is why there are two site urls: imgSiteUrl and siteUrl as the images are automatically prefixed yet all the other links require to use the real baseUrl eg `og:url`.

## Requirements

Requires Node >= 8.

## How to install

1) Install dependencies with: `npm i`
2) Start the Gatsby development server with: `npm start`