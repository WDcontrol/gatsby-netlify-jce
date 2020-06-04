import React from "react"
import Layout from "../components/Layout"
import SEO from "../components/seo"
import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a loader
import { Carousel } from "react-responsive-carousel"
import "./index.scss"

export const query = graphql`
  query goldish {
    allMarkdownRemark(
      limit: 3
      filter: {
        fileAbsolutePath: { regex: "/products/" }
        frontmatter: { gold: { eq: true } }
      }
    ) {
      edges {
        node {
          frontmatter {
            title
            price
            image
            description
          }
        }
      }
    }
  }
`

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <Carousel width="50%">
      {data.allMarkdownRemark.edges.map(product => {
        return (
          <div>
            <img src={product.node.frontmatter.image} alt="" />
            <p className="legend">{product.node.frontmatter.title}</p>
          </div>
        )
      })}
    </Carousel>
  </Layout>
)

export default IndexPage
