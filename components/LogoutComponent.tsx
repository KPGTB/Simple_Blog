"use client"

import {signOut} from "next-auth/react"

const Logout = (props: {className: string; label: string}) => {
	return (
		<button
			className={props.className}
			aria-label={props.label}
			onClick={() => signOut()}
		>
			{props.label}
		</button>
	)
}

export default Logout
