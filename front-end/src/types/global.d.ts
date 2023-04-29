type FlowlessFunction = () => void

type AsyncOutcome<Type = void> = {
	succeeded: boolean
	payload?: Type
}
