import ArticleImage from "@/components/ArticleImage/ArticleImage"
import {ArticleType} from "@/models/Article"
import {FaCalendar, FaPen, FaTrash, FaUser} from "react-icons/fa"
import styles from "./page.module.scss"
import {hasAccess} from "@/libs/credentials"
import {UserRole} from "@/models/User"
import {classesToClass, convertDate} from "@/utils/convert"
import {ActionButton, ActionLink} from "@/components/Action/Action"
import {previewTitle} from "@/components/PreviewInfo/PreviewInfo"
import ArticleComments from "@/components/ArticleComments/ArticleComments"
import HiddenId from "@/components/HiddenId/HiddenId"
import {getArticle, removeArticle} from "./ArticleActions"

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
							<ActionLink href={"/edit/" + params.id}>
								<FaPen />
							</ActionLink>
							<form action={removeArticle}>
								<HiddenId id={params.id} />
								<ActionButton title={previewTitle}>
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
