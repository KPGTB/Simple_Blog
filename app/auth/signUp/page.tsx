import Link from "next/link"

import {Button} from "@/components/Button/Button"
import ButtonAccent from "@/components/Button/ButtonAccent"
import Input from "@/components/Input/Input"
import PasswordValidator from "@/components/PasswordValidator/PasswordValidator"
import {signUp} from "@/libs/credentials"
import {classesToClass} from "@/utils/convert"

import styles from "../page.module.scss"

export const dynamic = "force-dynamic"

const Page = ({searchParams}: {searchParams: {error?: string}}) => {
	const error = searchParams.error
	const hasError: boolean = error !== undefined

	return (
		<form
			className={classesToClass(
				styles.container,
				hasError ? styles.errorContainer : ""
			)}
			action={signUp}
		>
			<h2>Create account</h2>
			<Input
				name="email"
				placeholder="user@example.com"
				className={styles.input}
				type="email"
				required
			/>

			<Input
				name="name"
				placeholder="Full Name"
				className={styles.input}
				minLength={4}
				maxLength={32}
				required
			/>

			<PasswordValidator
				inputClass={styles.input}
				inputPlaceholder="Password"
				inputName="password"
				required
			/>

			<Input
				name="password2"
				type="password"
				placeholder="Repeat Password"
				className={styles.input}
				required
			/>

			{hasError && <section className={styles.error}>{error}</section>}

			<p className={styles.rules}>
				By creating account, you agree to our{" "}
				<Link
					href={"/tos"}
					aria-label="Terms of Service"
				>
					Terms of Service
				</Link>
			</p>

			<Button
				hover={ButtonAccent.YELLOW}
				aria-label="Sign Up"
			>
				Sign Up
			</Button>

			<p className={styles.wrongForm}>
				Already have account?{" "}
				<Link
					href={"/auth/signIn"}
					aria-label="Login to account"
				>
					Login
				</Link>
			</p>
		</form>
	)
}

export default Page
