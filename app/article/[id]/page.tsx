import ArticleImage from "@/components/ArticleImage"
import connect from "@/libs/mongodb"
import Article, {ArticleType} from "@/models/Article"
import {FaCalendar, FaComment, FaPen, FaTrash, FaUser} from "react-icons/fa"
import styles from "./page.module.scss"
import Link from "next/link"
import {redirect} from "next/navigation"
import {hasAccess} from "@/libs/credentials"
import UserRole from "@/types/UserRole"
import Comment, {CommentType} from "@/models/Comment"
import {getServerSession} from "next-auth"
import {authOptions} from "@/app/api/auth/[...nextauth]/route"

export const dynamic = "force-dynamic"

const getArticle = async (id: string) => {
	await connect()
	let data: ArticleType | null
	try {
		data = await Article.findById(id)
	} catch (error) {
		redirect("/")
		return null
	}
	if (data === null) {
		redirect("/")
		return null
	}
	return data
}

const getComments = async (id: string) => {
	await connect()
	const data: CommentType[] = await Comment.find({
		articleId: id,
	}).sort({createdAt: -1})
	return data
}

const removeArticle = async (id: string) => {
	const access = await hasAccess(UserRole.EDITOR, UserRole.ADMIN)
	if (!access) {
		return
	}
	await connect()
	await Article.findByIdAndDelete(id)
}

const sendComment = async (data: FormData) => {
	"use server"
	const access = await hasAccess()
	if (!access) {
		return
	}

	const id = data.get("id")
	const content = data.get("content")
	if (content!.toString().length < 10) {
		return
	}

	const session = await getServerSession(authOptions)

	await Comment.create({
		authorId: session?.user._id,
		authorName: session?.user.fullName,
		articleId: id,
		description: content,
	})

	redirect("/article/" + id)
}

const removeComment = async (data: FormData) => {
	"use server"

	const id = data.get("id")
	const comment = await Comment.findById(id)

	const access = await hasAccess(UserRole.EDITOR, UserRole.ADMIN)
	const session = await getServerSession(authOptions)

	if (
		!access &&
		(!session?.user ||
			session.user._id.toString() !== comment.authorId.toString())
	) {
		return
	}

	await Comment.deleteOne({_id: id})
	redirect("/article/" + comment.articleId)
}
const Page = async ({params}: {params: {id: string}}) => {
	const article: ArticleType | null = await getArticle(params.id)
	const comments: CommentType[] = await getComments(params.id)
	const access = await hasAccess(UserRole.EDITOR, UserRole.ADMIN)
	const logged = await hasAccess()
	const session = await getServerSession(authOptions)

	if (article == null) {
		return ""
	}
	return (
		<article className={styles.container}>
			<section className={styles.infoContainer}>
				<ArticleImage
					src={article.image}
					alt={article.title}
					className={styles.image}
				/>
				<section className={styles.info}>
					<h2 className={styles.title}>{article.title}</h2>
					<section className={styles.data}>
						<FaUser />
						{article.author}
					</section>
					<section className={styles.data}>
						<FaCalendar />{" "}
						{new Date(article.createdAt.toString())
							.toLocaleString()
							.replace(",", "")}
					</section>
					<br />
					{access && (
						<section
							className={
								styles.data + " " + styles.actionContainer
							}
						>
							<Link
								href={"/edit/" + params.id}
								className={styles.action}
							>
								<FaPen />
							</Link>
							<form
								action={async () => {
									"use server"
									await removeArticle(params.id)
									redirect("/")
								}}
							>
								<button className={styles.action}>
									<FaTrash />
								</button>
							</form>
						</section>
					)}
				</section>
			</section>

			<hr />

			<section
				dangerouslySetInnerHTML={{__html: article.description}}
				className={styles.description + " ck-content"}
			/>

			<hr />
			<section className={styles.comments}>
				<h3>Comments ({comments.length})</h3>

				{logged && (
					<form
						className={styles.comment}
						action={sendComment}
					>
						<input
							type="hidden"
							value={params.id}
							name="id"
						/>
						<textarea
							name="content"
							placeholder="Comment Content"
							required
							style={{resize: "none"}}
							minLength={10}
							className={styles.commentText}
						></textarea>
						<button className={styles.send}>Send</button>
					</form>
				)}

				{Array.from(comments).map((comment) => {
					return (
						<section
							className={styles.comment}
							key={comment._id.toString()}
						>
							<section className={styles.username}>
								<FaUser
									className={styles.icon + " " + styles.data}
								/>{" "}
								{comment.authorName}
								{(access ||
									(session?.user &&
										session.user._id.toString() ===
											comment.authorId)) && (
									<form action={removeComment}>
										<input
											type="hidden"
											name="id"
											value={comment._id.toString()}
										/>
										<button
											className={
												styles.action +
												" " +
												styles.removeComment
											}
										>
											<FaTrash className={styles.data} />
										</button>
									</form>
								)}
							</section>
							<section className={styles.data}>
								<FaCalendar className={styles.icon} />{" "}
								{new Date(comment.createdAt.toString())
									.toLocaleString()
									.replace(",", "")}
							</section>
							<section className={styles.description}>
								<FaComment
									className={styles.icon + " " + styles.data}
								/>{" "}
								{comment.description}
							</section>
						</section>
					)
				})}
			</section>
		</article>
	)
}

export default Page
