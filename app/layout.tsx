import "./globals.scss"
import "./editor_style.css"
import type {Metadata} from "next"
import {Barlow_Condensed, Lato} from "next/font/google"
import Link from "next/link"

const barlow = Barlow_Condensed({weight: "400", subsets: ["latin"]})
const lato = Lato({weight: "400", subsets: ["latin"]})

export const metadata: Metadata = {
	title: "Simple Blog | Preview Version",
	description: "Simple Blog App created by KPG-TB. Preview Version",
}

export default function RootLayout({children}: {children: React.ReactNode}) {
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

					<Link href={"/login"}>Login</Link>
				</header>
				<main className={lato.className}>{children}</main>
				<footer className={barlow.className}>
					<section>
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
