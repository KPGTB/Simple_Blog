import Editor from "@/components/ArticleContentEditor"
import styles from "../page.module.scss"
import connect from "@/libs/mongodb"
import Article from "@/models/Article"
import {redirect} from "next/navigation"
import ImageInput from "@/components/ImageInput"
import {authOptions} from "@/app/api/auth/[...nextauth]/route"
import {getServerSession} from "next-auth/next"

const AddArticle = async (data: FormData) => {
	"use server"
	const session = await getServerSession(authOptions)
	await connect()
	await Article.create({
		title: data.get("title"),
		image: data.get("image"),
		author: session?.user.fullName,
		description: data.get("editor"),
	})
	redirect("/")
}

const Page = () => {
	return (
		<section className={styles.container}>
			<h2>Add new article</h2>
			<form
				action={AddArticle}
				className={styles.form}
			>
				<input
					className={styles.title}
					name="title"
					placeholder="Article title"
					aria-label="Article title"
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
				/>

				<Editor
					placeholder="Article content"
					name="editor"
				/>
				<button
					className={styles.submit}
					aria-label="Add article"
				>
					Add article
				</button>
			</form>
		</section>
	)
}

export default Page
