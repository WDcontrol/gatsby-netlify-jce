import React from "react"
import { useState, useEffect } from "react"

var _ = require("lodash")

const isBrowser = () => typeof window !== "undefined"

const defaultCart = isBrowser()
  ? JSON.parse(localStorage.getItem("cart")) || {}
  : {}

const defaultState = {
  cart: {},
  addItem: () => {},
  removeItem: () => {},
  emptyCart: () => {},
  deleteItem: () => {},
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

  const removeItem = slug => {
    cart[slug] && cart[slug] > 0 && setCart({ ...cart, [slug]: cart[slug] - 1 })
  }

  const deleteItem = slug => {
    setCart(_.omit(cart, slug))
  }

  useEffect(() => {
    isBrowser() && localStorage.setItem("cart", JSON.stringify(cart))
  })

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem: addItem,
        removeItem: removeItem,
        emptyCart: emptyCart,
        deleteItem: deleteItem,
      }}
    >
      {props.children}
    </CartContext.Provider>
  )
}

export { CartContext, CartProvider }
