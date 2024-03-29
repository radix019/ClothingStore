import { loadStripe } from "@stripe/stripe-js";

export const stripe = loadStripe(
  process.env?.REACT_APP_STRIPE_PUBLISHABLE_KEY as string
);
