import Link from "next/link"
import {FaUser} from "react-icons/fa"
import {FaGear} from "react-icons/fa6"

import {LinkButton, LoginButton, LogoutButton} from "../Button/Button"
import styles from "./Header.module.scss"

const Header = ({
	font,
	logged,
	admin,
}: {
	font: string
	logged: boolean
	admin: boolean
}) => {
	return (
		<header className={`${font} ${styles.header}`}>
			<section className={styles.main}>
				<Link
					href={"/"}
					className={styles.title}
					aria-label="Home Page"
				>
					<h1>Simple Blog</h1>
				</Link>
				<p>
					Simple Blog App created by KPG-TB using NextJS, TypeScript,
					SASS and MongoDB
				</p>
			</section>

			<section className={styles.buttons}>
				{logged && (
					<LinkButton
						href="/user"
						aria-label="User Settings"
					>
						<FaUser />
					</LinkButton>
				)}
				{admin && (
					<LinkButton
						href="/admin"
						aria-label="Admin Settings"
					>
						<FaGear />
					</LinkButton>
				)}

				{logged ? (
					<LogoutButton aria-label="Sign Out">Sign Out</LogoutButton>
				) : (
					<LoginButton aria-label="Sign In">Sign In</LoginButton>
				)}
			</section>
		</header>
	)
}

export default Header
