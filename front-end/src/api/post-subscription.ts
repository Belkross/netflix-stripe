import { SERVER_URL } from "../constants/constants"

export async function postSubscription(multiUser: boolean | undefined, premium: boolean, email: string) {
	if (multiUser === undefined) return

	return await fetch(`${SERVER_URL}/subscription`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			multiUser: multiUser,
			premium: premium,
			customerEmail: email,
		}),
	})
		.then((response) => response.json())
		.catch((response) => response.json())
}
