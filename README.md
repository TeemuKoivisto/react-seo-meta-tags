# [react-seo-meta-tags](https://teemukoivisto.github.io/react-seo-meta-tags/) [![npm version](https://badge.fury.io/js/react-seo-meta-tags.svg)](https://badge.fury.io/js/react-seo-meta-tags)

SEO metatags for React apps, originally designed for a Gatsby blog site with react-helmet. But it should work with any React setup, such as Next.js apps.

The motive behind it was the infuriating complexity of SEO coupled with the fact there wasn't any simple and understandable SEO packages out there for React.

<u>[Example Gatsby site](https://teemukoivisto.github.io/react-seo-meta-tags/)</u>

https://github.com/TeemuKoivisto/react-seo-meta-tags/tree/master/packages/site

# How to install

Requires `react >=16.2.0`. You might also want to use `react-helmet` (although as of 2023 this seems rare).

```
npm i react-seo-meta-tags
```

# How to use

With react-helmet:

```tsx
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

Next.js:

```tsx
import Head from 'next/head'
import { ReactSEOMetaTags } from 'react-seo-meta-tags'

...
    <ReactSEOMetaTags
      render={(el: React.ReactNode) => <Head>{el}</Head>}
      website={{ ...siteMetadata }}
    />
```

where siteMetadata could be:

```js
{
  url: 'https://google.com/about',
  title:  'This is a 70 character long title with a lot of padding to make it so!',
  datePublished: '2019-10-06T13:56:03.123Z',
  description: 'This is a 200 character long description of this web page which is quite interesting and which describes its contents well with a lot of relevant keywords and isn\'t just general marketing mumbo-jumbo.',
  language: 'en-US',
  image: 'http://website.com/image.png',
  author: {
    email: 'person@gmail.com',
    name: 'John Smith',
    image: 'http://john.me/my-face.jpg',
  },
  site: {
    siteName: 'IMDb',
    searchUrl: 'https://www.google.com/search?q=',
  }
}
```

It appears both `react-helmet` and Next.js are a bit picky how they accept meta tags. ReactHelmet being the more choosy as it doesn't accept any nesting. Next.js works for some children but not all and therefore using the `render` function is required.

Without:

```tsx
import React from 'react'
import { ReactSEOMetaTags } from 'react-seo-meta-tags'

...
    <ReactSEOMetaTags
      website={{ ...siteMetadata }}
      breadcrumb={[
        { name: 'My Site', url: 'https://me.com' },
        { name: 'Blog', url: 'https://me.com/blog' },
      ]}
      organization={{
        name: 'Google',
        legalName: 'Google Inc',
        url: 'https://google.com',
        logo: 'https://google.com/logo.jpg'
      }}
      blogPost={{ ...blogPost }}
      facebook={{ facebookAppId: 'abc123' }}
      twitter={{ twitterUser: '@mickey_mouse' }}
    />
```

In the previous example the inheritance of the properties goes like this: `website < blogPost < facebook | twitter`. So if the same property (eg image) is specified in blogPost and facebook, the facebook object's property will be the one used in its respective tag (og:image in this case).

The current properties shown are the ones I've seen websites use the most. Most sites don't even use JSON-LD, for example Google doesn't use it even though they have been a big contributor to it. So yeah, I wouldn't recommend going too deep into this rabbit hole. The API is complicated and if you feel there's something missing create a PR.

## General page

For example a front or about page. I recommend adding just the website property with an organization if you have one. In that case remember to add good enough list of sameAs URLs (they seem to be helpful). Breadcrumb if you feel it makes sense. **NOTE**: Always remember to add the title of the page, it's used also to render a `<title>` tag so be aware!

For the image of a general page I just used the logo for my example site. I strongly recommend having that image in 2:1 ratio eg 440x220 in order to make it appear nicely when sharing.

## Blog post

For a blog post, provide all the `blogPost` values. I know it's a bit of work, but this way you'll avoid any complaints from SEO validation tools such as https://search.google.com/structured-data/testing-tool. For Facebook and Twitter you can customize the image sizes or titles as they appear when the post is shared. I only added the tags I thought were useful, if something's missing please create an issue or PR. Also Google expects BlogPosts's to have `publisher` property and that to be an organization. In Schema.org spec Person is also a valid value, but Google doesn't think so. You could just use yourself as a fake organization I guess if nothing else.

# API

ReactSEOMetaTags currently is used for only two types of pages: website and blogpost.

Website is a general page with some added Facebook (og) and Twitter tags for better SEO. Also includes JSON-LD schema.

BlogPost is a page for a blogpost (og:type article) that can have quite a few properties. I made only `title` to be required but you probably want at least `description`, `image`, `datePublished` and `author` to be specified. Well in general it's probably best for SEO purposes to include most of them, if not all. Each bit helps, but real traffic will always boost your SEO much more than these types of meta tags.

For more custom tags you either have to render them by yourself or, and I hope you will, create a PR that includes the missing features in a compact and _well documented_ way. There's so much boilerplate already with these tags so I don't want to include some random tags without knowing what they are for.

Compiled from https://github.com/TeemuKoivisto/react-seo-meta-tags/blob/master/packages/react-seo-meta-tags/src/index.ts

```ts
export interface ReactSEOMetaTagsProps {
  render?: (el: React.ReactNode) => React.ReactNode
  website?: WebsiteProps
  breadcrumb?: BreadcrumbList
  organization?: OrganizationProps
  blogPost?: BlogPostProps
  facebook?: FacebookProps
  twitter?: TwitterProps
}
/**
 * https://schema.org/WebSite
 */
export interface WebsiteProps {
  /**
   * The URL of this page (eg https://google.com/about)
   */
  url?: string | null
  /**
   * Maximum 70 characters.
   */
  title: string
  /**
   * The original publication date. ISO 8601 timestamp eg "2019-10-06T13:56:03.123Z"
   * Don't know how useful for random webpages. Add it at least for blog posts.
   */
  datePublished?: string | null
  /**
   * Maximum 200 characters.
   */
  description?: string | null
  /**
   * Default "en-US" https://en.wikipedia.org/wiki/IETF_language_tag and https://datahub.io/core/language-codes
   */
  language?: string | null
  /**
   * URL to the image, PNG, JPEG, or GIF recommended.
   */
  image?: string | null
  imageAlt?: string | null
  /**
   * Possibly redundant property. But at least bots can scrape your email and that's fun right? :)
   */
  author?: PersonProps | null
  site?: {
    /**
     * "If your object is part of a larger web site, the name which should be displayed for the overall site. e.g., "IMDb"."
     * At least Telegram uses this as gray text above the title when sharing links.
     */
    siteName?: string | null
    /**
     * If your website has a search functionality, enter the URL with parameter here eg "https://www.google.com/search?q="
     */
    searchUrl?: string | null
  } | null
}
/**
 * https://developers.facebook.com/docs/sharing/webmasters/
 * http://ogp.me/
 */
export interface FacebookProps {
  /**
   * The title of your article without any branding such as your site name.
   */
  title?: string
  /**
   * A brief description of the content, usually between 2 and 4 sentences.
   */
  description?: string | null
  /**
   * Used for og:locale. Default "en-US"
   */
  language?: string | null
  /**
   * Facebook recommends 1200x630 size, ratio of 1.91:1. PNG, JPEG, or GIF.
   * But if you want your image to be displayed as a smaller image (aka thumbnail, similar to 'summary' Twitter card),
   * your image should be smaller than 400x209 and preferably with a ratio of 1:1. Unless your image can be cropped
   * into a 1:1 box without making it look bad. So you probably want to use something like 200x200.
   * Note the "minimum size constraint of 200px by 200px".
   */
  image?: string | null
  imageAlt?: string | null
  /**
   * "A URL to a video file that complements this object."
   */
  video?: string | null
  /**
   * "A URL to an audio file to accompany this object."
   */
  audio?: string | null
  /**
   * "Insights lets you view analytics for traffic to your site from Facebook."
   */
  facebookAppId?: string | null
}
/**
 * https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/markup.html
 */
export interface TwitterProps {
  /**
   * Title of content (max 70 characters). Fallback: og:title.
   */
  title?: string
  /**
   * Description of content (max 200 characters). Fallback: og:description.
   */
  description?: string | null
  /**
   * Twitter card image, optimal ratio 1.91:1. Recommended: 1200x628. PNG, JPEG, or GIF. Max 5 MB. Fallback: og:image.
   */
  image?: string | null
  /**
   * Alt for the image. Max 420 characters. Fallback: og:image:alt.
   */
  imageAlt?: string | null
  /**
   * So since I saw that the large image looked dumb if you are using your faceshot as the image, I started using the smaller
   * 'summary' type. It should be in 1:1 scale. Also there exists 'player' and 'app' types that I haven't researched how
   * they work.
   * @default 'summary_large_image'
   */
  cardType?: 'summary_large_image' | 'summary' | 'player' | 'app' | null
  /**
   * @username of content creator.
   */
  twitterUser?: string | null
  /**
   * @username of the site eg @nytimes
   */
  twitterSite?: string | null
}
/**
 * https://schema.org/BlogPosting
 */
export interface BlogPostProps {
  /**
   * The canonical URL for your page. This should be the undecorated URL, without session variables,
   * user identifying parameters, or counters.
   */
  url?: string | null
  /**
   * Title of the post. Max 70 characters.
   */
  title: string
  /**
   * Should be a short description about the topic, max 200 words. Mainly for SEO purposes.
   */
  description?: string | null
  /**
   * You should add this. Just use the same image as og/twitter eg 1200x630 with 1.91:1 ratio in PNG, JPEG, or GIF.
   */
  image: string
  /**
   * Some SEO tools really want this so it's probably wise to add it
   */
  imageAlt?: string | null
  /**
   * The original publication date. Don't change arbitrarily, Google might downrank you.
   */
  datePublished?: string | null
  /**
   * Google prefers recent content in search results and also users are more likely to click a recent article
   */
  dateModified?: string
  tags?: string[] | null
  /**
   * Technically either Person or Organization, but since it doesn't make any sense to not to credit this content to a human, use person.
   * From schema.org:
   * "Please note that author is special in that HTML 5 provides a special mechanism for indicating authorship
   * via the rel tag. That is equivalent to this and may be used interchangeably."
   * Which means.. something.
   */
  author?: PersonProps | null
  /**
   * You should add this since otherwise Google's structured-data tool will complain...
   * However https://webmasters.stackexchange.com/questions/110332/personal-blog-using-structured-data-fails-validation-on-publisher
   */
  publisher?: OrganizationProps | null
  site?: {
    /**
     * "If your object is part of a larger web site, the name which should be displayed for the overall site. e.g., "IMDb"."
     * Used for og:site_name
     */
    siteName?: string
  } | null
}
/**
 * https://schema.org/BreadcrumbList
 */
export type BreadcrumbList = BreadcrumbProps[]
export interface BreadcrumbProps {
  url: string
  title: string
  image?: string | null
}
/**
 * https://schema.org/Person
 */
export interface PersonProps {
  email?: string | null
  name?: string | null
  image?: string | null
}
/**
 * https://schema.org/Organization
 */
export interface OrganizationProps {
  /**
   * @default "Organization"
   * You could use eg "Corporation"
   */
  '@type'?: string | null
  description?: string | null
  /**
   * @example "Google"
   */
  name: string
  /**
   * @example "Google Inc"
   */
  legalName?: string | null
  /**
   *  URL to the logo image.
   */
  logo: string
  /**
   * List of other webpages referencing this organization, eg Wikipedia, Facebook, Twitter, Instagram etc.
   * Will show these sites alongside your website in Google search results and probably boost your SEO rank too.
   */
  sameAs?: string[] | null
  /**
   * URL to the organization
   * @example "https://abc.xyz"
   */
  url: string
  /**
   * You can nest as many organizations as you'd like, dunno how useful it's
   */
  parentOrganization?: OrganizationProps | null
}
```

# How to develop locally

Requires: Node.js >= 8.

1. Clone this repo & run `npm i`
2. Star the TypeScript compiler: `npm run ts:watch`
3. In another terminal go to the example project and install dependencies: `cd example & npm i`
4. Start the Gatsby app with: `npm start`
5. The app should open in http://localhost:8000. The changes to the source code should be reloaded automatically and be seen in the `<head>`'s metatags. Happy hacking!

# How to publish changes

This one is more for the maintainers such as me. All the changes should go through PRs. But because there's no automatic CI such as Travis set up (yet), the new versions are published locally.

1. Login to your npm account: `npm login`.
2. After making changes to the code (_cough_ pulling from master I mean), run `npm run compile`.
3. Depending on the changes you have made, use either `npm version patch|minor|major` to update the version in `package.json`. Do it semantically\*.
4. It should automatically tag it, but if it didn't tag it yourself: `git tag v1.5.1`.
5. Push the changes to GitHub: `git push origin master && git push origin master --tags`.
6. Publish to npm: `npm publish`. This will push the files specified in `package.json` `"files"`-block + default files (package.json, README, LICENSE).

\***Semantically**: big breaking changes is a major release, general changes or bug fixes are minor releases and patches are just some general maintenance or refactoring.

# How to contribute

Create issues or PRs for bug reports/feedback/feature requests.

# SEO Tools

- https://search.google.com/test/rich-results
- https://search.google.com/structured-data/testing-tool
- https://developers.facebook.com/tools/debug/sharing/
- https://cards-dev.twitter.com/validator
- https://developers.google.com/speed/pagespeed/insights

# Other resources about SEO in general

- https://blog.realmacsoftware.com/which-meta-tags-matter-for-seo-in-2018/
- https://developers.facebook.com/docs/sharing/webmasters#markup
- https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/markup.html
- https://developers.google.com/search/docs/data-types/article
- https://salon.thefamily.co/the-google-seo-bible-everything-a-startup-needs-to-know-a60dbac2d060
- https://htmlhead.dev

## Open Graph

Metadata format developed by Facebook.

http://ogp.me/
