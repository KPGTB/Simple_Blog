"use client"
import {useState, useEffect} from "react"

const getImage = (hasError: boolean, loading: boolean, image: string) => {
	if (loading) {
		return "/LoadingImg.png"
	}
	if (hasError || image == "") {
		return "/NoImg.png"
	}
	return image
}

const ArticleImage = ({
	src,
	alt,
	className,
	...delegated
}: {
	src: string
	alt: string
	className?: string
}) => {
	const [hasError, setError] = useState<boolean>(true)
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		setError(false)
		setLoading(false)
	}, [])

	return (
		<img
			src={getImage(hasError, loading, src)}
			className={className || ""}
			onError={() => setError(true)}
			onEmptied={() => setError(true)}
			alt={alt}
			{...delegated}
		/>
	)
}

export default ArticleImage
