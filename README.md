# react-seo-meta-tags [![npm version](https://badge.fury.io/js/react-seo-meta-tags.svg)](https://badge.fury.io/js/react-seo-meta-tags)

SEO metatags for React apps, best used with Gatsby + react-helmet.

Motive for this was the infuriating complexity of SEO coupled with the fact there wasn't really any good SEO packages out there for React.

# How to install

Requires `react`, `react-dom` >=16. Probably you want to use `react-helmet` also.
```
npm i react-seo-meta-tags
```

# How to use

With react-helmet:
```ts
import React from 'react'
import Helmet from 'react-helmet'
import { ReactSEOMetaTags } from 'react-seo-meta-tags'
// Or
import ReactSEOMetaTags from 'react-seo-meta-tags'

...
    <ReactSEOMetaTags
      render={(el: React.ReactNode) => <Helmet>{el}</Helmet>}
      website={{ ...siteMetadata }}
    />
```

Reason for that is because `react-helmet` doesn't allow nesting of components, everything has to be directly rendered under ReactHelmet. It's ... silly.

Without:
```ts
import React from 'react'
import { ReactSEOMetaTags } from 'react-seo-meta-tags'

...
    <ReactSEOMetaTags
      website={{ ...siteMetadata }}
      blogPost={{ ...blogPost }}
      facebook={{ facebookAppId: 'abc123' }}
      twitter={{ twitterUser: '@mickey_mouse' }}
    />
```

In the previous example the inheritance of the properties goes like this: `website < blogPost < facebook | twitter`. So if the same property (eg image) is specified in blogPost and facebook, the facebook object's property will be the one used in its respective tag (og:image in this case).

The API for the properties is still in flux. The `site` property of the website is required for blogPost's `mainEntityOfPage` (canonicalUrl). Did I mention PRs are welcomed? So to get the most of the properties, provide website with `site` property, then blogPost with all properties. For facebook and twitter you can customize the image sizes or titles as they appear when the post is shared.

# API

ReactSEOMetaTags currently is used for only two types of pages: website and blogpost.

Website is a general page with some added Facebook (og) and Twitter tags for better SEO. Also includes JSON-LD schema.

BlogPost is a page for a blogpost (og:type article) that can have quite a few properties. I made only `title` to be required but you probably want at least `description`, `image`, `datePublished` and `author` to be specified. Well in general it's probably best for SEO purposes to include most of them, if not all. Each bit helps (I believe, haven't had empirical data yet).

For more custom tags you either have to render them by yourself or, and I hope you will, create a PR that includes the missing features in a compact and *well documented* way. There's so much boilerplate already with these tags so I don't want to include some random tags without knowing what they are for.

```ts
  export class ReactSEOMetaTags extends React.PureComponent<ReactSEOMetaTagsProps> {}

  export interface ReactSEOMetaTagsProps {
    render?: (el: React.ReactNode) => React.ReactNode
    website?: WebsiteProps
    blogPost?: BlogPostProps
    facebook?: FacebookProps
    twitter?: TwitterProps
  }
  
  export interface WebsiteProps {
    url?: string // The URL of this page (eg https://google.com/about)
    title: string // Maximum 70 characters.
    description?: string // Maximum 200 characters.
    image?: string // URL to the image, PNG, JPEG, or GIF recommended.
    author?: {
      name: string
      schemaType: string // 'Person', etc
    }
    site?: {
      siteName?: string // "If your object is part of a larger web site, the name which should be displayed for the overall site. e.g., "IMDb"."
      canonicalUrl?: string // The index URL of the website (eg https://google.com), used for BlogPosting JSON-LD schema.
    }
  }
  
  /**
   * https://developers.facebook.com/docs/sharing/webmasters/
   * http://ogp.me/
   */
  export interface FacebookProps {
    title: string // The title of your article without any branding such as your site name.
    description?: string // A brief description of the content, usually between 2 and 4 sentences.
    image?: string // Facebook recommends 1200x630 size, ratio of 1.91:1. PNG, JPEG, or GIF.
    facebookAppId?: string // "Insights lets you view analytics for traffic to your site from Facebook."
  }
  
  /**
   * https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/markup.html
   */
  export interface TwitterProps {
    title: string // Title of content (max 70 characters). Fallback: og:title.
    description?: string // Description of content (maximum 200 characters). Fallback: og:description.
    image?: string // Twitter card image, optimal ratio 1.91:1. Recommended: 1200x628. PNG, JPEG, or GIF. Fallback: og:image.
    twitterUser?: string // @username of content creator.
  }
  
  export interface BlogPostProps {
    url?: string // The canonical URL for your page. This should be the undecorated URL, without session variables, user identifying parameters, or counters.
    title: string // Title of the post. Max 70 characters.
    description?: string // Should be a short description about the topic, <=200 words. Mainly for SEO purposes.
    image?: string // Based on other SEO tags, an image of 1200x628 with 1.91:1 ratio in PNG, JPEG, or GIF is the optimum.
    datePublished?: string // The original publication date. Don't change arbitrarily, Google might downrank you.
    dateModified?: string // Google prefers recent content in search results and also users are more likely to click a recent article
    tags?: string[]
    author?: {
      name: string
      schemaType: string // 'Person', etc
    }
    organization?: {
      name: string // Name of the organization (Google Inc.) or the owner of the website (Larry Page).
      logo?: string // URL to the logo image.
      url: string // URL of the organization eg. https://google.com
    }
  }
```

# How to develop locally

Requires: Node.js >= 8.

1) Clone this repo & run `npm i`.
2) To use with the example project, install its dependencies too: `cd example & npm i`. TODO
3) Back in the root directory, link `react-seo-meta-tags` to your local npm libraries: `npm link`. It should be now available as a global dependency for any npm projects, link it to your example-app: `cd example & npm link react-seo-meta-tags`. It creates a symlink pointing to this library's root folder.
4) Start the TypeScript compiler in one bash session: `npm run ts:watch`.
5) Start the example Gatsby site with: `npm start`.
6) The app should open in http://localhost:8000. The changes to the source code should be reloaded automatically and be seen in the `<head>`'s metatags. Happy hacking!

As one script:
```bash
#!/bin/bash
npm i
cd example & npm i
cd .. & npm link
cd example & npm link react-seo-meta-tags
cd .. & npm run ts:watch
# Open another terminal session
cd example & npm start
```

# How to publish changes

This one is more for the maintainers such as me. All the changes should go through PRs. But because there's no automatic CI such as Travis set up (yet), the new versions are published locally.

1) Login to your npm account: `npm login`.
2) After making changes to the code (*cough* pulling from master I mean), run `npm run compile`.
3) Update the version number in `package.json`. Do it semantically\*. Git add and commit the change eg `git commit -m "Version 1.5.1"`. Tag it: `git tag 1.5.1`.
4) Push the changes to GitHub: `git push origin master `.
5) Publish to npm: `npm publish`. This will push the files specified in `package.json` `"files"`-block + default files (package.json, README, LICENSE).

\***Semantically**: big breaking changes are new version, general changes or bug fixes are minor versions and patches are just some general maintenance or refactoring.

# How to contribute

Create issues or PRs for bug reports/feedback/feature requests.

# Other resources about SEO in general

https://blog.realmacsoftware.com/which-meta-tags-matter-for-seo-in-2018/

## Open Graph

Metadata format developed by Facebook.

http://ogp.me/

