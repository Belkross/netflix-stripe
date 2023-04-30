import { AsyncOutcome } from "@belkross-stripe/types/main"
import { SERVER_URL } from "../constants/constants"
import Stripe from "stripe"

export async function getProducts(): Promise<AsyncOutcome<Stripe.Product[]>> {
	try {
		const response = await fetch(`${SERVER_URL}/product`)

		if (response.ok) {
			const payload = await response.json()
			return { succeeded: true, payload }
		} else {
			throw new Error()
		}
	} catch (error) {
		console.error(error)
		return { succeeded: false }
	}
}
