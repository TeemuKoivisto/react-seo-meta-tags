import * as React from 'react'
import Helmet, { HelmetTags } from 'react-helmet'
import { mount } from 'enzyme'
import { create } from 'react-test-renderer'

import { ReactSEOMetaTags } from '../src/ReactSEOMetaTags'

import {
  fullWebsiteData, fullWebsiteMetaTags, fullWebsiteJSONLD,
  fullBlogPost, facebookData, twitterData, breadcrumb
} from './examples'

describe('<ReactSEOMetaTags />', () => {
  test('Renders correctly when placed inside head tag', () => {
    const testRenderer = create(
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <ReactSEOMetaTags website={fullWebsiteData}/>
        </head>
        <body>
          <main>Body</main>
        </body>
      </html>
    )
    const json = testRenderer.toJSON()
    expect(json).toMatchSnapshot()
  })
  test('Renders correctly with react-helmet', () => {
    // https://github.com/nfl/react-helmet/issues/381
    // https://github.com/nfl/react-helmet/issues/168#issuecomment-245349049
    mount(
      <div>
        <ReactSEOMetaTags
          render={(el: React.ReactNode) => <Helmet>{el}</Helmet>}
          website={fullWebsiteData}
        />
        <main>Body</main>
      </div>
    )
    const helmet = Helmet.peek()
    // The types are out of sync with this helmet version..
    const { metaTags, scriptTags } = helmet as unknown as HelmetTags
    expect(helmet.title).toEqual(fullWebsiteData.title)
    expect(metaTags).toEqual(fullWebsiteMetaTags)
    const JSONLD = scriptTags.find(t => t.type === 'application/ld+json')
    expect({ type: JSONLD?.type, innerHTML: JSON.parse(JSONLD?.innerHTML || '') }).toEqual({
      type: 'application/ld+json',
      innerHTML: fullWebsiteJSONLD,
    })
  })
  test('Renders correctly with blog post', () => {
    const testRenderer = create(
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <ReactSEOMetaTags website={fullWebsiteData} blogPost={fullBlogPost}/>
        </head>
        <body>
          <main>Body</main>
        </body>
      </html>
    )
    const json = testRenderer.toJSON()
    expect(json).toMatchSnapshot()
  })
  test('Renders correctly with all the metadata defined', () => {
    const testRenderer = create(
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <ReactSEOMetaTags
            website={fullWebsiteData}
            blogPost={fullBlogPost}
            breadcrumb={breadcrumb}
            organization={{
              name: 'Google',
              legalName: 'Google Inc',
              url: 'https://google.com',
              logo: 'https://google.com/logo.jpg'
            }}
            facebook={facebookData}
            twitter={twitterData}
          />
        </head>
        <body>
          <main>Body</main>
        </body>
      </html>
    )
    const json = testRenderer.toJSON()
    expect(json).toMatchSnapshot()
  })
})
