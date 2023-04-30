import { AsyncOutcome, PayloadPostSubscription } from "@belkross-stripe/types"
import Stripe from "stripe"
import { PRODUCT_TYPE } from "../assets/products"
import { stripe } from "../server"

type Parameters = {
	multiUser: boolean | undefined
	premium: boolean
	email: string
}

export async function postSubscription(parameters: Parameters): Promise<AsyncOutcome<PayloadPostSubscription>> {
	const { email, multiUser, premium } = parameters

	try {
		let searchCustomerResult = await stripe.customers.search({
			query: `email:'${email}'`,
		})
		const customerNotFound = searchCustomerResult.data.length === 0
		if (customerNotFound) throw new Error("Customer not found during subscription creation")

		const searchPriceResult = await stripe.prices.search({
			query: `metadata['productType']:'${PRODUCT_TYPE}' metadata['multiUser']:'${multiUser}'  metadata['premium']:'${premium}'`,
		})
		const priceNotFound = searchPriceResult.data.length === 0
		if (priceNotFound) throw new Error("Price not found during subscription")

		const subscription = await stripe.subscriptions.create({
			customer: searchCustomerResult.data[0].id,
			items: [
				{
					price: searchPriceResult.data[0].id,
				},
			],
			payment_behavior: "default_incomplete",
			expand: ["latest_invoice.payment_intent"],
		})

		const latestInvoice = subscription.latest_invoice as Stripe.Invoice
		const paymentIntent = latestInvoice.payment_intent as Stripe.PaymentIntent

		const payload: PayloadPostSubscription = { subscription, clientSecret: paymentIntent.client_secret ?? "" }

		return { succeeded: true, payload }
	} catch (error) {
		console.error(error)
		return { succeeded: false }
	}
}
