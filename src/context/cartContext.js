import React from "react"
import { useState, useEffect } from "react"

const defaultCart = JSON.parse(localStorage.getItem("cart")) || {}

const defaultState = {
  cart: {},
  addItem: () => {},
}

const CartContext = React.createContext(defaultState)

const CartProvider = props => {
  const [cart, setCart] = useState(defaultCart)

  const addItem = slug => {
    cart[slug] && setCart({ ...cart, [slug]: cart[slug] + 1 })
    !cart[slug] && setCart({ ...cart, [slug]: 1 })
  }

  const emptyCart = () => {
    setCart({})
  }

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  })

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem: addItem,
      }}
    >
      {props.children}
    </CartContext.Provider>
  )
}

export { CartContext, CartProvider }
