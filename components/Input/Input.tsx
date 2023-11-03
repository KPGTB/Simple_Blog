import {
	DetailedHTMLProps,
	InputHTMLAttributes,
	TextareaHTMLAttributes,
} from "react"

import {classesToClass} from "@/utils/convert"

import styles from "./Input.module.scss"

const Input = ({
	className,
	...delegated
}: {
	className?: string
} & DetailedHTMLProps<
	InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
>) => {
	return (
		<input
			className={classesToClass(styles.input, className || "")}
			{...delegated}
		/>
	)
}

const File = ({
	className,
	containerClass,
	...delegated
}: {
	className?: string
	containerClass?: string
} & DetailedHTMLProps<
	InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
>) => {
	return (
		<section
			className={classesToClass(
				styles.fileContainer,
				containerClass || ""
			)}
		>
			<input
				type="file"
				className={classesToClass(styles.file, className || "")}
				{...delegated}
			/>
		</section>
	)
}

const Textarea = ({
	className,
	...delegated
}: {className?: string} & DetailedHTMLProps<
	TextareaHTMLAttributes<HTMLTextAreaElement>,
	HTMLTextAreaElement
>) => {
	return (
		<textarea
			className={classesToClass(styles.input, className || "")}
			{...delegated}
		/>
	)
}

Input.Area = Textarea
Input.File = File
export default Input
