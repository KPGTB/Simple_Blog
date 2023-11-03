"use client"

import {useState} from "react"

import {fileToB64} from "@/utils/convert"

import ArticleImage from "../ArticleImage/ArticleImage"
import Input from "../Input/Input"
import Line from "../Line/Line"
import styles from "./ImageInput.module.scss"

type ImageInputProps = {
	name?: string
	imageLabel?: string
	className?: string
	inputPlaceholder?: string
	required?: boolean
	defaultValue?: string
}

const ImageInput = (props: ImageInputProps) => {
	const [image, setImage] = useState<string>(props.defaultValue || "")

	const handleFile = async (event: any) => {
		const file = event.target.files[0]

		if (file.size > 1024 * 1024) {
			alert("Max image size: 1MB")
			return
		}

		const b64 = await fileToB64(file)
		setImage(b64?.toString()!)
	}

	return (
		<section className={props.className}>
			<ArticleImage
				src={image}
				alt={props.imageLabel || ""}
				className={styles.image}
			/>

			<section className={styles.inputs}>
				<Input.File
					onChange={handleFile}
					accept="image/*"
				/>

				<Line>or</Line>

				<Input
					name={props.name}
					required={props.required}
					className={styles.imageInput}
					placeholder={props.inputPlaceholder}
					aria-label={props.inputPlaceholder}
					defaultValue={props.defaultValue}
					onChange={(el) => {
						setImage(el.target.value)
					}}
					value={image}
				/>
			</section>
		</section>
	)
}

export default ImageInput
