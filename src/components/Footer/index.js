import React from "react"
import "./style.css"

import { Copyright } from "@material-ui/icons"

const Footer = ({ children }) => {
  return (
    <footer>
      <div className="copyright">
        &copy; Klous - {new Date().getFullYear()}{" "}
      </div>
    </footer>
  )
}

export default Footer
