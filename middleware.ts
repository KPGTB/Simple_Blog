import {withAuth} from "next-auth/middleware"
import {NextResponse} from "next/server"
import UserRole from "./types/UserRole"

export default withAuth(
	function middleware(req) {
		const path = req.nextUrl.pathname
		const token = req.nextauth.token

		if (isOnlyForUnauthorized(path) && token !== null) {
			return NextResponse.redirect(new URL("/", req.url))
		}
	},
	{
		callbacks: {
			authorized: ({token, req}) => {
				const path = req.nextUrl.pathname
				if (isOnlyForUnauthorized(path)) {
					return true
				}

				return token !== null && token.userData.role !== UserRole.USER
			},
		},
	}
)

const isOnlyForUnauthorized = (path: string) => {
	return path.startsWith("/auth")
}

export const config = {
	matcher: [
		"/add",
		"/edit/:id*",
		"/auth/signIn",
		"/auth/signUp",
		"/auth/signUp/activate",
		"/auth/signUp/activate/:hash*",
	],
}
