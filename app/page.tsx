import {Suspense} from "react"

import ArticlesFeed from "@/components/ArticlesFeed/ArticlesFeed"
import ArticlesLoading from "@/components/ArticlesFeed/ArticlesLoading"

export const dynamic = "force-dynamic"

export default async function Home() {
	return (
		<Suspense fallback={<ArticlesLoading />}>
			<ArticlesFeed />
		</Suspense>
	)
}
