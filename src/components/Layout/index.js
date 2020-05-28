import React from "react"
import Header from "../Header"
import Footer from "../Footer"
import "./index.css"

const index = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  )
}
export default index
