declare module 'react-seo' {
  export interface ReactSEOProps {
    title: string
    date: string
    tags?: string[]
    url: string
    description: string
    ogType: 'website' | 'article'
    website?: {
      siteName: string
    }
    article?: {
      datePublished?: string
      dateCreated?: string
      dateModified?: string
    }
  }
  export class ReactSEO extends React.PureComponent<ReactSEOProps> {}
}
