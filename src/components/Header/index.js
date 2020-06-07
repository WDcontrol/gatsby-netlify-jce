import { navigate, Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useState } from "react"
import IdentityModal, {
  useIdentityContext,
} from "react-netlify-identity-widget"
import "react-netlify-identity-widget/styles.css" // delete if you want to bring your own CS
import "./style.css"
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket"
import { CartContext } from "../../context/cartContext"

const Header = () => {
  const identity = useIdentityContext()
  const [dialog, setDialog] = useState(false)
  const name =
    (identity &&
      identity.user &&
      identity.user.user_metadata &&
      identity.user.user_metadata.full_name) ||
    "NoName"
  const isLoggedIn = identity && identity.isLoggedIn

  const onChange = e => {
    navigate(`/${e.target.value}`)
  }

  const CustomOption = data => {
    // set active select
    if (typeof window !== "undefined") {
      let selected = window.location.pathname === data.value ? true : false
      return (
        <option selected={selected} value={data.value}>
          {data.label}
        </option>
      )
    }
    return <option></option>
  }

  return (
    <CartContext.Consumer>
      {cart => {
        const cartSize = Object.keys(cart.cart).length
        return (
          <header>
            {JSON.stringify(cart)}
            <nav className="header__nav">
              <Link className="nav__main-link" to="/">
                Klous
              </Link>
              <div className="nav__select-container">
                <select onChange={onChange} className="nav__select">
                  <CustomOption value="/" label="Home" />
                  <CustomOption value="/products" label="Products" />
                  <CustomOption value="/contact" label="Contacts" />
                  <CustomOption value="/blog" label="Blog" />
                  <CustomOption value="/profile" label="Profile" />
                  <CustomOption value="/cart" label="Cart" />
                </select>
              </div>
              <div className="nav__section">
                <div className="nav__link" onClick={() => setDialog(true)}>
                  {isLoggedIn ? `${name}` : `Log In`}
                </div>
                <Link to="/cart">
                  <ShoppingBasketIcon className="nav__link" />
                  {cartSize > 0 && (
                    <div className="nav__link_notif">{cartSize}</div>
                  )}
                </Link>
              </div>
            </nav>
            <IdentityModal
              showDialog={dialog}
              onCloseDialog={() => setDialog(false)}
            />
          </header>
        )
      }}
    </CartContext.Consumer>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
