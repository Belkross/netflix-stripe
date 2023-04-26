import { CURRENCY, INTERVAL, myPrices } from "./prices"
import { PRODUCT_TYPE } from "./products"

export async function createProductsAndPrices(stripe: any) {
	for (const price of myPrices) {
		const { multiUser, premium, unit_amount } = price
		const productName = inferProductName(multiUser, premium)

		const searchResult = await stripe.prices.search({
			query: `metadata['productType']:'${PRODUCT_TYPE}' metadata['multiUser']:'${multiUser}' metadata['premium']:'${premium}'`,
		})

		const noPriceFound = searchResult.data.length === 0
		if (noPriceFound) {
			try {
				await stripe.prices.create({
					currency: CURRENCY,
					unit_amount,
					recurring: {
						interval: INTERVAL,
					},
					metadata: {
						productType: PRODUCT_TYPE,
						multiUser,
						premium,
					},
					product_data: {
						name: productName,
						metadata: {
							multiUser,
							premium,
							default_unit_amount: unit_amount,
							productType: PRODUCT_TYPE,
						},
					},
				})
				console.log(`Price and Product created: ${productName} ${premium === "true" ? "premium" : "standard"}`)
			} catch (error) {
				console.error(error)
			}
		} else {
			console.log(`Price found: ${productName} ${premium === "true" ? "premium" : "standard"}`)
		}
	}
}

function inferProductName(multiUser: string, premium: string) {
	const nameMain = multiUser === "true" ? "Family" : "Solo"
	return `${nameMain}`
}
