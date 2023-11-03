import {getArticle} from "@/app/article/[id]/ArticleActions"
import ArticleEditor from "@/components/ArticleEditor/ArticleEditor"

import styles from "../../page.module.scss"

export const dynamic = "force-dynamic"

const Page = async ({params}: {params: {id: string}}) => {
	const article = await getArticle(params.id)

	if (article == null) {
		return ""
	}
	return (
		<section className={styles.container}>
			<h2>Edit article</h2>

			<ArticleEditor article={article} />
		</section>
	)
}

export default Page
