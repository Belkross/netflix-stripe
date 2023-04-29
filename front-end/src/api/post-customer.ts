import { SERVER_URL } from "../constants/constants"

export async function postCustomer(email: string): Promise<AsyncOutcome> {
	try {
		const response = await fetch(`${SERVER_URL}/customer`, {
			method: "post",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: email,
			}),
		})

		if (response.ok) return { succeeded: true }
		else throw new Error()
	} catch (error) {
		console.error(error)
		return { succeeded: false }
	}
}
