import { SERVER_URL } from "../constants/constants"

export async function getProducts() {
	return await fetch(`${SERVER_URL}/product`)
		.then((response) => response.json())
		.catch((response) => response.json())
}
