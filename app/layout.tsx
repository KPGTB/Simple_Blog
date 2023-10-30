import "./globals.scss"
import "./editor_style.css"
import type {Metadata} from "next"
import {Barlow_Condensed, Lato} from "next/font/google"
import Link from "next/link"
import Login from "@/components/LoginComponent"
import Logout from "@/components/LogoutComponent"
import {authOptions} from "./api/auth/[...nextauth]/route"
import {getServerSession} from "next-auth/next"

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
	const session = await getServerSession(authOptions)
	return (
		<html lang="en">
			<body>
				<header className={barlow.className}>
					<section>
						<Link href={"/"}>
							<h1>Simple Blog</h1>
						</Link>
						<p>
							Simple Blog App created by KPG-TB using NextJS,
							TypeScript, SASS and MongoDB
						</p>
					</section>

					{session?.user ? (
						<Logout
							className="login"
							label="Sign Out"
						/>
					) : (
						<Login
							className="login"
							label="Sign In"
						/>
					)}
				</header>
				<main className={lato.className}>{children}</main>
				<footer className={barlow.className}>
					<section>
						<Link href={"/tos"}>Terms of Service</Link>
						<br />
						Simple Blog App |{" "}
						<a
							href="https://kpgtb.pl/"
							target="blank"
						>
							KPG-TB
						</a>{" "}
						2023 &copy; Licensed under{" "}
						<a
							target="blank"
							href="https://github.com/KPGTB/Simple_Blog/blob/main/LICENSE"
						>
							Apache 2.0
						</a>
					</section>
				</footer>
			</body>
		</html>
	)
}
