import {FaCalendar, FaPen, FaTrash, FaUser} from "react-icons/fa"

import {ActionButton, ActionLink} from "@/components/Action/Action"
import ArticleComments from "@/components/ArticleComments/ArticleComments"
import ArticleImage from "@/components/ArticleImage/ArticleImage"
import HiddenId from "@/components/HiddenId/HiddenId"
import {previewTitle} from "@/components/PreviewInfo/PreviewInfo"
import {hasAccess} from "@/libs/credentials"
import {ArticleType} from "@/models/Article"
import {UserRole} from "@/models/User"
import {classesToClass, convertDate} from "@/utils/convert"

import {getArticle, removeArticle} from "./ArticleActions"
import styles from "./page.module.scss"

export const dynamic = "force-dynamic"

const Page = async ({params}: {params: {id: string}}) => {
	const article: ArticleType | null = await getArticle(params.id)
	const access = await hasAccess(UserRole.EDITOR, UserRole.ADMIN)

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
						<FaCalendar /> {convertDate(article.createdAt)}
					</section>
					<br />
					{access && (
						<section
							className={classesToClass(
								styles.data,
								styles.actionContainer
							)}
						>
							<ActionLink
								href={"/edit/" + params.id}
								aria-label="Edit article"
							>
								<FaPen />
							</ActionLink>
							<form
								action={removeArticle}
								aria-label="Remove Article"
							>
								<HiddenId id={params.id} />
								<ActionButton
									title={previewTitle}
									aria-label="Remove Article"
								>
									<FaTrash />
								</ActionButton>
							</form>
						</section>
					)}
				</section>
			</section>

			<hr />

			<section
				dangerouslySetInnerHTML={{__html: article.description}}
				className={classesToClass(styles.description, "ck-content")}
			/>

			<hr />

			<ArticleComments articleId={params.id} />
		</article>
	)
}

export default Page
