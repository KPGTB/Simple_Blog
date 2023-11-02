import Link from "next/link"
import {FaGear} from "react-icons/fa6"

import styles from "./Header.module.scss"
import {LinkButton, LoginButton, LogoutButton} from "../Button/Button"

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
				>
					<h1>Simple Blog</h1>
				</Link>
				<p>
					Simple Blog App created by KPG-TB using NextJS, TypeScript,
					SASS and MongoDB
				</p>
			</section>

			<section className={styles.buttons}>
				{admin && (
					<LinkButton href="/admin">
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
