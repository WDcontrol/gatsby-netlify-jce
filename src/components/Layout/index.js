import React from "react"
import Header from "../Header"
import "./index.css"

const Index = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  )
}
export default Index
