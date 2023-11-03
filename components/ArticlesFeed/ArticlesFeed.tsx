import ArticleCard from "@/components/ArticleCard/ArticleCard"
import {hasAccess} from "@/libs/credentials"
import connect from "@/libs/mongodb"
import Article, {ArticleType} from "@/models/Article"
import {UserRole} from "@/models/User"

import styles from "./ArticlesFeed.module.scss"

const getArticles = async () => {
	await connect()
	const articles: ArticleType[] = await Article.find().sort({createdAt: -1})
	return articles
}

const ArticlesFeed = async () => {
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

export default ArticlesFeed
