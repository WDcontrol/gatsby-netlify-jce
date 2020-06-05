import { graphql } from "gatsby"
import Layout from "../components/Layout"
import React from "react"

export const query = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        title
        price
        description
        image
        slug
      }
    }
  }
`

export default ({ data }) => {
  const addItem = () => {}

  return (
    <Layout>
      <h1>{data.markdownRemark.frontmatter.title}</h1>
      <button onClick={addItem}>elem</button>
    </Layout>
  )
}
