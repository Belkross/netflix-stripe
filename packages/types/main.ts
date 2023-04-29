export type FlowlessFunction = () => void

export type AsyncOutcome<Type = void> = {
	succeeded: boolean
	payload?: Type
}
