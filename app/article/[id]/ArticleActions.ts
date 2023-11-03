"use server"

import {redirect} from "next/navigation"

import {hasAccess} from "@/libs/credentials"
import connect from "@/libs/mongodb"
import Article, {ArticleType} from "@/models/Article"
import {UserRole} from "@/models/User"
import {stringToBool} from "@/utils/convert"

export const getArticle = async (id: string) => {
	await connect()
	let data: ArticleType | null
	try {
		data = await Article.findById(id)
	} catch (error) {
		redirect("/")
		return null
	}
	if (data === null) {
		redirect("/")
		return null
	}
	return data
}

export const removeArticle = async (data: FormData) => {
	"use server"
	if (stringToBool(process.env.PREVIEW)) {
		return
	}
	const id = data.get("id")
	const access = await hasAccess(UserRole.EDITOR, UserRole.ADMIN)
	if (!access) {
		return
	}
	await connect()
	await Article.findByIdAndDelete(id)
	redirect("/")
}
