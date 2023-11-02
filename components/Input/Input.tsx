import {classesToClass} from "@/utils/convert"
import styles from "./Input.module.scss"
import {DetailedHTMLProps, InputHTMLAttributes} from "react"

const Input = ({
	className,
	...delegated
}: {
	className?: string
	title?: string
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

export default Input
