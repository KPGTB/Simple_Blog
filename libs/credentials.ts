import {useAuth} from "@/hooks/Auth"
import {UserRole} from "@/models/User"

export const hasAccess = async (...requiredRole: UserRole[]) => {
	const {logged, role} = await useAuth()

	if (!logged) {
		return false
	}

	if (requiredRole.length > 0) {
		return requiredRole.includes(role!)
	}

	return true
}
