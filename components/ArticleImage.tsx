"use client"

import {DefaultImage} from "@/components/ImageInput"
import {useState, useEffect} from "react"

type ArticleImageProp = {
	src: string
	alt: string
	className?: string
}

const ArticleImage = (props: ArticleImageProp) => {
	const [hasError, setError] = useState<boolean>(true)
	const [image, setImage] = useState<string>("")

	useEffect(() => {
		setError(false)
		setImage(props.src)
	}, [])

	return (
		<img
			src={hasError || image == "" ? DefaultImage : props.src}
			className={props.className}
			alt={props.alt}
			onError={() => setError(true)}
			onEmptied={() => setError(true)}
		/>
	)
}

export default ArticleImage
