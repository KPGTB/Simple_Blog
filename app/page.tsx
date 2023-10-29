import Link from "next/link.js"
import styles from "./page.module.scss"
import {FaUser, FaCalendar, FaPlus} from "react-icons/fa"
import connect from "@/libs/mongodb"
import Article, {ArticleType} from "@/models/Article"
import ArticleImage from "@/components/ArticleImage"
import {hasAccess} from "@/libs/credentials"
import UserRole from "@/types/UserRole"

export const dynamic = "force-dynamic"

const getArticles = async () => {
	await connect()
	const articles: ArticleType[] = await Article.find().sort({createdAt: -1})
	return articles
}

export default async function Home() {
	const articles: ArticleType[] = await getArticles()
	const access = await hasAccess(UserRole.EDITOR, UserRole.ADMIN)

	return (
		<article className={styles.container}>
			{articles.map((article) => {
				return (
					<section
						key={article._id.toString()}
						className={styles.post}
					>
						<ArticleImage
							src={article.image}
							alt={article.title}
						/>
						<section className={styles.postInfo}>
							<section>
								<FaUser />
								{article.author}
							</section>
							<section>
								<FaCalendar />{" "}
								{new Date(article.createdAt.toString())
									.toLocaleString()
									.replace(",", "")}
							</section>
						</section>
						<section className={styles.postTitle}>
							{article.title}
						</section>
						<Link href={`/article/${article._id}`}>Read</Link>
					</section>
				)
			})}

			{access && (
				<Link
					href={"/add"}
					className={styles.addPost}
				>
					<FaPlus />
				</Link>
			)}
		</article>
	)
}
