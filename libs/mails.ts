import {promises as fs} from "fs"
import {createTransport} from "nodemailer"

import {stringToB64, stringToBool} from "@/utils/convert"

export const sendActivationEmail = async (hash: string, email: string) => {
	const transporter = createTransport({
		host: process.env.SMTP_HOST,
		port: Number(process.env.SMTP_PORT),
		secure: stringToBool(process.env.SMTP_SECURE),
		auth: {
			user: process.env.SMTP_USER,
			pass: process.env.SMTP_PASS,
		},
	})
	const file = await fs.readFile(process.cwd() + "/data/email.json", "utf-8")
	const emailJson: {title: string; content: string} = await JSON.parse(file)
	const html = emailJson.content.replaceAll(
		"{LINK}",
		`${process.env.NEXTAUTH_URL}/auth/signUp/activate/${hash}`
	)
	const options = {
		from: process.env.SMTP_SENDER,
		to: email,
		subject: emailJson.title,
		html: html,
	}
	await transporter.sendMail(options)
}

export const generateActivationHash = () =>
	stringToB64(Date.now() + "_" + Math.random())
