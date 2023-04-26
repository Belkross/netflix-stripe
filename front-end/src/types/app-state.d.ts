type Views = "register" | "prices" | "subscribe"

type AppState = {
	view: Views
	email: string
	subscription: null | Stripe.Subscription
	clientSecret: undefined | string
	multiUser: undefined | boolean
	premium: boolean
}

type LogIn = {
	type: "logged-in"
	payload: string
}

type ChangeView = {
	type: "view-changed"
	payload: Views
}

type PickPlan = {
	type: "plan-picked"
	payload: boolean
}

type TogglePremium = {
	type: "premium-toggled"
}

type CreateSubscription = {
	type: "subscription-created"
	payload: {
		subscription: string
		clientSecret: string
	}
}

type AppStateActions = ChangeView | PickPlan | TogglePremium | LogIn | CreateSubscription
