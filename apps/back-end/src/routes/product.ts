import { Router, Request, Response } from "express"
import { getProducts } from "../services/get-products"

export const routerProduct = Router()

routerProduct.get("/", async (req: Request, res: Response) => {
	const { succeeded, payload } = await getProducts()

	if (succeeded) res.status(200).json(payload)
	else res.status(400)
})
