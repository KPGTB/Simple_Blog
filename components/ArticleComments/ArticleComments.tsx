import {FaCalendar, FaComment, FaTrash, FaUser} from "react-icons/fa"

import {useAuth} from "@/hooks/useAuth"
import {hasAccess} from "@/libs/credentials"
import {CommentType} from "@/models/Comment"
import {UserRole} from "@/models/User"
import {classesToClass, convertDate} from "@/utils/convert"

import {ActionButton} from "../Action/Action"
import {Button} from "../Button/Button"
import ButtonAccent from "../Button/ButtonAccent"
import HiddenId from "../HiddenId/HiddenId"
import Input from "../Input/Input"
import PreviewInfo, {previewTitle} from "../PreviewInfo/PreviewInfo"
import styles from "./ArticleComments.module.scss"
import {getComments, removeComment, sendComment} from "./CommentsActions"

export const dynamic = "force-dynamic"

const NewComment = ({articleId}: {articleId: string}) => {
	return (
		<form
			className={styles.comment}
			action={sendComment}
		>
			<HiddenId id={articleId} />
			<Input.Area
				name="content"
				placeholder="Comment Content"
				required
				style={{resize: "none"}}
				minLength={10}
				className={styles.commentText}
			/>
			<PreviewInfo />
			<Button
				hover={ButtonAccent.YELLOW}
				title={previewTitle}
				className={styles.send}
				aria-label="Send Comment"
			>
				Send
			</Button>
		</form>
	)
}

const ArticleComments = async ({articleId}: {articleId: string}) => {
	const comments: CommentType[] = await getComments(articleId)
	const access = await hasAccess(UserRole.EDITOR, UserRole.ADMIN)
	const {logged, data} = await useAuth()

	return (
		<section className={styles.comments}>
			<h3>Comments ({comments.length})</h3>

			{logged && <NewComment articleId={articleId} />}

			{Array.from(comments).map((comment) => {
				return (
					<section
						className={styles.comment}
						key={comment._id.toString()}
					>
						<section className={styles.username}>
							<FaUser
								className={classesToClass(
									styles.icon,
									styles.data
								)}
							/>{" "}
							{comment.authorName}
							{(access ||
								(logged &&
									data!._id.toString() ===
										comment.authorId)) && (
								<form action={removeComment}>
									<HiddenId id={comment._id.toString()} />
									<ActionButton
										className={styles.removeComment}
										title={previewTitle}
										aria-label="Remove Comment"
									>
										<FaTrash className={styles.data} />
									</ActionButton>
								</form>
							)}
						</section>

						<section className={styles.data}>
							<FaCalendar className={styles.icon} />{" "}
							{convertDate(comment.createdAt)}
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
	)
}

export default ArticleComments
