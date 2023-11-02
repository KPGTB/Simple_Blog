import styles from "./AdminOptionContainer.module.scss"

const AdminOptionContainer = ({children}: {children: React.ReactNode}) => {
	return <section className={styles.container}>{children}</section>
}

export default AdminOptionContainer
