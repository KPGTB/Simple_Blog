"use server"

import {redirect} from "next/navigation"

import {useAuth} from "@/hooks/useAuth"
import {hasAccess} from "@/libs/credentials"
import connect from "@/libs/mongodb"
import Comment, {CommentType} from "@/models/Comment"
import {UserRole} from "@/models/User"
import {stringToBool} from "@/utils/convert"

export const getComments = async (id: string) => {
	await connect()
	const data: CommentType[] = await Comment.find({
		articleId: id,
	}).sort({createdAt: -1})
	return data
}

export const sendComment = async (form: FormData) => {
	if (stringToBool(process.env.PREVIEW)) {
		return
	}

	const {logged, data} = await useAuth()
	if (!logged) {
		return
	}

	const id = form.get("id")
	const content = form.get("content")
	if (content!.toString().length < 10) {
		return
	}

	await Comment.create({
		authorId: data!._id,
		authorName: data!.fullName,
		articleId: id,
		description: content,
	})

	redirect("/article/" + id)
}

export const removeComment = async (form: FormData) => {
	if (stringToBool(process.env.PREVIEW)) {
		return
	}
	const id = form.get("id")
	const comment = await Comment.findById(id)

	const access = await hasAccess(UserRole.EDITOR, UserRole.ADMIN)
	const {logged, data} = await useAuth()

	if (
		!access &&
		(!logged || data!._id.toString() !== comment.authorId.toString())
	) {
		return
	}

	await Comment.deleteOne({_id: id})
	redirect("/article/" + comment.articleId)
}
