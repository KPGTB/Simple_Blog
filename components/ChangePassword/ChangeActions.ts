"use server"

import {useAuth} from "@/hooks/useAuth"
import {comparePasswords, hashPassword} from "@/libs/bcrypt"
import connect from "@/libs/mongodb"
import {User, UserRole} from "@/models/User"
import {stringToBool} from "@/utils/convert"
import {passwordRegex} from "@/utils/regex"
import {ObjectId} from "mongoose"
import {redirect} from "next/navigation"

const ERROR_URL = "/user?error="
const error = async (text: string) => {
	redirect(ERROR_URL + text)
}

export const change = async (form: FormData) => {
	const old = form.get("old")?.toString()
	const newPass = form.get("new")?.toString()
	const newPass2 = form.get("new2")?.toString()

	if (old == null || newPass == null || newPass2 == null) {
		return
	}

	if (newPass !== newPass2) {
		await error("Passwords must be same!")
		return
	}

	const passCheck = new RegExp(passwordRegex)
	if (!passCheck.test(newPass)) {
		await error("Passwords must be stronger!")
		return
	}

	const {role, data} = await useAuth()

	if (role === UserRole.ADMIN && stringToBool(process.env.PREVIEW)) {
		await error("You can't change admin password in preview mode!")
		return
	}
	await connect()

	const user: {_id: ObjectId; password: string} | null = await User.findOne(
		{
			_id: data?._id,
		},
		{password: 1}
	)

	const correctPassword = await comparePasswords(old, user!.password)
	if (!correctPassword) {
		await error("Wrong password!")
		return
	}

	const passwordHashed = await hashPassword(newPass)
	await User.updateOne(
		{_id: data!._id},
		{
			password: passwordHashed,
		}
	)
	redirect("/user?success")
}
