"use client"

import {signIn} from "next-auth/react"

const Login = (props: {className: string; label: string}) => {
	return (
		<button
			className={props.className}
			aria-label={props.label}
			onClick={() => signIn()}
		>
			{props.label}
		</button>
	)
}

export default Login
