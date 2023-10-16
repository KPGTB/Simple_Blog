"use client"

import Editor from "@/ckeditor5/build/ckeditor"
import {CKEditor} from "@ckeditor/ckeditor5-react"
import {useState} from "react"

const TestEditor = () => {
	const [bb, setBB] = useState("")
	return (
		<div>
			<CKEditor
				// @ts-ignore
				editor={Editor}
				data={"Example text"}
				onReady={() => console.log("Ready!")}
				onChange={(event, editor) => {
					// @ts-ignore
					const data = editor.getData()
					setBB(data)
				}}
			/>
			<hr />
			<b>Output</b>
			<p>{bb}</p>
		</div>
	)
}

export default TestEditor
