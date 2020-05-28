exports.createPages = async function ({ actions, graphql }) {
  const products = await graphql(`
    query myQuery {
      allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/products/" } }) {
        edges {
          node {
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `)

  const articles = await graphql(`
    query myQuery {
      allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/articles/" } }) {
        edges {
          node {
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `)

  products.data.allMarkdownRemark.edges.forEach(edge => {
    const slug = edge.node.frontmatter.slug
    actions.createPage({
      path: "/products/" + slug,
      component: require.resolve("./src/templates/productTemplate.js"),
      context: { slug: slug },
    })
  })

  articles.data.allMarkdownRemark.edges.forEach(edge => {
    const slug = edge.node.frontmatter.slug
    actions.createPage({
      path: "/articles/" + slug,
      component: require.resolve("./src/templates/articleTemplate.js"),
      context: { slug: slug },
    })
  })
}
