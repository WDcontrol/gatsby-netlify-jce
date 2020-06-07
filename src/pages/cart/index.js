import React, { useContext } from "react"
import Layout from "../../components/Layout"
import { CartContext } from "../../context/cartContext"

const Cart = () => {
  const cart = useContext(CartContext)
  return (
    <Layout>
      {Object.keys(cart.cart).map(elem => (
        <>
          <h1>{cart.cart[elem]}</h1>
          <h1>{elem}</h1>
        </>
      ))}
    </Layout>
  )
}

export default Cart
