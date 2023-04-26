export function calculateFinalPrice(multiUser: boolean | undefined, premium: boolean): number {
	if (multiUser === undefined) return 0
	const standardPrice = multiUser ? 2000 : 1000
	return premium ? standardPrice + 500 : standardPrice
}
