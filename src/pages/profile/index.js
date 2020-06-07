import React from "react"
import "./index.scss"
import Layout from "../../components/Layout"
import { useIdentityContext } from "react-netlify-identity-widget"

const Profile = () => {
  const identity = useIdentityContext()

  const isLoggedIn = identity && identity.isLoggedIn
  console.log(identity.user)
  const handleChange = () => {
    identity.setUser({
      cart: {
        elem: 1,
      },
      ...identity.user,
    })
  }
  return (
    <Layout>
      {isLoggedIn ? (
        <div style={{ textAlign: "center" }}>
          {/* <div>Name : {identity.user.user_metadata.full_name}</div>
          <div>Mail : {identity.user.email}</div> */}

          <button onClick={handleChange}>handleChange</button>
        </div>
      ) : (
        <div style={{ textAlign: "center", paddingTop: "50px" }}>
          Connect to see your informations
        </div>
      )}
    </Layout>
  )
}

export default Profile
