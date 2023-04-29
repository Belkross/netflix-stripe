import * as dotenv from "dotenv"
dotenv.config()

import express from "express"
import Stripe from "stripe"
import cors from "cors"
import bodyParser from "body-parser"
import { createProductsAndPrices } from "./assets/create-products-and-prices"
import { PORT, STRIPE_CONFIG, STRIPE_SECRET_KEY } from "./config/config"
import { corsOptions } from "./config/cors"
import { routerCustomer } from "./routes/customer"
import { routerProduct } from "./routes/product"
import { routerSubscription } from "./routes/subscription"

const app = express()
export const stripe = new Stripe(STRIPE_SECRET_KEY, STRIPE_CONFIG)
createProductsAndPrices(stripe)

//Middlewares
app.use(cors(corsOptions))
app.use(bodyParser.json())

//Routes
app.use("/customer", routerCustomer)
app.use("/product", routerProduct)
app.use("/subscription", routerSubscription)

app.listen(PORT, () => {
	console.log(`server connected at port ${PORT}`)
})
