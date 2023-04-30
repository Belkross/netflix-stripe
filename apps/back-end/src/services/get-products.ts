import { AsyncOutcome } from "@belkross-stripe/types"
import { PRODUCT_TYPE } from "../assets/products"
import Stripe from "stripe"
import { stripe } from "../server"

export async function getProducts(): Promise<AsyncOutcome<Stripe.Product[]>> {
	try {
		const searchResult = await stripe.products.search({
			query: `metadata['productType']:'${PRODUCT_TYPE}' metadata['premium']:'false'`,
		})

		return { succeeded: true, payload: searchResult.data }
	} catch (error) {
		console.error(error)
		return { succeeded: false }
	}
}
