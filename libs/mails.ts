import {createTransport} from "nodemailer"
import {promises as fs} from "fs"

const sendActivationEmail = async (hash: string, email: string) => {
	const transporter = createTransport(process.env.SMTP_URL)
	const file = await fs.readFile(
		process.cwd() + "/assets/email.json",
		"utf-8"
	)
	const emailJson: {title: string; content: string} = await JSON.parse(file)
	const html = emailJson.content.replace(
		"{LINK}",
		`<a href='${process.env.NEXTAUTH_URL}/auth/signUp/activate/${hash}'>Activate</a>`
	)
	const options = {
		from: process.env.SMTP_SENDER,
		to: email,
		subject: emailJson.title,
		html: html,
	}
	transporter.sendMail(options)
}

export {sendActivationEmail}
