import {getServerSession} from "next-auth"

import {authOptions} from "@/app/api/auth/[...nextauth]/route"

const useAuth = async () => {
	const session = await getServerSession(authOptions)

	if (session === null || session.user === undefined) {
		return {
			logged: false,
		}
	}

	const user = session.user
	return {
		logged: true,
		role: user.role,
		data: user,
	}
}

export {useAuth}
