import React, { useState } from "react"

const Index = () => {
  const submitForm = () => {
    e.preventDefault()
    console.log(inputForm)
  }

  return (
    <div>
      <form onSubmit={submitForm}>
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  )
}

export default Index
