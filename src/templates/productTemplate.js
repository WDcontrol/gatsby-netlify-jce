import { graphql } from "gatsby"
import Layout from "../components/Layout"
import React, { useContext } from "react"
import { CartContext } from "../context/cartContext"

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
  const Render = () => {
    const cart = useContext(CartContext)
    const slug = data.markdownRemark.frontmatter.slug
    return (
      <Layout>
        <h1>{data.markdownRemark.frontmatter.title}</h1>
        <button onClick={() => cart.addItem(slug)}>elem</button>
      </Layout>
    )
  }

  return <Render />
}
