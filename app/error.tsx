"use client" // Error components must be Client Components
import styles from "./page.module.scss"

export default function Error({error}: {error: Error & {digest?: string}}) {
	return <h2 className={styles.error}>Error - {error.message}</h2>
}
