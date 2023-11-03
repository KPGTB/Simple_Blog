import ArticleEditor from "@/components/ArticleEditor/ArticleEditor"

import styles from "../page.module.scss"

const Page = () => {
	return (
		<section className={styles.container}>
			<h2>Add new article</h2>

			<ArticleEditor />
		</section>
	)
}

export default Page
