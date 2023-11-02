import {redirect} from "next/navigation"
import styles from "../page.module.scss"
import Link from "next/link"
import PasswordValidator from "@/components/PasswordValidator"
import connect from "@/libs/mongodb"
import {User, FullUserType} from "@/models/User"
import {hashPassword} from "@/libs/bcrypt"
import {sendActivationEmail} from "@/libs/mails"
import {stringToB64} from "@/libs/convert"

export const dynamic = "force-dynamic"

const handleForm = async (data: FormData) => {
	"use server"
	const email = data.get("email")?.toString()
	const name = data.get("name")?.toString()
	const password = data.get("password")?.toString()
	const password2 = data.get("password2")?.toString()

	if (email == null) {
		return
	}

	if (password == null || password !== password2) {
		redirect("/auth/signUp?error=Passwords must be same!")
		return
	}

	if (name!.length > 32 || name!.length < 4) {
		redirect("/auth/signUp?error=Name length must be between 4 and 32!")
		return
	}

	const passCheck = new RegExp(
		"((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\\W]).{8,20})"
	)
	if (!passCheck.test(password)) {
		redirect("/auth/signUp?error=Passwords must be stronger!")
		return
	}

	await connect()
	const user: FullUserType | null = await User.findOne({email: email})

	if (user !== null) {
		if (user.activated) {
			redirect("/auth/signUp?error=User with this email already exists")
			return
		} else {
			await User.deleteOne({_id: user._id})
		}
	}

	const hashText = email + "_" + name + "_" + Date.now() + "_" + Math.random()
	const hash = stringToB64(hashText)
	const passwordHashed = await hashPassword(password)

	await User.create({
		email: email,
		password: passwordHashed,
		fullName: name,
		activationHash: hash,
	})

	sendActivationEmail(hash, email)
	redirect("/auth/signUp/activate")
}

const Page = ({searchParams}: {searchParams: {error?: string}}) => {
	const error = searchParams.error
	const hasError: boolean = error !== undefined

	return (
		<form
			className={
				hasError
					? styles.container + " " + styles.errorContainer
					: styles.container
			}
			action={handleForm}
		>
			<h2>Create account</h2>
			<input
				name="email"
				placeholder="user@example.com"
				className={styles.input}
				type="email"
				required
			/>
			<input
				name="name"
				placeholder="Full Name"
				className={styles.input}
				minLength={4}
				maxLength={32}
				required
			/>
			<PasswordValidator
				containerClass={styles.passwordContainer}
				inputClass={styles.input}
				checksClass={styles.passwordChecks}
				inputPlaceholder="Password"
				inputName="password"
				required
			/>
			<input
				name="password2"
				type="password"
				placeholder="Repeat Password"
				className={styles.input}
				required
			/>

			{hasError && <section className={styles.error}>{error}</section>}

			<p className={styles.rules}>
				By creating account, you agree to our{" "}
				<Link href={"/tos"}>Terms of Service</Link>
			</p>
			<button className={styles.submit}>Sign Up</button>

			<p className={styles.wrongForm}>
				Already have account? <Link href={"/auth/signIn"}>Login</Link>
			</p>
		</form>
	)
}

export default Page
