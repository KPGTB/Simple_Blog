import UserRole from "@/types/UserRole"
import mongoose, {ObjectId, Schema} from "mongoose"

const userSchema = new Schema({
	email: String,
	password: String,
	fullName: String,
	role: {
		type: String,
		default: UserRole.USER,
		enum: Object.values(UserRole),
	},
	activated: {
		type: Boolean,
		default: false,
	},
	activationHash: String,
})

const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User
export type FullUserType = {
	_id: ObjectId
	email: string
	password: string
	fullName: string
	role: UserRole
	activated: Boolean
	activationHash: String
}

export type UserDataType = {
	_id: ObjectId
	email?: string | null
	fullName: string
	role: UserRole
}
