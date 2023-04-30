import { Router, Request, Response } from "express"
import { postSubscription } from "../services/post-subscription"

export const routerSubscription = Router()

routerSubscription.post("/", async (req: Request, res: Response) => {
	const { succeeded, payload } = await postSubscription(req.body)

	if (succeeded) res.status(200).json(payload)
	else res.status(400).end()
})
