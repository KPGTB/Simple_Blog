import {createTransport} from "nodemailer"
import {promises as fs} from "fs"
import {stringToB64} from "@/utils/convert"

export const sendActivationEmail = async (hash: string, email: string) => {
	const transporter = createTransport(process.env.SMTP_URL)
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
	transporter.sendMail(options)
}

export const generateActivationHash = () =>
	stringToB64(Date.now() + "_" + Math.random())
