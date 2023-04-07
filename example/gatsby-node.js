const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  // Select only markdown-nodes picked up by 'gatsby-transformer-remark'
  if (node.internal.type === 'MarkdownRemark') {
    // Generate a slug name from the file name
    const filePath = node.fileAbsolutePath
    const lastSlashIndex = filePath.lastIndexOf('/')
    const slug = `/blog${filePath.substring(lastSlashIndex).split('.')[0]}`
    // This will add a 'slug'-field to the file-node's 'fields' -object
    createNodeField({
      node,
      name: 'slug',
      value: slug
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    {
      posts: allFile(
        filter: { relativePath: { glob: "**/*.md" } }
        sort: { fields: relativePath, order: DESC }
      ) {
        edges {
          node {
            id
            relativePath
            childMarkdownRemark {
              frontmatter {
                datePublished(formatString: "YYYY-MM-DD")
                dateModified(formatString: "YYYY-MM-DD")
                title
                description
                tags
                images {
                  name
                }
              }
              fields {
                slug
              }
            }
          }
        }
      }
    }
  `)
  if (result.errors) {
    throw Error('createPages graphql query threw an error: \n' + result.errors[0])
  }
  const nodes = result.data.posts.edges.map(
    ({ node: { childMarkdownRemark } }) => childMarkdownRemark
  )
  nodes.forEach((node, i) => {
    const previousNode = i !== nodes.length - 1 ? nodes[i + 1] : undefined
    const nextNode = i !== 0 ? nodes[i - 1] : undefined
    const getSlug = node => (node ? node.fields.slug : undefined)
    const getPostAttribute = (node, attr) => (node ? node.frontmatter[attr] : undefined)
    const image = (node.frontmatter.images && node.frontmatter.images[0].name) || undefined
    createPage({
      path: getSlug(node),
      component: path.resolve('./src/templates/BlogPost.tsx'),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: getSlug(node),
        imageRegex: `/${image}/`,
        // Add previous and next pages for easy pagination of blog posts
        previous: {
          slug: getSlug(previousNode),
          title: getPostAttribute(previousNode, 'title'),
          datePublished: getPostAttribute(previousNode, 'datePublished')
        },
        next: {
          slug: getSlug(nextNode),
          title: getPostAttribute(nextNode, 'title'),
          datePublished: getPostAttribute(nextNode, 'datePublished')
        }
      }
    })
  })
}
