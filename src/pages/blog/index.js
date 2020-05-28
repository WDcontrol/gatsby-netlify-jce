import React from "react"
import Layout from "../../components/Layout"
import "./index.scss"

const Blog = () => {
  return (
    <Layout>
      <div className="Blog">
        <div className="article">
          <div className="article__item">
            <div className="article__item__img"></div>
            <div className="article__item__title"></div>
            <div className="article__item__short-desc"></div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Blog
