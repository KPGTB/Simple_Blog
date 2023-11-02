"use client"

export default function Error({error}: {error: Error & {digest?: string}}) {
	return <h2>Error - {error.message}</h2>
}
