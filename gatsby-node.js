exports.createPages = async function ({ actions, graphql }) {
  const products = await graphql(`
    query myQuery {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `)

  const articles = await graphql(`
    query myQuery {
      allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/product/" } }) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `)

  products.data.allMarkdownRemark.edges.forEach(edge => {
    const path = edge.node.frontmatter.path
    actions.createPage({
      path: path,
      component: require.resolve("./src/templates/productTemplate.js"),
      context: { path: path },
    })
  })

  articles.data.allMarkdownRemark.edges.forEach(edge => {
    const path = edge.node.frontmatter.path
    actions.createPage({
      path: path,
      component: require.resolve("./src/templates/articleTemplate.js"),
      context: { path: path },
    })
  })
}
