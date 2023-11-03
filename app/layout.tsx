import type {Metadata} from "next"
import "@/assets/editor_style.scss"
import "./globals.scss"

import {Barlow_Condensed, Lato} from "next/font/google"

import Cookies from "@/components/Cookies/Cookies"
import Footer from "@/components/Footer/Footer"
import Header from "@/components/Header/Header"
import {useAuth} from "@/hooks/useAuth"
import {UserRole} from "@/models/User"

const barlow = Barlow_Condensed({weight: "400", subsets: ["latin"]})
const lato = Lato({weight: "400", subsets: ["latin"]})

export const metadata: Metadata = {
	title: "Simple Blog | Preview Version",
	description: "Simple Blog App created by KPG-TB. Preview Version",
}

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const {logged, role} = await useAuth()

	return (
		<html lang="en">
			<body>
				<Cookies font={barlow.className} />

				<Header
					font={barlow.className}
					logged={logged}
					admin={logged && role === UserRole.ADMIN}
				/>
				<main className={lato.className}>{children}</main>
				<Footer font={barlow.className} />
			</body>
		</html>
	)
}
