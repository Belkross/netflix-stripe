import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import { Subscribe } from "../views/subscribe"

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

export function StripeContainer() {
	return (
		<Elements stripe={stripePromise}>
			<Subscribe />
		</Elements>
	)
}
