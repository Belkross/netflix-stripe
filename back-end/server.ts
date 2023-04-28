import * as dotenv from "dotenv"
dotenv.config()

import express, { Request, Response } from "express"
import Stripe from "stripe"
import cors from "cors"
import bodyParser from "body-parser"
import { createProductsAndPrices } from "./assets/create-products-and-prices"
import { PRODUCT_TYPE } from "./assets/products"
import { PORT, STRIPE_CONFIG, STRIPE_SECRET_KEY } from "./config/config"
import { corsOptions } from "./config/cors"

const app = express()
const stripe = new Stripe(STRIPE_SECRET_KEY, STRIPE_CONFIG)
createProductsAndPrices(stripe)

//Middlewares
app.use(cors(corsOptions))
app.use(bodyParser.json())

//Routes
app.post("/create-customer", async (req: Request, res: Response) => {
	try {
		const { email } = req.body
		const searchResult = await stripe.customers.search({ query: `email:'${email}'` })

		const noCustomerFound = searchResult.data.length === 0
		if (noCustomerFound) {
			await stripe.customers.create({ email })
			console.log(`customer created: ${email}`)
		} else {
			console.log(`customer found: ${email}`)
		}

		res.json({ success: true })
	} catch (error) {
		console.error(error)
		res.status(400).json({ success: false })
	}
})

app.get("/get-products", async (req: Request, res: Response) => {
	try {
		const searchResult = await stripe.products.search({
			query: `metadata['productType']:'${PRODUCT_TYPE}' metadata['premium']:'false'`,
		})

		const productsNotReadyYet = searchResult.data.length === 0
		if (productsNotReadyYet) throw new Error()
		else res.json({ products: searchResult.data, success: true })
	} catch (error) {
		console.error(error)
		res.status(400).json({ success: false })
	}
})

app.post("/create-subscription", async (req: Request, res: Response) => {
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

		const latestInvoice = await stripe.invoices.retrieve(subscription.latest_invoice as string)
		const paymentIntent = await stripe.paymentIntents.retrieve(latestInvoice.payment_intent as string)

		res.json({
			subscription,
			clientSecret: paymentIntent.client_secret,
			success: true,
		})
	} catch (error) {
		console.error(error)
		res.status(400).json({ success: false })
	}
})

app.listen(PORT, () => {
	console.log(`server connected at port ${PORT}`)
})
