import type {Metadata} from "next"
import {Barlow_Condensed, Lato} from "next/font/google"
import {UserRole} from "@/models/User"
import Header from "@/components/Header/Header"
import Footer from "@/components/Footer/Footer"
import {useAuth} from "@/hooks/Auth"

import "./globals.scss"
import "@/assets/editor_style.scss"

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
