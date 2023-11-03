import mongoose from "mongoose"

import {User, UserRole} from "@/models/User"

import {stringToBool} from "../utils/convert"
import {hashPassword} from "./bcrypt"

let first = true

const connect = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI)

		if (first && stringToBool(process.env.CREATE_ADMIN)) {
			first = false
			const admin = await User.findOne({
				email: process.env.ADMIN_EMAIL,
			})
			if (!admin) {
				const pass = await hashPassword(process.env.ADMIN_PASSWORD)
				await User.create({
					email: process.env.ADMIN_EMAIL,
					password: pass,
					role: UserRole.ADMIN,
					fullName: process.env.ADMIN_FULL,
					activated: true,
				})
				console.log("Created Admin")
			}
		}
	} catch (error) {
		console.log(error)
	}
}

export default connect
