import React, { useState } from "react"
import Header from "../Header"
import "./index.css"
import { CartContext } from "../../context/cartContext"

const Index = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  )
}
export default Index
