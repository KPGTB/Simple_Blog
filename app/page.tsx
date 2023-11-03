import ArticlesFeed from "@/components/ArticlesFeed/ArticlesFeed"
import ArticlesLoading from "@/components/ArticlesFeed/ArticlesLoading"
import {Suspense} from "react"

export const dynamic = "force-dynamic"

export default async function Home() {
	return (
		<Suspense fallback={<ArticlesLoading />}>
			<ArticlesFeed />
		</Suspense>
	)
}
