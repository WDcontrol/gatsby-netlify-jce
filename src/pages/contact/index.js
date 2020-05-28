import React from "react"
import Layout from "../../components/Layout"

const Contact = () => {
  return (
    <Layout>
      <form
        name="contact"
        method="post"
        netlify-honeypot="bot-field"
        data-netlify="true"
        action="/success"
      >
        <input type="hidden" name="form-name" value="contact" />
        <p>
          <label>
            Your Name: <input type="text" name="name" />
          </label>
        </p>
        <p>
          <label>
            Your Email: <input type="email" name="email" />
          </label>
        </p>
        <p>
          <label>
            Message: <textarea name="message"></textarea>
          </label>
        </p>
        <p>
          <button type="submit">Send</button>
        </p>
      </form>
    </Layout>
  )
}

export default Contact
