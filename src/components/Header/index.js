import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import IdentityModal, {
  useIdentityContext,
} from "react-netlify-identity-widget"
import "react-netlify-identity-widget/styles.css" // delete if you want to bring your own CS
import "./style.css"

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

  console.log(JSON.stringify(identity))

  return (
    <header>
      <nav className="header__nav">
        <select className="nav__item">
          <option value="">Eshop</option>
          <Link to="/products">Eshop</Link>
        </select>
        <div className="toolbar">
          <button className="btn" onClick={() => setDialog(true)}>
            {isLoggedIn ? `Hello ${name}, Log out here!` : "LOG IN"}
          </button>
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
