import styles from "./SettingsOptionContainer.module.scss"

const SettingsOptionContainer = ({children}: {children: React.ReactNode}) => {
	return <section className={styles.container}>{children}</section>
}

export default SettingsOptionContainer
