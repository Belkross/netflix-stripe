import Stripe from "stripe"

export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || "invalid stripe secret key"

export const STRIPE_CONFIG: Stripe.StripeConfig = {
	apiVersion: "2022-11-15",
}

export const PORT = process.env.PORT || 1000
