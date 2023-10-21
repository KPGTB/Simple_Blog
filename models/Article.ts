import mongoose, {Date, ObjectId, Schema} from "mongoose"

const articleSchema = new Schema(
	{
		title: String,
		image: String,
		author: String,
		description: String,
	},
	{
		timestamps: true,
	}
)

const Article =
	mongoose.models.Article || mongoose.model("Article", articleSchema)

export default Article
export type ArticleType = {
	_id: ObjectId
	title: string
	image: string
	author: string
	description: string
	createdAt: Date
	updatedAt: Date
}
