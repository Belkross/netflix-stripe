import { useState } from "react"
import { useAppState, useAppStateDispatch } from "../../context/context-app-state"
import Stripe from "stripe"
import { calculateFinalPrice } from "../../helpers/calculate-final-price"
import { postSubscription } from "../../api/post-subscription"
import { useGetProducts } from "./use-get-products"
import { ListProducts } from "./list-products"

export function Prices() {
	const [products, setProducts] = useState<Stripe.Product[]>([])
	const { multiUser, premium, email } = useAppState()
	const dispatch = useAppStateDispatch()

	const handleTogglePremium = () => dispatch({ type: "premium-toggled" })
	const handleSubmit = async () => {
		const { succeeded, payload } = await postSubscription({ multiUser, premium, email })
		if (succeeded) dispatch({ type: "subscription-created", payload })
		else alert("Erreur lors de la création de la facture, réessayer plus tard.")
	}

	useGetProducts(setProducts)

	return (
		<div>
			<h1>Choisissez une offre Netflix</h1>
			<ListProducts products={products} />
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
