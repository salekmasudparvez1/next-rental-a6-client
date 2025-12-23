"use server"

import {loadStripe} from "@stripe/stripe-js"

export const getStripe = async()=>{
  const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string | undefined;
  if (!key) {
    console.error("Stripe publishable key missing (NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)");
    return null;
  }
  const res = await loadStripe(key)
  return res
}