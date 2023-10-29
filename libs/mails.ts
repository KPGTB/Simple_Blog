import {createTransport} from "nodemailer"

const sendActivationEmail = (hash: string, email: string) => {
	const transporter = createTransport(process.env.SMTP_URL)
	const html = `<h1>Simple Blog</h1><br><a href='${process.env.NEXTAUTH_URL}/auth/signUp/activate/${hash}'>Activate account</a>`
	const options = {
		from: process.env.SMTP_SENDER,
		to: email,
		subject: "Simple Blog Account Activation",
		html: html,
	}
	transporter.sendMail(options)
}

export {sendActivationEmail}
