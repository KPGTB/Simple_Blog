"use server"

import {User} from "@/models/User"

import CaptchaResponse from "./enum/CaptchaResponse"
import connect from "./mongodb"

// export const dynamic = "force-dynamic"

const activateAccount = async (
	captchaToken: string,
	activationHash: string
) => {
	const res = await fetch(
		`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${captchaToken}`,
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
		activationHash = activationHash.replaceAll("%3D", "=")
		const user = await User.findOneAndUpdate(
			{
				activated: false,
				activationHash: activationHash,
			},
			{activated: true}
		)
		return user !== null
			? CaptchaResponse.ACTIVATED
			: CaptchaResponse.WRONG_HASH
	}

	return CaptchaResponse.BOT
}

export {activateAccount}
