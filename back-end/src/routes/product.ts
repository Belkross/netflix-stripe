import { Router, Request, Response } from "express"
import { stripe } from "../server"
import { PRODUCT_TYPE } from "../assets/products"

export const routerProduct = Router()

routerProduct.get("/", async (req: Request, res: Response) => {
	try {
		const searchResult = await stripe.products.search({
			query: `metadata['productType']:'${PRODUCT_TYPE}' metadata['premium']:'false'`,
		})

		const productsNotReadyYet = searchResult.data.length === 0
		if (productsNotReadyYet) throw new Error()
		else res.json({ products: searchResult.data, success: true })
	} catch (error) {
		console.error(error)
		res.status(400).json({ success: false })
	}
})
