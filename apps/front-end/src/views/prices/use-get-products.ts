import { FlowlessFunction } from "@belkross-stripe/types"
import { Dispatch, SetStateAction, useEffect } from "react"
import { getProducts } from "../../api/get-products"
import Stripe from "stripe"

export function useGetProducts(setProducts: Dispatch<SetStateAction<Stripe.Product[]>>) {
	useEffect((): FlowlessFunction => {
		let ignore = false

		const fetchProducts = async () => {
			const { succeeded, payload: products } = await getProducts()
			if (!ignore && succeeded) setProducts(products ?? [])
			else if (!ignore && !succeeded) alert(errorMessage)
		}
		fetchProducts()

		return () => (ignore = true)
	}, [setProducts])
}

const errorMessage =
	"Produits en cours de création sur le serveur Stripe. Réessayez plus tard en rafraichissant la page."
