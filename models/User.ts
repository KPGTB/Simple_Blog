import mongoose, {ObjectId, Schema} from "mongoose"

const userSchema = new Schema({
	username: String,
	password: String,
	fullName: String,
	role: String,
})

const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User
export type FullUserType = {
	_id: ObjectId
	username: string
	password: string
	fullName: string
	role: string
}

export type UserDataType = {
	_id: ObjectId
	username: string
	fullName: string
	role: string
}
