import React from "react"
import Layout from "../../components/Layout"
import { graphql } from "gatsby"
import "./index.scss"

export const query = graphql`
  query myQuery {
    allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/products/" } }) {
      edges {
        node {
          frontmatter {
            title
            price
            image
          }
        }
      }
    }
  }
`

const Products = ({ data }) => {
  return (
    <Layout>
      <div className="products">
        <div className="products__list">
          {data.allMarkdownRemark.edges.map(product => {
            return (
              <div className="product">
                <div className="product__elem__title">
                  {product.node.frontmatter.title}
                </div>
                <div className="product__elem__price">
                  {product.node.frontmatter.price}
                </div>
                <div className="product__elem__image">
                  <img src={product.node.frontmatter.image} alt="" />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}

Products.propTypes = {}

export default Products
