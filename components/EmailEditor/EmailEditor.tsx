import styles from "./EmailEditor.module.scss"
import AdminOptionContainer from "../AdminOptionContainer/AdminOptionContainer"
import {useEmail} from "@/hooks/useJsonData"
import {stringToBool} from "@/utils/convert"
import {redirect} from "next/navigation"
import Input from "../Input/Input"
import Editor from "../ArticleContentEditor/ArticleContentEditor"
import PreviewInfo, {previewTitle} from "../PreviewInfo/PreviewInfo"
import {Button} from "../Button/Button"
import ButtonAccent from "../Button/ButtonAccent"

const EmailEditor = async () => {
	const {email, setEmail} = await useEmail()

	const edit = async (data: FormData) => {
		"use server"
		if (stringToBool(process.env.PREVIEW)) {
			return
		}

		const title = data.get("title")?.toString()
		const content = data.get("editor")?.toString()

		const json = {
			title: title!,
			content: content!,
		}

		await setEmail(json)
		redirect("/admin")
	}

	return (
		<AdminOptionContainer>
			<h3>Activation Email</h3>

			<form
				className={styles.emailForm}
				action={edit}
			>
				<Input
					name="title"
					defaultValue={email.title}
					className={styles.titleInput}
				/>

				<Editor
					placeholder={email.content}
					name="editor"
				/>

				<PreviewInfo />

				<Button
					className={styles.button}
					hover={ButtonAccent.YELLOW}
					title={previewTitle}
				>
					Save
				</Button>
			</form>
		</AdminOptionContainer>
	)
}
export default EmailEditor
