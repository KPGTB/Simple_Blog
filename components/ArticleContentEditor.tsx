"use client"
import {useEffect, useRef, useState} from "react"

type EditorProps = {
	placeholder?: string
	name?: string
}

const ArticleContentEditor = (props: EditorProps) => {
	const inputRef = useRef<any>()
	const editorRef = useRef<any>()

	const [editorLoaded, setEditorLoaded] = useState<boolean>(false)
	const {CKEditor, Editor} = editorRef.current || {}

	useEffect(() => {
		editorRef.current = {
			CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
			Editor: require("@/libs/ckeditor5/build/ckeditor"),
		}
		setEditorLoaded(true)
	}, [])

	return editorLoaded ? (
		<>
			<CKEditor
				editor={Editor}
				data={props.placeholder}
				// @ts-ignore
				onChange={(event, editor) => {
					const data = editor.getData()
					inputRef.current.value = data
				}}
				onReady={() => {
					inputRef.current.value = props.placeholder
				}}
			/>

			<input
				name={props.name}
				style={{display: "none"}}
				ref={inputRef}
			/>
		</>
	) : (
		<>Loading editor...</>
	)
}

export default ArticleContentEditor
