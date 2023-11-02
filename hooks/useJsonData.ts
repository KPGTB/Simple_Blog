import {promises as fs} from "fs"

const TOS_PATH = process.cwd() + "/data/tos.json"
const EMAIL_PATH = process.cwd() + "/data/email.json"

type TosType = {
	lastUpdate: number
	content: string
}

type EmailType = {
	title: string
	content: string
}

const useTos = async () => {
	const file = await fs.readFile(TOS_PATH, "utf-8")
	const json: TosType = await JSON.parse(file)
	return {
		tos: json,
		setTos: async (data: TosType) => {
			"use server"
			await fs.writeFile(TOS_PATH, JSON.stringify(data), "utf-8")
		},
	}
}

const useEmail = async () => {
	const file = await fs.readFile(EMAIL_PATH, "utf-8")
	const json: EmailType = await JSON.parse(file)
	return {
		email: json,
		setEmail: async (data: EmailType) => {
			"use server"
			await fs.writeFile(EMAIL_PATH, JSON.stringify(data), "utf-8")
		},
	}
}

export {useTos, useEmail}
