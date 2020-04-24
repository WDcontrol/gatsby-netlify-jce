import React from "react"

import { loadStripe } from "@stripe/stripe-js"

const Index = () => {
  const stripePromise = loadStripe("pk_test_0T41rHaGWQh5lb1ZxBa9Duuh00W7nRfNzd")
  const checkoutButton = async e => {
    e.preventDefault()

    const stripe = await stripePromise

    stripe.redirectToCheckout({
      items: [
        {
          // Define the product and SKU in the Dashboard first, and use the SKU
          // ID in your client-side code.
          sku: "sku_H9mYBvTf8kT9Rj",
          quantity: 1,
        },
      ],
      successUrl: "https://zealous-clarke-80bed4.netlify.app/success",
      cancelUrl: "https://zealous-clarke-80bed4.netlify.app/cancel",
    })
  }

  return (
    <div>
      <form onSubmit={checkoutButton}>
        <button type="submit">Payer</button>
      </form>
    </div>
  )
}

export default Index
