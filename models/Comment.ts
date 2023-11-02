import mongoose, {Date, ObjectId, Schema} from "mongoose"

const commentSchema = new Schema(
	{
		authorId: String,
		authorName: String,
		articleId: String,
		description: String,
	},
	{
		timestamps: true,
	}
)

const Comment =
	mongoose.models.Comment || mongoose.model("Comment", commentSchema)

export default Comment
export type CommentType = {
	_id: ObjectId
	authorId: string
	authorName: string
	articleId: string
	description: string
	createdAt: Date
	updatedAt: Date
}
