"use server"

import {redirect} from "next/navigation"

import {useAuth} from "@/hooks/useAuth"
import connect from "@/libs/mongodb"
import Article from "@/models/Article"
import {stringToBool} from "@/utils/convert"

export const addArticle = async (form: FormData) => {
	if (stringToBool(process.env.PREVIEW)) {
		return
	}
	const {data} = await useAuth()

	await connect()
	await Article.create({
		title: form.get("title"),
		image: form.get("image"),
		author: data!.fullName,
		description: form.get("editor"),
	})
	redirect("/")
}

export const editArticle = async (data: FormData) => {
	if (stringToBool(process.env.PREVIEW)) {
		return
	}
	await connect()
	await Article.findByIdAndUpdate(data.get("id"), {
		title: data.get("title"),
		image: data.get("image"),
		description: data.get("editor"),
	})
	redirect("/")
}
