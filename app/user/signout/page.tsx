"use client"

import {signOut} from "next-auth/react"
import {useEffect} from "react"

const Page = () => {
	useEffect(() => {
		signOut()
	}, [])
	return <>Plase wait...</>
}

export default Page
