export function reducerAppState(state: AppState, action: AppStateActions): AppState {
	switch (action.type) {
		case "view-changed": {
			return { ...state, view: action.payload }
		}

		case "logged-in": {
			return { ...state, view: "prices", email: action.payload }
		}

		case "subscription-created": {
			const { subscription, clientSecret } = action.payload
			return { ...state, view: "subscribe", subscription, clientSecret }
		}

		case "plan-picked": {
			return { ...state, multiUser: action.payload }
		}

		case "premium-toggled": {
			return { ...state, premium: !state.premium }
		}

		default:
			return state
	}
}
