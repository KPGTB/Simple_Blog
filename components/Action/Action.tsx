"use client"

import {classesToClass} from "@/utils/convert"
import Link from "next/link"

import styles from "./Action.module.scss"
import {MouseEventHandler} from "react"

const ActionLink = ({
	children,
	href,
	className,
	...delegated
}: {
	children: React.ReactNode
	href: string
	className?: string
}) => {
	return (
		<Link
			href={href}
			className={classesToClass(styles.action, className || "")}
			{...delegated}
		>
			{children}
		</Link>
	)
}

const ActionButton = ({
	children,
	className,
	onClick,
	...delegated
}: {
	children: React.ReactNode
	className?: string
	onClick?: MouseEventHandler<HTMLButtonElement>
}) => {
	return (
		<button
			className={classesToClass(styles.action, className || "")}
			onClick={onClick}
			{...delegated}
		>
			{children}
		</button>
	)
}

export {ActionLink, ActionButton}
