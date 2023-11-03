import {ObjectId} from "mongoose"
import {redirect} from "next/navigation"

import {useAuth} from "@/hooks/useAuth"
import {User, UserRole} from "@/models/User"
import {passwordRegex} from "@/utils/regex"

import {hashPassword} from "./bcrypt"
import {generateActivationHash, sendActivationEmail} from "./mails"
import connect from "./mongodb"

export const hasAccess = async (...requiredRole: UserRole[]) => {
	const {logged, role} = await useAuth()

	if (!logged) {
		return false
	}

	if (requiredRole.length > 0) {
		return requiredRole.includes(role!)
	}

	return true
}

const ERROR_URL = "/auth/signUp?error="
const error = async (text: string) => {
	"use server"
	redirect(ERROR_URL + text)
}

export const signUp = async (data: FormData) => {
	"use server"
	const email = data.get("email")?.toString()
	const name = data.get("name")?.toString()
	const password = data.get("password")?.toString()
	const password2 = data.get("password2")?.toString()

	if (email == null || name == null || password == null) {
		return
	}

	if (password !== password2) {
		await error("Passwords must be same!")
		return
	}

	if (name.length > 32 || name.length < 4) {
		await error("Name length must be between 4 and 32!")
		return
	}

	const passCheck = new RegExp(passwordRegex)
	if (!passCheck.test(password)) {
		await error("Passwords must be stronger!")
		return
	}

	await connect()
	const user: {_id: ObjectId; activated: boolean} | null = await User.findOne(
		{email: email},
		{_id: 1, activated: 1}
	)

	if (user !== null) {
		if (user.activated) {
			await error("User with this email already exists")
			return
		} else {
			await User.deleteOne({_id: user._id})
		}
	}

	const hash = generateActivationHash()
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
