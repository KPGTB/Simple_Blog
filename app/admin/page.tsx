import styles from "./page.module.scss"
import UserEditor from "@/components/UsersEditor/UsersEditor"
import EmailEditor from "@/components/EmailEditor/EmailEditor"

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
