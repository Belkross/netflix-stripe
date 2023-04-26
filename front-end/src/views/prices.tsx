import { useState, useEffect } from "react"
import { getProducts } from "../api/get-products"
import { useAppState, useAppStateDispatch } from "../context/context-app-state"
import Stripe from "stripe"
import { calculateFinalPrice } from "../helpers/calculate-final-price"
import { postSubscription } from "../api/post-subscription"

export function Prices() {
	const [products, setProducts] = useState<Stripe.Product[]>([])
	const [feedback, setFeedback] = useState("")

	const { multiUser, premium, email } = useAppState()
	const dispatch = useAppStateDispatch()

	useEffect((): FlowlessFunction => {
		let ignore = false

		const fetchProducts = async () => {
			const { success, products } = await getProducts()
			if (!ignore && success) setProducts(products)
			else if (!ignore && !success)
				setFeedback(
					"Produits en cours de création sur le serveur Stripe. Réessayez plus tard en rafraichissant la page."
				)
		}
		fetchProducts()

		return () => (ignore = true)
	}, [])

	const handleSubmit = async () => {
		try {
			const { success, subscription, clientSecret } = await postSubscription(multiUser, premium, email)

			if (success) dispatch({ type: "subscription-created", payload: { subscription, clientSecret } })
			else setFeedback("Compte client en cours de création, réessayer plus tard.")
		} catch (error) {
			console.error(error)
		}
	}

	const handleTogglePremium = () => dispatch({ type: "premium-toggled" })

	const list_products = products.map((product: Stripe.Product) => {
		const { id, name, metadata } = product
		const { default_unit_amount, multiUser: productMultiUser } = metadata
		const amount = Number.parseInt(default_unit_amount, 10) / 100
		const formatedProductMultiUser = productMultiUser === "true" ? true : false
		const selectedClass = multiUser === formatedProductMultiUser ? "selected" : ""
		const handleClick = (plan: boolean) => dispatch({ type: "plan-picked", payload: plan })

		return (
			<div key={id} className={"plan " + selectedClass}>
				<h2>{name}</h2>
				<p>{amount} euros/mois</p>
				<button onClick={() => handleClick(formatedProductMultiUser)}>Choisir</button>
			</div>
		)
	})

	return (
		<div>
			<h1>Choisissez une offre Netflix</h1>
			<p className="error">{feedback}</p>
			{list_products}
			<label>
				<input type="checkbox" checked={premium} onChange={handleTogglePremium} />
				Premium: pas de pubs et vidéos qualité HD
			</label>
			<h2>{`Total: ${calculateFinalPrice(multiUser, premium) / 100} euros/mois`}</h2>
			<button disabled={multiUser === undefined} onClick={handleSubmit}>
				Accéder au paiement
			</button>
		</div>
	)
}
