import Editor from "@/components/ArticleContentEditor/ArticleContentEditor"
import {ArticleType} from "@/models/Article"

import {Button} from "../Button/Button"
import ButtonAccent from "../Button/ButtonAccent"
import HiddenId from "../HiddenId/HiddenId"
import ImageInput from "../ImageInput/ImageInput"
import Input from "../Input/Input"
import PreviewInfo, {previewTitle} from "../PreviewInfo/PreviewInfo"
import styles from "./ArticleEditor.module.scss"
import {addArticle, editArticle} from "./ArticleEditorActions"

const ArticleEditor = ({article}: {article?: ArticleType}) => {
	return (
		<form
			action={article ? editArticle : addArticle}
			className={styles.form}
		>
			{article && <HiddenId id={article._id.toString()} />}

			<Input
				className={styles.title}
				name="title"
				placeholder="Article title"
				aria-label="Article title"
				required
				defaultValue={article ? article.title : ""}
			/>

			<ImageInput
				name="image"
				required={true}
				imageLabel="Image of article"
				inputPlaceholder="Image URL"
				className={styles.imageContainer}
				defaultValue={article ? article.image : ""}
			/>

			<Editor
				placeholder={article ? article.description : "Article content"}
				name="editor"
			/>

			<PreviewInfo />

			<Button
				className={styles.submit}
				aria-label="Add article"
				title={previewTitle}
				hover={ButtonAccent.YELLOW}
			>
				{article ? "Edit Article" : "Add Article"}
			</Button>
		</form>
	)
}

export default ArticleEditor
