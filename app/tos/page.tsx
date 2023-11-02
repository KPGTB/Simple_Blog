import styles from "./page.module.scss"
import {FaCalendar, FaPen} from "react-icons/fa"
import {hasAccess} from "@/libs/credentials"
import Link from "next/link"
import {UserRole} from "@/models/User"
import {convertDate} from "@/utils/convert"
import {useTos} from "@/hooks/useJsonData"
import {ActionLink} from "@/components/Action/Action"

export const dynamic = "force-dynamic"

const Page = async () => {
	const {tos} = await useTos()
	const canEdit = await hasAccess(UserRole.ADMIN)

	return (
		<article className={styles.container}>
			<h2 className={styles.title}>Terms of Service</h2>
			<section className={styles.data}>
				{canEdit && (
					<ActionLink href="/tos/edit">
						<FaPen />
					</ActionLink>
				)}{" "}
				<FaCalendar /> {convertDate(tos.lastUpdate)}
			</section>
			<hr className={styles.line} />
			<section
				dangerouslySetInnerHTML={{__html: tos.content}}
				className={`${styles.content} ck-content`}
			/>
		</article>
	)
}

export default Page
