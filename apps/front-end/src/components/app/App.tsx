import { useMemo, useReducer } from "react"
import "../../styles/App.css"
import { Register } from "../../views/register"
import { Prices } from "../../views/prices/prices"
import { reducerAppState } from "./reducer-app-state"
import { AppStateContext, AppStateDispatchContext } from "../../context/context-app-state"
import { StripeContainer } from "../stripe-container"

const initialAppState: AppState = {
	view: "register",
	email: "",
	subscription: null,
	clientSecret: "",
	multiUser: undefined,
	premium: false,
}

export default function App() {
	const [appState, dispatch] = useReducer(reducerAppState, initialAppState)

	const appStateDispatch = useMemo(() => dispatch, [])

	let view
	switch (appState.view) {
		case "register":
			view = <Register />
			break
		case "prices":
			view = <Prices />
			break
		case "subscribe":
			view = <StripeContainer />
			break
		default:
			view = <h1>default view</h1>
	}

	return (
		<AppStateContext.Provider value={appState}>
			<AppStateDispatchContext.Provider value={appStateDispatch}>{view}</AppStateDispatchContext.Provider>
		</AppStateContext.Provider>
	)
}
