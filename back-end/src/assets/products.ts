export const PRODUCT_TYPE = "my-netflix"

export type ProductData = {
	name: string
	description: string
	multiUser: "true" | "false"
}

export const myProducts: Array<ProductData> = [
	{
		name: "Solo",
		description: "Netflix pour un utilisateur unique.",
		multiUser: "false",
	},
	{
		name: "Family",
		description: "Netflix pour plusieurs utilisateurs simultanés.",
		multiUser: "true",
	},
]
