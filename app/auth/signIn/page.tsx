"use client"

import {signIn} from "next-auth/react"
import styles from "./page.module.scss"
import {useSearchParams} from "next/navigation"

const handleForm = async (e: any) => {
	e.preventDefault()
	const data = new FormData(e.target)
	await signIn("credentials", {
		username: data.get("username"),
		password: data.get("password"),
		redirect: true,
		callbackUrl: "/",
	})
}

const Page = () => {
	const params = useSearchParams()
	const error = params.get("error")
	const hasError: boolean = error !== null

	return (
		<form
			className={
				hasError
					? styles.container + " " + styles.errorContainer
					: styles.container
			}
			onSubmit={handleForm}
		>
			<h2>Login to your account</h2>
			<input
				name="username"
				placeholder="Username"
				className={styles.input}
				required
			/>
			<input
				name="password"
				type="password"
				placeholder="Password"
				className={styles.input}
				required
			/>
			<button className={styles.submit}>Sign In</button>

			{hasError && (
				<section className={styles.error}>Wrong credentials!</section>
			)}
		</form>
	)
}

export default Page
