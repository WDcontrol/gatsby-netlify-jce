import React, { useReducer, useEffect } from "react"

let reducer = (info, newInfo) => {
  if (newInfo === null) {
    localStorage.removeItem("cart")
    return initialState
  }
  return { ...info, ...newInfo }
}

// initial state
const initialState = {
  products: {},
}

// localState = localStorage
const localState = JSON.parse(localStorage.getItem("cart"))

const CartContext = React.createContext()

function CartProvider(props) {
  const [cart, setCart] = useReducer(reducer, localState || initialState)

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {props.children}
    </CartContext.Provider>
  )
}

export { CartContext, CartProvider }
