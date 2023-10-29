import {authOptions} from "@/app/api/auth/[...nextauth]/route"
import UserRole from "@/types/UserRole"
import {getServerSession} from "next-auth/next"
import {sendActivationEmail} from "./mails"

export const hasAccess = async (...requiredRole: UserRole[]) => {
	const session = await getServerSession(authOptions)
	if (!session?.user) {
		return false
	}

	if (requiredRole.length > 0) {
		return requiredRole.includes(session.user.role)
	}

	return true
}
