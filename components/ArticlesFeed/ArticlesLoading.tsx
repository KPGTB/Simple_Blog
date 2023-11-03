import ArticleCard from "@/components/ArticleCard/ArticleCard"

import styles from "./ArticlesFeed.module.scss"

const ArticlesLoading = () => {
	return (
		<article className={styles.container}>
			{[...Array(4)].map((i) => (
				<ArticleCard.Skeleton key={i} />
			))}
		</article>
	)
}

export default ArticlesLoading
