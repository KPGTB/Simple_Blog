import Editor from "@/components/ArticleContentEditor"
import styles from "../../page.module.scss"
import connect from "@/libs/mongodb"
import Article, {ArticleType} from "@/models/Article"
import {redirect} from "next/navigation"
import ImageInput from "@/components/ImageInput"

export const dynamic = "force-dynamic"

const getArticle = async (id: string) => {
	await connect()
	let data: ArticleType | null
	try {
		data = await Article.findById(id)
	} catch (error) {
		redirect("/")
		return null
	}
	if (data === null) {
		redirect("/")
		return null
	}
	return data
}

const EditArticle = async (data: FormData, id: string) => {
	await connect()
	await Article.findByIdAndUpdate(id, {
		title: data.get("title"),
		image: data.get("image"),
		description: data.get("editor"),
	})
}

const Page = async ({params}: {params: {id: string}}) => {
	const article = await getArticle(params.id)

	if (article == null) {
		return ""
	}
	return (
		<section className={styles.container}>
			<h2>Edit article</h2>
			<form
				action={async (data: FormData) => {
					"use server"
					await EditArticle(data, params.id)
					redirect("/")
				}}
				className={styles.form}
			>
				<input
					className={styles.title}
					name="title"
					placeholder="Article title"
					aria-label="Article title"
					defaultValue={article.title}
					required
				/>

				<ImageInput
					name="image"
					required={true}
					imageClass={styles.image}
					inputClass={styles.imageInput}
					imageLabel="Image of article"
					inputPlaceholder="Image URL"
					sectionClass={styles.imageContainer}
					defaultValue={article.image}
					fileClass={styles.file}
					inputsContainerClass={styles.inputs}
					fileContainerClass={styles.fileContainer}
				/>

				<Editor
					placeholder={article.description}
					name="editor"
				/>
				<button
					className={styles.submit}
					aria-label="Edit article"
				>
					Edit article
				</button>
			</form>
		</section>
	)
}

export default Page
