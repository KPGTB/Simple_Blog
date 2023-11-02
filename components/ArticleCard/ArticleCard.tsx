import {ArticleType} from "@/models/Article"
import {FaCalendar, FaPlus, FaUser} from "react-icons/fa6"
import {LinkButton} from "../Button/Button"
import Link from "next/link"
import ArticleImage from "../ArticleImage/ArticleImage"

import styles from "./ArticleCard.module.scss"
import {convertDate} from "@/utils/convert"
import ButtonAccent from "../Button/ButtonAccent"

const ArticleCard = ({article}: {article: ArticleType}) => {
	return (
		<section className={styles.article}>
			<ArticleImage
				src={article.image}
				className={styles.image}
				alt={article.title}
			/>

			<section className={styles.info}>
				<section>
					<FaUser />
					{article.author}
				</section>
				<section>
					<FaCalendar /> {convertDate(article.createdAt)}
				</section>
			</section>

			<section className={styles.title}>{article.title}</section>

			<LinkButton
				href={`/article/${article._id}`}
				className={styles.read}
				color={ButtonAccent.GOLD}
				hover={ButtonAccent.YELLOW}
			>
				Read
			</LinkButton>
		</section>
	)
}

const Add = () => {
	return (
		<Link
			href={"/add"}
			className={styles.add}
		>
			<FaPlus />
		</Link>
	)
}

ArticleCard.Add = Add

export default ArticleCard
