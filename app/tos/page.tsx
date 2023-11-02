import {promises as fs} from "fs"
import styles from "./page.module.scss"
import {FaCalendar, FaPen} from "react-icons/fa"
import {hasAccess} from "@/libs/credentials"
import Link from "next/link"
import {UserRole} from "@/models/User"

export const dynamic = "force-dynamic"

const convertDate = (milis: number) =>
	new Date(milis).toLocaleString().replace(",", "")

const Page = async () => {
	const file = await fs.readFile(process.cwd() + "/assets/tos.json", "utf-8")
	const json: {lastUpdate: number; content: string} = await JSON.parse(file)
	const canEdit = await hasAccess(UserRole.ADMIN)

	return (
		<article className={styles.container}>
			<h2 className={styles.title}>Terms of Service</h2>
			<section className={styles.data}>
				{canEdit && (
					<Link
						href={"/tos/edit"}
						className={styles.action}
					>
						<FaPen />
					</Link>
				)}{" "}
				<FaCalendar /> {convertDate(json.lastUpdate)}
			</section>
			<hr className={styles.line} />
			<section
				dangerouslySetInnerHTML={{__html: json.content}}
				className={styles.content + " ck-content"}
			/>
		</article>
	)
}

export default Page
