import Link from "next/link.js"
import styles from "./page.module.scss"
import {FaUser, FaCalendar, FaPlus} from "react-icons/fa"

const getPosts = async () => {
	return [
		{
			_id: "a341acv",
			title: "Example Title",
			image: "https://i.imgur.com/WD7zFrL.png",
			author: "KPG-TB",
			createdAt: "2023-07-18 17:00",
		},
		{
			_id: "a341acv",
			title: "Example Title",
			image: "https://i.imgur.com/WD7zFrL.png",
			author: "KPG-TB",
			createdAt: "2023-07-18 17:00",
		},
		{
			_id: "a341acv",
			title: "Example Title",
			image: "https://i.imgur.com/WD7zFrL.png",
			author: "KPG-TB",
			createdAt: "2023-07-18 17:00",
		},
		{
			_id: "a341acv",
			title: "Example Title",
			image: "https://i.imgur.com/WD7zFrL.png",
			author: "KPG-TB",
			createdAt: "2023-07-18 17:00",
		},
		{
			_id: "a341acv",
			title: "Example Title",
			image: "https://i.imgur.com/WD7zFrL.png",
			author: "KPG-TB",
			createdAt: "2023-07-18 17:00",
		},
		{
			_id: "a341acv",
			title: "Example Title",
			image: "https://i.imgur.com/WD7zFrL.png",
			author: "KPG-TB",
			createdAt: "2023-07-18 17:00",
		},
		{
			_id: "a341acv",
			title: "Example Title",
			image: "https://i.imgur.com/WD7zFrL.png",
			author: "KPG-TB",
			createdAt: "2023-07-18 17:00",
		},
		{
			_id: "a341acv",
			title: "Example Title v2 XD Ele This is the example bery big title",
			image: "https://i.imgur.com/WD7zFrL.png",
			author: "KPG-TB",
			createdAt: "2023-07-18 17:00",
		},
		{
			_id: "a341acv",
			title: "Example Title",
			image: "https://i.imgur.com/WD7zFrL.png",
			author: "KPG-TB",
			createdAt: "2023-07-18 17:00",
		},
	]
}

export default async function Home() {
	const posts = await getPosts()

	return (
		<article className={styles.container}>
			{posts.map((post) => {
				return (
					<section
						key={post._id}
						className={styles.post}
					>
						<img
							src={post.image}
							alt={post.title}
						/>
						<section className={styles.postInfo}>
							<section>
								<FaUser /> {post.author}
							</section>
							<section>
								<FaCalendar /> {post.createdAt}
							</section>
						</section>
						<section className={styles.postTitle}>
							{post.title}
						</section>
						<Link href={`/${post._id}`}>Read</Link>
					</section>
				)
			})}

			<Link
				href={"/add"}
				className={styles.addPost}
			>
				<FaPlus />
			</Link>
		</article>
	)
}
