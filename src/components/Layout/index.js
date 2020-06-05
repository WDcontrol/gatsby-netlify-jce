import React from "react"
import Header from "../Header"
import "./index.css"
import { CartProvider } from "../../context/cart"

const index = ({ children }) => {
  return (
    <CartProvider>
      <Header />
      <main>{children}</main>
    </CartProvider>
  )
}
export default index
