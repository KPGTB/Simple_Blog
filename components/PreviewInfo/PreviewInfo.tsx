import {stringToBool} from "@/utils/convert"

const PreviewInfo = () => {
	const isPreview = stringToBool(process.env.PREVIEW)
	return isPreview ? (
		<span style={{fontSize: ".8rem"}}>
			This option is disabled in preview mode
		</span>
	) : (
		<></>
	)
}

const getPreviewTitle = () => {
	const isPreview = stringToBool(process.env.PREVIEW)
	return isPreview ? "This option is disabled in Preview Mode" : ""
}

export default PreviewInfo
export {getPreviewTitle}
