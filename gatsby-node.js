/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

exports.CreatePages = async ({ actions, graphql }) => {
  const products = await graphql(`
    query MyQuery {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              description
              image
              price
              title
            }
            fileAbsolutePath
          }
        }
      }
    }
  `)

  products.allMarkdownRemark.edges.forEach(edge => {
    const path = edge.node.frontmatter.path
    actions.createPages({
      path: path,
      component: require.resolve("./src/templates/productTemplate.js"),
      context: { path: path },
    })
  })
}
