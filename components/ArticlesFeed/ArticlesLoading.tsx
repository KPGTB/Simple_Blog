import ArticleCard from "@/components/ArticleCard/ArticleCard"
import styles from "./ArticlesFeed.module.scss"

const ArticlesLoading = () => {
	return (
		<article className={styles.container}>
			{[...Array(4)].map(() => (
				<ArticleCard.Skeleton />
			))}
		</article>
	)
}

export default ArticlesLoading
