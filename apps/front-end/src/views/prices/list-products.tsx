import Stripe from "stripe"
import { useAppState, useAppStateDispatch } from "../../context/context-app-state"

type Props = {
	products: Array<Stripe.Product>
}

export function ListProducts({ products }: Props) {
	const { multiUser } = useAppState()
	const dispatch = useAppStateDispatch()

	const list = products.map((product: Stripe.Product) => {
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

	return <>{list}</>
}
