import { AsyncOutcome, PayloadPostSubscription } from "@belkross-stripe/types/main"
import { SERVER_URL } from "../constants/constants"

type Parameters = {
	multiUser: boolean | undefined
	premium: boolean
	email: string
}

export async function postSubscription(parameters: Parameters): Promise<AsyncOutcome<PayloadPostSubscription>> {
	const { multiUser, premium, email } = parameters

	if (multiUser === undefined) return { succeeded: false }
	try {
		const response = await fetch(`${SERVER_URL}/subscription`, {
			method: "post",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				multiUser,
				premium,
				email,
			}),
		})

		if (response.ok) {
			const payload = await response.json()
			return { succeeded: true, payload }
		} else throw new Error()
	} catch (error) {
		console.error(error)
		return { succeeded: false }
	}
}
