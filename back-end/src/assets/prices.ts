export const CURRENCY = "eur"
export const INTERVAL = "month"

export type PriceData = {
	multiUser: "true" | "false"
	premium: "true" | "false"
	unit_amount: number
}

export const myPrices: Array<PriceData> = [
	{ multiUser: "false", premium: "false", unit_amount: 1000 },
	{ multiUser: "false", premium: "true", unit_amount: 1500 },
	{ multiUser: "true", premium: "false", unit_amount: 2000 },
	{ multiUser: "true", premium: "true", unit_amount: 2500 },
]
