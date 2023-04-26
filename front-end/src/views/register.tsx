import { MouseEvent, useState } from "react"
import { useAppStateDispatch } from "../context/context-app-state"
import { postCustomer } from "../api/post-customer"

export const Register = () => {
	const [email, setEmail] = useState("belkross@example.com")
	const dispatch = useAppStateDispatch()

	const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
		const result = await postCustomer(email)
		if (result.success) dispatch({ type: "logged-in", payload: email })
	}

	return (
		<main>
			<h1>Netflix</h1>
			<p>Identifiez vous</p>

			<form action="" onSubmit={(event) => event.preventDefault()}>
				<label>
					<span>Email : </span>
					<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
				</label>
				<button onClick={handleSubmit}>Valider</button>
			</form>
		</main>
	)
}
