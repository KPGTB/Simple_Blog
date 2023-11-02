import Link from "next/link"
import styles from "./Footer.module.scss"
import {stringToBool} from "@/utils/convert"

const Footer = ({font}: {font: string}) => {
	return (
		<footer className={`${font} ${styles.footer}`}>
			<section className={styles.info}>
				<Link href={"/tos"}>Terms of Service</Link>
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
	)
}

export default Footer
