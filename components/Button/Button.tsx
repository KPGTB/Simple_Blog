"use client"

import Link from "next/link"
import styles from "./Button.module.scss"
import {signIn, signOut} from "next-auth/react"
import {MouseEventHandler} from "react"
import {classesToClass} from "@/utils/convert"
import ButtonAccent from "./ButtonAccent"

const Button = ({
	children,
	className,
	onClick,
	color = ButtonAccent.BLACK,
	hover = ButtonAccent.WHITE,
	title = "",
	...delegated
}: {
	children: React.ReactNode
	className?: string
	onClick?: MouseEventHandler<HTMLButtonElement>
	color?: ButtonAccent
	hover?: ButtonAccent
	title?: string
}) => {
	return (
		<button
			className={classesToClass(
				styles.button,
				styles[color],
				styles[`hover_${hover}`],
				className || ""
			)}
			onClick={onClick}
			title={title}
			{...delegated}
		>
			{children}
		</button>
	)
}

const LoginButton = ({
	children,
	className,
	color = ButtonAccent.BLACK,
	hover = ButtonAccent.WHITE,
	title = "",
	...delegated
}: {
	children: React.ReactNode
	className?: string
	color?: ButtonAccent
	hover?: ButtonAccent
	title?: string
}) => {
	return (
		<Button
			className={className}
			onClick={() => signIn()}
			title={title}
			{...delegated}
		>
			{children}
		</Button>
	)
}

const LogoutButton = ({
	children,
	className,
	color = ButtonAccent.BLACK,
	hover = ButtonAccent.WHITE,
	title = "",
	...delegated
}: {
	children: React.ReactNode
	className?: string
	color?: ButtonAccent
	hover?: ButtonAccent
	title?: string
}) => {
	return (
		<Button
			className={className}
			onClick={() => signOut()}
			title={title}
			{...delegated}
		>
			{children}
		</Button>
	)
}

const LinkButton = ({
	children,
	href,
	className,
	color = ButtonAccent.BLACK,
	hover = ButtonAccent.WHITE,
	...delegated
}: {
	children: React.ReactNode
	href: string
	className?: string
	color?: ButtonAccent
	hover?: ButtonAccent
}) => {
	return (
		<Link
			href={href}
			className={classesToClass(
				styles.button,
				styles[color],
				styles[`hover_${hover}`],
				className || ""
			)}
			{...delegated}
		>
			{children}
		</Link>
	)
}

export {Button, LinkButton, LoginButton, LogoutButton}
