"use client"

import Link from "next/link"
import {ButtonHTMLAttributes, DetailedHTMLProps} from "react"

import {classesToClass} from "@/utils/convert"

import styles from "./Action.module.scss"

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
	...delegated
}: {
	children: React.ReactNode
	className?: string
} & DetailedHTMLProps<
	ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
>) => {
	return (
		<button
			className={classesToClass(styles.action, className || "")}
			{...delegated}
		>
			{children}
		</button>
	)
}

export {ActionLink, ActionButton}
