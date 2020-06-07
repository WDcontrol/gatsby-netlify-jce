import React from "react"
import Layout from "../../components/Layout"
import { graphql } from "gatsby"
import "./index.scss"
import { Link } from "gatsby"

export const query = graphql`
  query myQuery {
    allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/products/" } }) {
      edges {
        node {
          frontmatter {
            title
            price
            image
            description
            slug
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
        <div className="product__filter-bar"></div>
        <div className="products__list">
          {data.allMarkdownRemark.edges.map(product => {
            return (
              <Link
                key={product}
                className="product"
                to={`/products/${product.node.frontmatter.slug}`}
              >
                <div className="product__elem_image product__elem">
                  <img src={product.node.frontmatter.image} alt="" />
                </div>
                <div className="product__elem_title product__elem">
                  {product.node.frontmatter.title}
                </div>
                <div className="product__elem_price product__elem">
                  {product.node.frontmatter.price}€
                </div>
                <div className="product__elem_desc product__elem">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non
                  nam animi deleniti omnis blanditiis! Voluptates fuga ullam
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}

Products.propTypes = {}

export default Products
