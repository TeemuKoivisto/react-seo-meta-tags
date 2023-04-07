// If you don't want to use TypeScript you can delete this file!
import * as React from 'react'
import { PageProps, Link, graphql, HeadFC } from 'gatsby'

import Layout from '../components/layout'
import Seo from '../components/seo'

type DataProps = {
  site: {
    buildTime: string
  }
}

const UsingTypescript: React.FC<PageProps<DataProps>> = ({ data, path, location }) => (
  <Layout title="Using TypeScript" location={location}>
    <h1>Gatsby supports TypeScript by default!</h1>
    <p>
      This means that you can create and write <code>.ts/.tsx</code> files for your pages,
      components, and <code>gatsby-*</code> configuration files (for example{' '}
      <code>gatsby-config.ts</code>).
    </p>
    <p>
      For type checking you'll want to install <em>typescript</em> via npm and run{' '}
      <em>tsc --init</em> to create a <em>tsconfig</em> file.
    </p>
    <p>
      You're currently on the page "{path}" which was built on {data.site.buildTime}.
    </p>
    <p>
      To learn more, head over to our{' '}
      <a href="https://www.gatsbyjs.com/docs/how-to/custom-configuration/typescript/">
        documentation about TypeScript
      </a>
      .
    </p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export const Head: HeadFC<DataProps> = () => <Seo title="Using TypeScript" />

export default UsingTypescript

export const query = graphql`
  {
    site {
      buildTime(formatString: "YYYY-MM-DD hh:mm a z")
    }
  }
`
