"use client"

import Image from "next/image.js"
import {useState} from "react"

type ImageInputProps = {
	name?: string
	imageLabel?: string
	imageClass?: string
	inputClass?: string
	inputPlaceholder?: string
	required?: boolean
	defaultValue?: string
	sectionClass: string
}

const DefaultImage = "https://cezim.pl/wp-content/uploads/2021/12/empty.jpg"

const ImageInput = (props: ImageInputProps) => {
	const [image, setImage] = useState<string>(props.defaultValue || "")
	const [hasError, setError] = useState<boolean>(
		props.defaultValue == null ? true : false
	)

	return (
		<section className={props.sectionClass}>
			<img
				src={hasError || image == "" ? DefaultImage : image}
				alt={props.imageLabel || ""}
				className={props.imageClass}
				onError={() => setError(true)}
				onEmptied={() => setError(true)}
			/>

			<input
				name={props.name}
				required={props.required}
				className={props.inputClass}
				placeholder={props.inputPlaceholder}
				aria-label={props.inputPlaceholder}
				defaultValue={props.defaultValue}
				onChange={(el) => {
					setError(false)
					setImage(el.target.value)
				}}
			/>
		</section>
	)
}

export default ImageInput
export {DefaultImage}
