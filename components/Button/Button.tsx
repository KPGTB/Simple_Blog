"use client"

import Link from "next/link"
import styles from "./Button.module.scss"
import {signIn, signOut} from "next-auth/react"
import {ButtonHTMLAttributes, DetailedHTMLProps} from "react"
import {classesToClass} from "@/utils/convert"
import ButtonAccent from "./ButtonAccent"

const Button = ({
	children,
	className,
	color = ButtonAccent.BLACK,
	hover = ButtonAccent.WHITE,
	...delegated
}: {
	children: React.ReactNode
	className?: string
	color?: ButtonAccent
	hover?: ButtonAccent
} & DetailedHTMLProps<
	ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
>) => {
	return (
		<button
			className={classesToClass(
				styles.button,
				styles[color],
				styles[`hover_${hover}`],
				className || ""
			)}
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
	...delegated
}: {
	children: React.ReactNode
	className?: string
	color?: ButtonAccent
	hover?: ButtonAccent
}) => {
	return (
		<Button
			className={className}
			onClick={() => signIn()}
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
	...delegated
}: {
	children: React.ReactNode
	className?: string
	color?: ButtonAccent
	hover?: ButtonAccent
}) => {
	return (
		<Button
			className={className}
			onClick={() => signOut()}
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
