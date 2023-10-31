"use client"

import {useRef, useState} from "react"
import NoImg from "../assets/NoImg.png"
import LoadingImg from "../assets/LoadingImg.png"

type ImageInputProps = {
	name?: string
	imageLabel?: string
	imageClass?: string
	inputClass?: string
	fileClass?: string
	inputsContainerClass?: string
	inputPlaceholder?: string
	required?: boolean
	defaultValue?: string
	fileContainerClass?: string
	sectionClass: string
}

const convertBase64 = (file: File) => {
	return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
		const fileReader = new FileReader()
		fileReader.readAsDataURL(file)

		fileReader.onload = () => {
			resolve(fileReader.result)
		}

		fileReader.onerror = (error) => {
			reject(error)
		}
	})
}

const ImageInput = (props: ImageInputProps) => {
	const [image, setImage] = useState<string>(props.defaultValue || "")
	const [hasError, setError] = useState<boolean>(
		props.defaultValue == null ? true : false
	)
	const inputRef = useRef<HTMLInputElement>(null)

	const handleFile = async (event: any) => {
		if (inputRef.current === null) {
			return
		}
		const file = event.target.files[0]

		if (file.size > 1024 * 1024) {
			alert("Max image size: 1MB")
			return
		}

		const b64 = await convertBase64(file)
		inputRef.current.value = b64?.toString()!
		setError(false)
		setImage(b64?.toString()!)
	}

	return (
		<section className={props.sectionClass}>
			<img
				src={hasError || image == "" ? NoImg.src : image}
				alt={props.imageLabel || ""}
				className={props.imageClass}
				onError={() => setError(true)}
				onEmptied={() => setError(true)}
			/>

			<section className={props.inputsContainerClass}>
				<section className={props.fileContainerClass}>
					<input
						type="file"
						className={props.fileClass}
						onChange={handleFile}
						accept="image/*"
					/>
				</section>

				<section className="lineWithText">or</section>

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
					ref={inputRef}
				/>
			</section>
		</section>
	)
}

export default ImageInput
export {NoImg, LoadingImg}
