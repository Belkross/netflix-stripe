import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { MouseEvent, useState } from "react"
import { useAppState } from "../context/context-app-state"
import { sleep } from "../helpers/sleep"

export function Subscribe() {
	const [feedback, setFeedback] = useState("")
	const [paymentSuceeded, setpaymentSuceeded] = useState(false)
	const elements = useElements()
	const stripe = useStripe()
	const { clientSecret, email, subscription } = useAppState()
	const { amount, currency } = subscription.plan

	const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
		if (!stripe || !elements || !clientSecret) return
		const cardElement = elements.getElement(CardElement)
		if (!cardElement) return

		setFeedback("En attente...")
		await sleep(1000)

		const { error } = await stripe.confirmCardPayment(clientSecret, {
			payment_method: {
				card: cardElement,
				billing_details: {
					email,
				},
			},
		})

		if (!error) {
			setpaymentSuceeded(true)
			setFeedback("Paiement validé.")
		} else {
			console.error(error)
			if (error.message) setFeedback(error.message)
		}
	}

	return (
		<>
			<h1>{`Abonnement ${amount / 100} ${currency}/mois`}</h1>
			{!paymentSuceeded && (
				<>
					<p>Fournissez les informations concernant votre carte de crédit pour finaliser l’achat.</p>
					<form action="" className="payment-form">
						<CardElement options={{ hidePostalCode: true }} />
						<button onClick={handleSubmit} disabled={!stripe}>
							Confirmer paiement
						</button>
					</form>
				</>
			)}
			{Boolean(feedback) && <h3 className={paymentSuceeded ? "success" : ""}>{feedback}</h3>}
		</>
	)
}
