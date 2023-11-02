import {classesToClass} from "@/libs/convert"

import styles from "./Line.module.scss"

const Line = ({
	children,
	className,
	...delegated
}: {
	children: React.ReactNode
	className?: string
}) => {
	return (
		<section
			className={classesToClass(styles.line, className || "")}
			{...delegated}
		>
			{children}
		</section>
	)
}

export default Line
