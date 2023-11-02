"use client"
import {useState, useEffect, DetailedHTMLProps, ImgHTMLAttributes} from "react"

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
	className,
	...delegated
}: {
	src: string
	className?: string
} & DetailedHTMLProps<
	ImgHTMLAttributes<HTMLImageElement>,
	HTMLImageElement
>) => {
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
			{...delegated}
		/>
	)
}

export default ArticleImage
