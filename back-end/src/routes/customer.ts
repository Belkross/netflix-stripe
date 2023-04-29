import { Router, Request, Response } from "express"
import { stripe } from "../server"

export const routerCustomer = Router()

routerCustomer.post("/", async (req: Request, res: Response) => {
	try {
		const { email } = req.body
		const searchResult = await stripe.customers.search({ query: `email:'${email}'` })

		const noCustomerFound = searchResult.data.length === 0
		if (noCustomerFound) {
			await stripe.customers.create({ email })
			console.log(`customer created: ${email}`)
		} else {
			console.log(`customer found: ${email}`)
		}

		res.json({ success: true })
	} catch (error) {
		console.error(error)
		res.status(400).json({ success: false })
	}
})
