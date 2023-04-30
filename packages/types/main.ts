export type FlowlessFunction = () => void

export type AsyncOutcome<Type = undefined> =
	| {
			succeeded: true
			payload: Type
	  }
	| {
			succeeded: false
			payload?: undefined
	  }

export type PayloadPostSubscription = {
	subscription: any
	clientSecret: string
}
