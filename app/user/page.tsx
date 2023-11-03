import ChangePassword from "@/components/ChangePassword/ChangePassword"
import DeleteAccount from "@/components/DeleteAccount/DeleteAccount"

import styles from "./page.module.scss"

export const dynamic = "force-dynamic"

const Page = async ({
	searchParams,
}: {
	searchParams: {error?: string; success?: string; error2?: string}
}) => {
	return (
		<article className={styles.container}>
			<h2>User Settings</h2>
			<ChangePassword
				error={searchParams.error}
				success={searchParams.success}
			/>

			<DeleteAccount error={searchParams.error2} />
		</article>
	)
}

export default Page
