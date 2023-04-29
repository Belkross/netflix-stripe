export type AsyncOutcome<Type = void> = {
	succeeded: boolean
	payload?: Type
}
