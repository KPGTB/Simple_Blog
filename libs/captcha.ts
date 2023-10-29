"use server"

import User from "@/models/User"
import connect from "./mongodb"
import {CaptchaResponse} from "@/types/CaptchaResponse"

const verifyCaptcha = async (token: string, hash: string) => {
	const res = await fetch(
		`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${token}`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		}
	)
	const json = await res.json()

	if (json.success) {
		await connect()
		hash = hash.replaceAll("%3D", "=")
		const user = await User.findOneAndUpdate(
			{
				activated: false,
				activationHash: hash,
			},
			{activated: true}
		)
		return user !== null
			? CaptchaResponse.ACTIVATED
			: CaptchaResponse.WRONG_HASH
	}

	return CaptchaResponse.BOT
}

export {verifyCaptcha}
