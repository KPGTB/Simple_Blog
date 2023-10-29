import User from "@/models/User"
import mongoose from "mongoose"
import {hashPassword} from "./bcrypt"
import UserRole from "@/types/UserRole"

let first = true

const connect = async () => {
	try {
		// @ts-ignore
		await mongoose.connect(process.env.MONGODB_URI)

		if (
			first &&
			process.env.CREATE_ADMIN &&
			process.env.ADMIN_PASSWORD != null
		) {
			first = false
			const admin = await User.findOne({
				email: process.env.ADMIN_EMAIL,
			})
			if (!admin) {
				const email = process.env.ADMIN_EMAIL
				const fullName = process.env.ADMIN_FULL
				const pass = await hashPassword(process.env.ADMIN_PASSWORD)
				await User.create({
					email: email,
					password: pass,
					role: UserRole.ADMIN,
					fullName: fullName,
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
