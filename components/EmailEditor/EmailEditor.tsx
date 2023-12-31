import {redirect} from "next/navigation"

import {useEmail} from "@/hooks/useJsonData"
import {stringToBool} from "@/utils/convert"

import Editor from "../ArticleContentEditor/ArticleContentEditor"
import {Button} from "../Button/Button"
import ButtonAccent from "../Button/ButtonAccent"
import Input from "../Input/Input"
import PreviewInfo, {previewTitle} from "../PreviewInfo/PreviewInfo"
import SettingsOptionContainer from "../SettingsOptionContainer/SettingsOptionContainer"
import styles from "./EmailEditor.module.scss"

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
		<SettingsOptionContainer>
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
					aria-label="Save"
				>
					Save
				</Button>
			</form>
		</SettingsOptionContainer>
	)
}
export default EmailEditor
