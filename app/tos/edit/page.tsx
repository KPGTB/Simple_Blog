import {promises as fs} from "fs"
import styles from "./page.module.scss"
import Editor from "@/components/ArticleContentEditor"
import {redirect} from "next/navigation"

const edit = async (data: FormData) => {
	"use server"
	if (process.env.PREVIEW === "TRUE") {
		return
	}
	const content = data.get("editor")
	const json = {
		lastUpdate: Date.now(),
		content: content,
	}

	await fs.writeFile(
		process.cwd() + "/assets/tos.json",
		JSON.stringify(json),
		"utf-8"
	)

	redirect("/tos")
}

const Page = async () => {
	const file = await fs.readFile(process.cwd() + "/assets/tos.json", "utf-8")
	const json: {lastUpdate: number; content: string} = await JSON.parse(file)

	return (
		<section className={styles.container}>
			<h2>Edit Terms of Service</h2>
			<form
				action={edit}
				className={styles.form}
			>
				<Editor
					placeholder={json.content}
					name="editor"
				/>

				{process.env.PREVIEW === "TRUE" && (
					<span style={{fontSize: ".8rem"}}>
						This option is disabled in preview mode
					</span>
				)}
				<button
					className={styles.submit}
					aria-label="Edit TOS"
					title={
						process.env.PREVIEW === "TRUE"
							? "This option is disabled in Preview Mode"
							: ""
					}
				>
					Edit TOS
				</button>
			</form>
		</section>
	)
}

export default Page
