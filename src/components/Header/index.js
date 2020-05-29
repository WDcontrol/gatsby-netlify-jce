import { navigate, Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import IdentityModal, {
  useIdentityContext,
} from "react-netlify-identity-widget"
import "react-netlify-identity-widget/styles.css" // delete if you want to bring your own CS
import "./style.css"
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket"
const Header = () => {
  const identity = useIdentityContext()
  const [dialog, setDialog] = React.useState(false)
  const name =
    (identity &&
      identity.user &&
      identity.user.user_metadata &&
      identity.user.user_metadata.name) ||
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
    <header>
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
          </select>
        </div>
        <div className="nav__section">
          <div className="nav__link" onClick={() => setDialog(true)}>
            {isLoggedIn ? `Hello ${name}, Log out here!` : `Log In`}
          </div>
          <ShoppingBasketIcon className="nav__link" />
          <div className="nav__link_notif">1</div>
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
