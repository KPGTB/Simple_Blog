"use client"

import Editor from "@/ckeditor5/build/ckeditor"
import {CKEditor} from "@ckeditor/ckeditor5-react"
import {useEffect, useRef} from "react"

type EditorProps = {
	placeholder?: string
	name?: string
}

const ArticleContentEditor = (props: EditorProps) => {
	const inputRef = useRef<any>()
	useEffect(() => {
		inputRef.current.value = props.placeholder
	}, [])
	return (
		<>
			<CKEditor
				// @ts-ignore
				editor={Editor}
				data={props.placeholder}
				onChange={(event, editor) => {
					// @ts-ignore
					const data = editor.getData()
					inputRef.current.value = data
				}}
			/>
			<input
				name={props.name}
				style={{display: "none"}}
				ref={inputRef}
			/>
		</>
	)
}

export default ArticleContentEditor
