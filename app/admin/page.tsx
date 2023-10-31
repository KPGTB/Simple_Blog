import connect from "@/libs/mongodb"
import User, {UserDataType} from "@/models/User"
import UserRole from "@/types/UserRole"
import {FaTrash} from "react-icons/fa"
import {FaDownLong, FaUpLong} from "react-icons/fa6"
import styles from "./page.module.scss"
import {redirect} from "next/navigation"
import {promises as fs} from "fs"
import Editor from "@/components/ArticleContentEditor"

const getUsers = async () => {
	await connect()
	const data: UserDataType[] = await User.find(
		{role: {$ne: UserRole.ADMIN}},
		{_id: 1, email: 1, fullName: 1, role: 1}
	).sort({role: 1, fullName: 1})
	return data
}

const promote = async (data: FormData) => {
	"use server"
	const id = data.get("id")
	await User.findOneAndUpdate(
		{
			_id: id,
			role: {$ne: UserRole.ADMIN},
		},
		{role: UserRole.EDITOR}
	)
	redirect("/admin")
}

const demote = async (data: FormData) => {
	"use server"
	const id = data.get("id")
	await User.findOneAndUpdate(
		{
			_id: id,
			role: {$ne: UserRole.ADMIN},
		},
		{role: UserRole.USER}
	)
	redirect("/admin")
}

const remove = async (data: FormData) => {
	"use server"
	const id = data.get("id")
	await User.deleteOne({_id: id, role: {$ne: UserRole.ADMIN}})
	redirect("/admin")
}

const editEmail = async (data: FormData) => {
	"use server"
	if (process.env.PREVIEW === "TRUE") {
		return
	}
	const title = data.get("title")
	const content = data.get("editor")
	const json = {
		title: title,
		content: content,
	}

	await fs.writeFile(
		process.cwd() + "/assets/email.json",
		JSON.stringify(json),
		"utf-8"
	)

	redirect("/admin")
}

const Page = async () => {
	const accounts = await getUsers()
	const file = await fs.readFile(
		process.cwd() + "/assets/email.json",
		"utf-8"
	)
	const emailJson: {title: string; content: string} = await JSON.parse(file)

	return (
		<article className={styles.container}>
			<h2>Admin Settings</h2>

			<section className={styles.optionContainer}>
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
										{process.env.PREVIEW === "TRUE"
											? "Email Hidden (Preview)"
											: user.email}
									</span>
								</section>

								<section className={styles.buttons}>
									{user.role === UserRole.USER ? (
										<form action={promote}>
											<input
												type="hidden"
												name="id"
												value={user._id.toString()}
											/>
											<button className={styles.button}>
												<FaUpLong />
											</button>
										</form>
									) : (
										<form action={demote}>
											<input
												type="hidden"
												name="id"
												value={user._id.toString()}
											/>
											<button className={styles.button}>
												<FaDownLong />
											</button>
										</form>
									)}
									<form action={remove}>
										<input
											type="hidden"
											name="id"
											value={user._id.toString()}
										/>
										<button className={styles.button}>
											<FaTrash />
										</button>
									</form>
								</section>
							</section>
						)
					})}
				</section>
			</section>

			<section className={styles.optionContainer}>
				<h3>Activation Email</h3>

				<form
					className={styles.emailForm}
					action={editEmail}
				>
					<input
						name="title"
						className={styles.titleInput}
						defaultValue={emailJson.title}
					/>
					<Editor
						placeholder={emailJson.content}
						name="editor"
					/>
					{process.env.PREVIEW === "TRUE" && (
						<span style={{fontSize: ".8rem"}}>
							This option is disabled in preview mode
						</span>
					)}
					<button
						className={styles.button}
						title={
							process.env.PREVIEW === "TRUE"
								? "This option is disabled in Preview Mode"
								: ""
						}
					>
						Save
					</button>
				</form>
			</section>
		</article>
	)
}

export default Page
