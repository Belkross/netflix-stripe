import { AsyncOutcome } from "@belkross-stripe/types/main"
import { stripe } from "../server"

export async function submitCustomer(email: string): Promise<AsyncOutcome> {
	try {
		const searchResult = await stripe.customers.search({ query: `email:'${email}'` })

		const noCustomerFound = searchResult.data.length === 0
		if (noCustomerFound) {
			await stripe.customers.create({ email })
			console.log(`customer created: ${email}`)
		} else {
			console.log(`existing customer found: ${email}`)
		}

		return { succeeded: true, payload: undefined }
	} catch (error) {
		console.error(error)
		return { succeeded: false }
	}
}
