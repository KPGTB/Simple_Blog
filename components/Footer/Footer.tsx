import Link from "next/link"

import {stringToBool} from "@/utils/convert"

import styles from "./Footer.module.scss"

const Footer = ({font}: {font: string}) => {
	return (
		<footer className={`${font} ${styles.footer}`}>
			<section className={styles.info}>
				<Link
					href={"/tos"}
					aria-label="Read Terms of Service"
				>
					Terms of Service
				</Link>
				<br />
				{stringToBool(process.env.PREVIEW) && (
					<>
						Preview Mode Enabled. Admin credentials:{" "}
						{process.env.ADMIN_EMAIL} {process.env.ADMIN_PASSWORD}
						<br />
					</>
				)}
				Simple Blog App |{" "}
				<a
					href="https://kpgtb.pl/"
					target="blank"
					aria-label="KPG-TB Portfolio"
				>
					KPG-TB
				</a>{" "}
				2023 - {new Date().getFullYear()} &copy; Licensed under{" "}
				<a
					target="blank"
					href="https://github.com/KPGTB/Simple_Blog/blob/main/LICENSE"
					aria-label="Apache 2.0 License"
				>
					Apache 2.0
				</a>
			</section>
		</footer>
	)
}

export default Footer
