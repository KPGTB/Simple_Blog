import Editor from "@/components/ArticleContentEditor"
import styles from "../../page.module.scss"
import connect from "@/libs/mongodb"
import Article, {ArticleType} from "@/models/Article"
import {redirect} from "next/navigation"
import ImageInput from "@/components/ImageInput"

const getArticle = async (id: string) => {
	await connect()
	let data: ArticleType | null
	try {
		data = await Article.findById(id)
	} catch (error) {
		throw new TypeError("Can't find article with that id")
	}
	if (data === null) {
		throw new TypeError("Can't find article with that id")
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
					inputPlaceholder="Image"
					sectionClass={styles.imageContainer}
					defaultValue={article.image}
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
