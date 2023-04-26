import { contextErrorMessage } from "./error-message"
import { Dispatch, createContext, useContext } from "react"

export const AppStateContext = createContext<AppState | null>(null)
export const useAppState = () => {
	const context = useContext(AppStateContext)

	if (!context) throw new Error(contextErrorMessage)
	return context
}

export const AppStateDispatchContext = createContext<Dispatch<AppStateActions> | null>(null)
export const useAppStateDispatch = () => {
	const context = useContext(AppStateDispatchContext)

	if (!context) throw new Error(contextErrorMessage)
	return context
}
