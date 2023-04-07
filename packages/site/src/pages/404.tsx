import * as React from 'react'
import { graphql } from 'gatsby'

import { Layout } from '../components/Layout'
import SEO from '../components/SEO'

import { SiteData } from '../types/graphql'

interface Props {
  data: {
    site: SiteData
  }
  location: any
}

const NotFoundPage = ({ data, location }: Props) => {
  const siteTitle = data.site.siteMetadata.title
  return (
    <Layout site={data.site} title={siteTitle}>
      <h1>404: Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  )
}

export const Head = () => <SEO title="404: Not Found" />

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      ...SiteData
    }
  }
`
