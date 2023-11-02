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

export default PreviewInfo
export const previewTitle = stringToBool(process.env.PREVIEW)
	? "This option is disabled in Preview Mode"
	: ""
