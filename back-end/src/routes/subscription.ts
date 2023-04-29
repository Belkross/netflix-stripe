import { Router, Request, Response } from "express"
import { stripe } from "../server"
import { PRODUCT_TYPE } from "../assets/products"
import Stripe from "stripe"

export const routerSubscription = Router()

routerSubscription.post("/", async (req: Request, res: Response) => {
	try {
		const { customerEmail, multiUser, premium } = req.body

		let searchCustomerResult = await stripe.customers.search({
			query: `email:'${customerEmail}'`,
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

		res.json({
			thing: subscription.latest_invoice,
			subscription,
			clientSecret: paymentIntent.client_secret,
			success: true,
		})
	} catch (error) {
		console.error(error)
		res.status(400).json({ success: false })
	}
})
