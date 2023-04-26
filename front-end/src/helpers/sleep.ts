export async function sleep(duration: number) {
	return await new Promise((resolve) => {
		setTimeout(resolve, duration)
	})
}
