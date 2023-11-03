import {redirect} from "next/navigation"

import {useAuth} from "@/hooks/useAuth"
import connect from "@/libs/mongodb"
import {User, UserRole} from "@/models/User"

import {Button} from "../Button/Button"
import ButtonAccent from "../Button/ButtonAccent"
import Input from "../Input/Input"
import SettingsOptionContainer from "../SettingsOptionContainer/SettingsOptionContainer"
import styles from "./DeleteAccount.module.scss"

const deleteAcc = async () => {
	"use server"
	const {role, data} = await useAuth()
	if (role === UserRole.ADMIN) {
		redirect("/user?error2=You can't delete admin account")
		return
	}

	await connect()
	await User.deleteOne({_id: data!._id})

	redirect("/user/signout")
}

const DeleteAccount = ({error}: {error?: string}) => {
	const hasError: boolean = error !== undefined
	return (
		<SettingsOptionContainer>
			<h3>Delete account</h3>

			<form
				className={styles.form}
				action={deleteAcc}
			>
				<Input
					className={styles.input}
					placeholder="Type: delete"
					pattern="delete"
					required
				/>

				{hasError && (
					<section className={styles.error}>{error}</section>
				)}

				<Button
					hover={ButtonAccent.YELLOW}
					style={{color: "red"}}
					aria-label="Delete Account"
				>
					Delete Account
				</Button>
			</form>
		</SettingsOptionContainer>
	)
}

export default DeleteAccount
