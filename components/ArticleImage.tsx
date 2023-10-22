"use client"

import {NoImg, LoadingImg} from "@/components/ImageInput"
import {useState, useEffect} from "react"

type ArticleImageProp = {
	src: string
	alt: string
	className?: string
}

const getImage = (hasError: boolean, loading: boolean, image: string) => {
	if (loading) {
		return LoadingImg.src
	}
	if (hasError || image == "") {
		return NoImg.src
	}
	return image
}

const ArticleImage = (props: ArticleImageProp) => {
	const [hasError, setError] = useState<boolean>(true)
	const [image, setImage] = useState<string>("")
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		setError(false)
		setImage(props.src)
		setLoading(false)
	}, [])

	return (
		<img
			src={getImage(hasError, loading, props.src)}
			className={props.className}
			alt={props.alt}
			onError={() => setError(true)}
			onEmptied={() => setError(true)}
		/>
	)
}

export default ArticleImage
