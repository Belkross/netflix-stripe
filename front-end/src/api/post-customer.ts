import { SERVER_URL } from "../constants/constants"

export async function postCustomer(email: string) {
	return await fetch(`${SERVER_URL}/customer`, {
		method: "post",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email: email,
		}),
	})
		.then((response) => response.json())
		.catch((response) => response.json())
}
