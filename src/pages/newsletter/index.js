import React, { useState } from "react"
import axios from "axios"

const Index = () => {
  const [inputForm, setInputForm] = useState({
    email: "",
  })

  const handleChange = e => [
    setInputForm({
      [e.target.name]: e.target.value,
    }),
  ]

  const submitForm = e => {
    e.preventDefault()
    console.log(inputForm)
    axios
      .post(
        `https://zealous-clarke-80bed4.netlify.app/.netlify/functions/subscibe?mail=${inputForm.email}`
      )
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })

    return (
      <div>
        <form onSubmit={submitForm}>
          <input
            type="email"
            value={inputForm.email}
            name="email"
            onChange={handleChange}
          />
          <button type="submit">S'inscrire</button>
        </form>
      </div>
    )
  }
}

export default Index
