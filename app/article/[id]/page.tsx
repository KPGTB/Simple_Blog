import ArticleImage from "@/components/ArticleImage"
import connect from "@/libs/mongodb"
import Article, {ArticleType} from "@/models/Article"
import {FaCalendar, FaPen, FaTrash, FaUser} from "react-icons/fa"
import styles from "./page.module.scss"
import Link from "next/link"
import {redirect} from "next/navigation"

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

const removeArticle = async (id: string) => {
	await connect()
	await Article.findByIdAndDelete(id)
}

const Page = async ({params}: {params: {id: string}}) => {
	const article: ArticleType = await getArticle(params.id)
	return (
		<article className={styles.container}>
			<section className={styles.infoContainer}>
				<ArticleImage
					src={article.image}
					alt={article.title}
					className={styles.image}
				/>
				<section className={styles.info}>
					<h2 className={styles.title}>{article.title}</h2>
					<section className={styles.data}>
						<FaUser />
						{article.author}
					</section>
					<section className={styles.data}>
						<FaCalendar />{" "}
						{new Date(article.createdAt.toString())
							.toLocaleString()
							.replace(",", "")}
					</section>
					<br />
					<section
						className={styles.data + " " + styles.actionContainer}
					>
						<Link
							href={"/edit/" + params.id}
							className={styles.action}
						>
							<FaPen />
						</Link>
						<form
							action={async () => {
								"use server"
								await removeArticle(params.id)
								redirect("/")
							}}
						>
							<button className={styles.action}>
								<FaTrash />
							</button>
						</form>
					</section>
				</section>
			</section>

			<hr />

			<section
				dangerouslySetInnerHTML={{__html: article.description}}
				className={styles.description + " ck-content"}
			/>
		</article>
	)
}

export default Page
