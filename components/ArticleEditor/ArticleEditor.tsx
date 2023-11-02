import {ArticleType} from "@/models/Article"
import {addArticle, editArticle} from "./ArticleEditorActions"
import styles from "./ArticleEditor.module.scss"
import Input from "../Input/Input"
import ImageInput from "../ImageInput/ImageInput"
import Editor from "@/components/ArticleContentEditor/ArticleContentEditor"
import PreviewInfo, {previewTitle} from "../PreviewInfo/PreviewInfo"
import {Button} from "../Button/Button"
import HiddenId from "../HiddenId/HiddenId"
import ButtonAccent from "../Button/ButtonAccent"

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
