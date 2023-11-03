import {stringToBool} from "@/utils/convert"
import SettingsOptionContainer from "../SettingsOptionContainer/SettingsOptionContainer"
import {demote, getUsers, promote, remove} from "./UserActions"
import styles from "./UsersEditor.module.scss"
import {UserRole} from "@/models/User"
import HiddenId from "../HiddenId/HiddenId"
import {Button} from "../Button/Button"
import {FaDownLong, FaTrash, FaUpLong} from "react-icons/fa6"
import ButtonAccent from "../Button/ButtonAccent"

const UserEditor = async () => {
	const accounts = await getUsers()

	return (
		<SettingsOptionContainer>
			<h3>Users</h3>

			<section className={styles.users}>
				{Array.from(accounts).map((user) => {
					return (
						<section
							key={user._id!.toString()}
							className={styles.user}
						>
							<section className={styles.userData}>
								<b>{user.fullName}</b>{" "}
								<span className={styles.extra}>
									({user.role})
								</span>
								<br />
								<span className={styles.extra}>
									{stringToBool(process.env.PREVIEW)
										? "Email Hidden (Preview)"
										: user.email}
								</span>
							</section>

							<section className={styles.buttons}>
								{user.role === UserRole.USER ? (
									<form action={promote}>
										<HiddenId id={user._id.toString()} />

										<Button hover={ButtonAccent.YELLOW}>
											<FaUpLong />
										</Button>
									</form>
								) : (
									<form action={demote}>
										<HiddenId id={user._id.toString()} />

										<Button hover={ButtonAccent.YELLOW}>
											<FaDownLong />
										</Button>
									</form>
								)}
								<form action={remove}>
									<HiddenId id={user._id.toString()} />

									<Button hover={ButtonAccent.YELLOW}>
										<FaTrash />
									</Button>
								</form>
							</section>
						</section>
					)
				})}
			</section>
		</SettingsOptionContainer>
	)
}

export default UserEditor
