"use server"

import {redirect} from "next/navigation"

import connect from "@/libs/mongodb"
import {User, UserDataType, UserRole} from "@/models/User"

export const getUsers = async () => {
	await connect()
	const data: UserDataType[] = await User.find(
		{role: {$ne: UserRole.ADMIN}},
		{_id: 1, email: 1, fullName: 1, role: 1}
	).sort({role: 1, fullName: 1})
	return data
}

export const promote = async (data: FormData) => {
	const id = data.get("id")
	await User.findOneAndUpdate(
		{
			_id: id,
			role: {$ne: UserRole.ADMIN},
		},
		{role: UserRole.EDITOR}
	)
	redirect("/admin")
}

export const demote = async (data: FormData) => {
	const id = data.get("id")
	await User.findOneAndUpdate(
		{
			_id: id,
			role: {$ne: UserRole.ADMIN},
		},
		{role: UserRole.USER}
	)
	redirect("/admin")
}

export const remove = async (data: FormData) => {
	const id = data.get("id")
	await User.deleteOne({_id: id, role: {$ne: UserRole.ADMIN}})
	redirect("/admin")
}
