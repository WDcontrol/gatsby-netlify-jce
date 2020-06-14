import React, { useContext, useState, useEffect } from "react"
import Layout from "../../components/Layout"
import { CartContext } from "../../context/cartContext"
import "./index.scss"

import { loadStripe } from "@stripe/stripe-js"

import { Add, Remove, Delete } from "@material-ui/icons"

export const query = graphql`
  query cart {
    allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/products/" } }) {
      edges {
        node {
          frontmatter {
            title
            price
            image
            description
            slug
            price_stripe
          }
        }
      }
    }
  }
`

const Cart = ({ data }) => {
  const cart = useContext(CartContext)
  const stripePromise = loadStripe("pk_test_0T41rHaGWQh5lb1ZxBa9Duuh00W7nRfNzd")

  const getProductBySlug = slug =>
    data.allMarkdownRemark.edges.find(x => x.node.frontmatter.slug === slug)
      .node.frontmatter

  const lineItems = Object.keys(cart.cart).reduce((acc, curr, id) => {
    const product = getProductBySlug(curr)
    const item = {
      price: product.price_stripe,
      quantity: Object.values(cart.cart)[id],
    }
    return [...acc, item]
  }, [])

  const checkoutButton = async e => {
    e.preventDefault()
    const stripe = await stripePromise
    stripe.redirectToCheckout({
      lineItems: lineItems,
      mode: "payment",
      successUrl: "https://zealous-clarke-80bed4.netlify.app/success",
      cancelUrl: "https://zealous-clarke-80bed4.netlify.app/cart",
    })
  }

  const amount = Object.keys(cart.cart).reduce((acc, curr, id) => {
    const product = getProductBySlug(curr)
    const price = parseInt(product.price)
    const quantity = Object.values(cart.cart)[id]
    const calculation = price * quantity
    return acc + calculation
  }, 0)

  return (
    <Layout>
      <div className="cart">
        <div className="cart__elems">
          {Object.keys(cart.cart).map(slug => {
            const quantity = cart.cart[slug]
            const product = getProductBySlug(slug)
            return (
              <div className="cart__elems__elem">
                <div className="elem">
                  <div className="elem__attributes">
                    <div className="elem__attributes__image">
                      <img src={product.image} alt={product.slug} />
                    </div>
                    <div className="elem__attributes__title">
                      {product.title}
                    </div>
                  </div>
                  <div className="elem__actions">
                    <div className="elem__actions__button elem__actions__button_less">
                      <Remove onClick={() => cart.removeItem(product.slug)} />
                    </div>
                    <div className="elem__actions__quantity">{quantity}</div>
                    <div className="elem__actions__button elem__actions__button_more">
                      <Add onClick={() => cart.addItem(product.slug)} />
                    </div>
                    <div className="elem__actions__button elem__actions__button_delete">
                      <Delete onClick={() => cart.deleteItem(product.slug)} />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <div className="cart__checkout">
          <div className="cart__checkout__amount">Total : {amount} €</div>
          <div className="cart__checkout__button">
            <button onClick={checkoutButton}>Checkout</button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Cart
