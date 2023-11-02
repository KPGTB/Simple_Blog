import connect from "@/libs/mongodb"
import Article, {ArticleType} from "@/models/Article"
import {hasAccess} from "@/libs/credentials"
import {UserRole} from "@/models/User"
import ArticleCard from "@/components/ArticleCard/ArticleCard"

import styles from "./page.module.scss"

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
			{articles.map((article) => (
				<ArticleCard
					article={article}
					key={article._id.toString()}
				/>
			))}

			{access && <ArticleCard.Add />}
		</article>
	)
}
