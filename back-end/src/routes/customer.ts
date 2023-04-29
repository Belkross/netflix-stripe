import { Router, Request, Response } from "express"
import { submitCustomer } from "../api-functions/submit-customer"

export const routerCustomer = Router()

routerCustomer.post("/", async (req: Request, res: Response) => {
	const { email } = req.body

	const { succeeded } = await submitCustomer(email)

	if (succeeded) res.status(200).end()
	else res.status(400).end()
})
