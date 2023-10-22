import {authOptions} from "@/app/api/auth/[...nextauth]/route"
import {getServerSession} from "next-auth/next"

export const hasAccess = async (requiredRole?: string) => {
	const session = await getServerSession(authOptions)
	if (!session?.user) {
		return false
	}

	if (requiredRole && session.user.role !== requiredRole) {
		return false
	}

	return true
}
