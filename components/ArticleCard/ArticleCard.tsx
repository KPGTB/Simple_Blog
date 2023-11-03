import "react-loading-skeleton/dist/skeleton.css"

import Link from "next/link"
import {FaCalendar, FaPlus, FaUser} from "react-icons/fa6"
import Skeleton from "react-loading-skeleton"

import {ArticleType} from "@/models/Article"
import {convertDate} from "@/utils/convert"

import ArticleImage from "../ArticleImage/ArticleImage"
import {LinkButton} from "../Button/Button"
import ButtonAccent from "../Button/ButtonAccent"
import styles from "./ArticleCard.module.scss"

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
				aria-label="Read article"
			>
				Read Article
			</LinkButton>
		</section>
	)
}

const SkeletonArticle = () => {
	return (
		<section className={styles.articleLoading}>
			<section className={styles.imageLoading}>
				<Skeleton className={styles.imageSkeleton} />
			</section>

			<section className={styles.infoLoading}>
				<section>
					<Skeleton />
				</section>
				<section>
					<Skeleton count={2} />
				</section>
			</section>
			<Skeleton
				count={2}
				className={styles.titleLoading}
			/>
		</section>
	)
}

const Add = () => {
	return (
		<Link
			href={"/add"}
			className={styles.add}
			aria-label="Add Article"
		>
			<FaPlus />
		</Link>
	)
}

ArticleCard.Add = Add
ArticleCard.Skeleton = SkeletonArticle

export default ArticleCard
