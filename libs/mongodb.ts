import User from "@/models/User"
import mongoose from "mongoose"
import {hashPassword} from "./bcrypt"

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
				username: process.env.ADMIN_LOGIN,
			})
			if (!admin) {
				const login = process.env.ADMIN_LOGIN
				const pass = await hashPassword(process.env.ADMIN_PASSWORD)
				await User.create({
					username: login,
					password: pass,
					role: "admin",
					fullName: process.env.ADMIN_FULL,
				})
				console.log("Created Admin")
			}
		}
	} catch (error) {
		console.log(error)
	}
}

export default connect
