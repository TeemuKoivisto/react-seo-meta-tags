export const fullWebsiteData = {
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

export const fullWebsiteMetaTags = [
  {
    name: 'description',
    content: "This is a 200 character long description of this web page which is quite interesting and which describes its contents well with a lot of relevant keywords and isn't just general marketing mumbo-jumbo."
  },
  { name: 'image', content: 'http://website.com/image.png' },
  { property: 'og:type', content: 'website' },
  { property: 'og:url', content: 'https://google.com/about' },
  { property: 'og:locale', content: 'en-US' },
  {
    property: 'og:title',
    content: 'This is a 70 character long title with a lot of padding to make it so!'
  },
  {
    property: 'og:description',
    content: "This is a 200 character long description of this web page which is quite interesting and which describes its contents well with a lot of relevant keywords and isn't just general marketing mumbo-jumbo."
  },
  { property: 'og:image', content: 'http://website.com/image.png' },
  { property: 'og:site_name', content: 'IMDb' },
  { name: 'twitter:card', content: 'summary_large_image' },
  {
    name: 'twitter:title',
    content: 'This is a 70 character long title with a lot of padding to make it so!'
  },
  {
    name: 'twitter:description',
    content: "This is a 200 character long description of this web page which is quite interesting and which describes its contents well with a lot of relevant keywords and isn't just general marketing mumbo-jumbo."
  },
  { name: 'twitter:image', content: 'http://website.com/image.png' }
]

export const fullWebsiteJSONLD = [
  {
    "@context": "http://schema.org",
    "@type": "WebPage",
    "datePublished": "2019-10-06T13:56:03.123Z",
    "description": "This is a 200 character long description of this web page which is quite interesting and which describes its contents well with a lot of relevant keywords and isn't just general marketing mumbo-jumbo.",
    "image": "http://website.com/image.png",
    "inLanguage": "en-US",
    "name": "This is a 70 character long title with a lot of padding to make it so!",
    "url": "https://google.com/about",
    "author": {
      "@type": "Person",
      "name": "John Smith",
      "email": "person@gmail.com",
      "image": "http://john.me/my-face.jpg"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.google.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  },
  null,
  null
]

export const fullPerson = {
  email: 'person@gmail.com',
  name: 'John Smith',
  image: 'http://john.me/my-face.jpg',
}

export const fullOrganization = {
  '@type': 'Corporation',
  description: 'A software engineering consultancy',
  name: 'Bugs and code',
  legalName: 'Bug and code Inc.',
  logo: 'https://bugsandcode.com/logo.png',
  // List of other webpages referencing this organization, eg Wikipedia, Facebook, Twitter, Instagram etc.
  // Will show these sites alongside your website in Google search results and probably boost your SEO rank too.
  sameAs: ['https://en.wikipedia.org/wiki/Enron'],
  url: 'https://bugsandcode.com',
}

export const fullBlogPost = {
  url: 'https://myblog.xyz/articles/what-is-react',
  image: 'https://myblog.xyz/images/react.png',
  title: 'Is it a bird, is it a plane? Or is it React?',
  datePublished: '2020-12-20T02:11:51.893Z',
  dateModified: '2020-12-20T02:11:51.893Z',
  description: 'This post explains everything you need to know about React.',
  tags: ['react', 'javascript', 'programming', 'frontend development'],
  facebookAppId: 'this is a fb app id',
  author: fullPerson,
  publisher: fullOrganization,
  site: {
    siteName: 'Amazon Inc.'
  }
}

export const breadcrumb = [
  {
    url: 'https://example.com/dresses',
    title: 'Dresses',
    image: 'https://example.com/dresses.jpg',
  },
  {
    url: 'https://example.com/dresses-real',
    title: 'Real Dresses',
    image: 'https://example.com/real-dresses.gif',
  }
]