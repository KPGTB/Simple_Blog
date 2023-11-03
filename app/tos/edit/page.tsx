import {redirect} from "next/navigation"

import Editor from "@/components/ArticleContentEditor/ArticleContentEditor"
import {Button} from "@/components/Button/Button"
import ButtonAccent from "@/components/Button/ButtonAccent"
import PreviewInfo, {previewTitle} from "@/components/PreviewInfo/PreviewInfo"
import {useTos} from "@/hooks/useJsonData"
import {stringToBool} from "@/utils/convert"

import styles from "./page.module.scss"

export const dynamic = "force-dynamic"

const Page = async () => {
	const {tos, setTos} = await useTos()

	const edit = async (data: FormData) => {
		"use server"
		if (stringToBool(process.env.PREVIEW)) {
			return
		}
		const content = data.get("editor")

		if (content === null) {
			return
		}

		const json = {
			lastUpdate: Date.now(),
			content: content.toString(),
		}

		setTos(json)
		redirect("/tos")
	}

	return (
		<section className={styles.container}>
			<h2>Edit Terms of Service</h2>
			<form
				action={edit}
				className={styles.form}
			>
				<Editor
					placeholder={tos.content}
					name="editor"
				/>

				<PreviewInfo />

				<Button
					aria-label="Edit TOS"
					hover={ButtonAccent.YELLOW}
					title={previewTitle}
				>
					Edit TOS
				</Button>
			</form>
		</section>
	)
}

export default Page
