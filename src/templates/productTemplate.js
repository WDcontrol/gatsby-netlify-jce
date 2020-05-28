import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"

export const query = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        title
        price
        description
        image
      }
    }
  }
`

export default ({ data }) => {
  return (
    <Layout>
      <h1>{data.markdownRemark.frontmatter.title}</h1>
    </Layout>
  )
}
