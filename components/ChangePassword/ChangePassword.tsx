import {Button} from "../Button/Button"
import ButtonAccent from "../Button/ButtonAccent"
import Input from "../Input/Input"
import PasswordValidator from "../PasswordValidator/PasswordValidator"
import SettingsOptionContainer from "../SettingsOptionContainer/SettingsOptionContainer"
import {change} from "./ChangeActions"
import styles from "./ChangePassword.module.scss"

const ChangePassword = ({
	error,
	success,
}: {
	error?: string
	success?: string
}) => {
	const hasError: boolean = error !== undefined
	const hasSuccess: boolean = success !== undefined

	return (
		<SettingsOptionContainer>
			<h3>Change Password</h3>

			<form
				className={styles.form}
				action={change}
			>
				<Input
					type="password"
					name="old"
					placeholder="Old Password"
					className={styles.input}
				/>

				<PasswordValidator
					inputName="new"
					inputPlaceholder="New Password"
					inputClass={styles.input}
				/>

				<Input
					type="password"
					name="new2"
					placeholder="Repeat New Password"
					className={styles.input}
				/>

				{hasError && (
					<section className={styles.error}>{error}</section>
				)}
				{hasSuccess && (
					<section className={styles.success}>
						Password has been changed
					</section>
				)}

				<Button
					hover={ButtonAccent.YELLOW}
					aria-label="Change Password"
				>
					Change
				</Button>
			</form>
		</SettingsOptionContainer>
	)
}

export default ChangePassword
