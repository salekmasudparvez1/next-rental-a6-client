"use server"

import {loadStripe} from "@stripe/stripe-js"

export const getStripe = async()=>{
  const res = await loadStripe(process.env.NEXT__STRIPE_PUBLISHABLE_KEY!)
  return res
}