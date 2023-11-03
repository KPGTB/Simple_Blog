"use client"

import {signIn} from "next-auth/react"
import Link from "next/link"
import {useSearchParams} from "next/navigation"

import {Button} from "@/components/Button/Button"
import ButtonAccent from "@/components/Button/ButtonAccent"
import Input from "@/components/Input/Input"
import {classesToClass} from "@/utils/convert"

import styles from "../page.module.scss"

const handleForm = async (e: any) => {
	e.preventDefault()
	const data = new FormData(e.target)
	await signIn("credentials", {
		email: data.get("email"),
		password: data.get("password"),
		redirect: true,
		callbackUrl: "/",
	})
}

const Page = () => {
	const params = useSearchParams()
	const hasError: boolean = params.has("error")

	return (
		<form
			className={classesToClass(
				styles.container,
				hasError ? styles.errorContainer : ""
			)}
			onSubmit={handleForm}
		>
			<h2>Login to your account</h2>

			<Input
				name="email"
				placeholder="user@example.com"
				className={styles.input}
				required
			/>
			<Input
				name="password"
				type="password"
				placeholder="Password"
				className={styles.input}
				required
			/>

			{hasError && (
				<section className={styles.error}>Wrong credentials!</section>
			)}

			<Button hover={ButtonAccent.YELLOW}>Sign In</Button>

			<p className={styles.wrongForm}>
				Don't have account? <Link href={"/auth/signUp"}>Create it</Link>
			</p>
		</form>
	)
}

export default Page
