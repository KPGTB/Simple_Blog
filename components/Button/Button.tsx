"use client"

import Link from "next/link"
import styles from "./Button.module.scss"
import {signIn, signOut} from "next-auth/react"
import {MouseEventHandler} from "react"
import {classesToClass} from "@/libs/convert"

const Button = ({
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
			className={classesToClass(styles.button, className || "")}
			onClick={onClick}
			{...delegated}
		>
			{children}
		</button>
	)
}

const LoginButton = ({
	children,
	className,
	...delegated
}: {
	children: React.ReactNode
	className?: string
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
	...delegated
}: {
	children: React.ReactNode
	className?: string
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
	...delegated
}: {
	children: React.ReactNode
	href: string
	className?: string
}) => {
	return (
		<Link
			href={href}
			className={classesToClass(styles.button, className || "")}
			{...delegated}
		>
			{children}
		</Link>
	)
}

export {Button, LinkButton, LoginButton, LogoutButton}
