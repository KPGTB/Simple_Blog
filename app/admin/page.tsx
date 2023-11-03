import EmailEditor from "@/components/EmailEditor/EmailEditor"
import UserEditor from "@/components/UsersEditor/UsersEditor"

import styles from "./page.module.scss"

export const dynamic = "force-dynamic"

const Page = async () => {
	return (
		<article className={styles.container}>
			<h2>Admin Settings</h2>

			<UserEditor />
			<EmailEditor />
		</article>
	)
}

export default Page
