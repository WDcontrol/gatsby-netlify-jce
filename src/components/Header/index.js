import { navigate, Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useState, useContext } from "react"
import IdentityModal, {
  useIdentityContext,
} from "react-netlify-identity-widget"
import "react-netlify-identity-widget/styles.css" // delete if you want to bring your own CS
import "./style.css"
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket"
import { CartContext } from "../../context/cartContext"

const Header = () => {
  const cart = useContext(CartContext)
  const cartSize = Object.keys(cart.cart).length

  const identity = useIdentityContext()
  const [dialog, setDialog] = useState(false)
  const name =
    (identity &&
      identity.user &&
      identity.user.user_metadata &&
      identity.user.user_metadata.full_name) ||
    "NoName"
  const isLoggedIn = identity && identity.isLoggedIn

  return (
    <header>
      <nav className="header__nav">
        <Link className="nav__main-link" to="/">
          Klous
        </Link>
        <div className="nav__select-container">
          <Link to="/products">Products</Link>
          <Link to="/blog">Blog</Link>
        </div>
        <div className="nav__section">
          <div className="nav__link" onClick={() => setDialog(true)}>
            {isLoggedIn ? `${name}` : `Log In`}
          </div>
          <Link to="/cart">
            <ShoppingBasketIcon className="nav__link" />
            {cartSize > 0 && <div className="nav__link_notif">{cartSize}</div>}
          </Link>
        </div>
      </nav>
      <IdentityModal
        showDialog={dialog}
        onCloseDialog={() => setDialog(false)}
      />
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
