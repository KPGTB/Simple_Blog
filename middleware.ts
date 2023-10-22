import {withAuth} from "next-auth/middleware"
import {NextResponse} from "next/server"

export default withAuth(
	function middleware(req) {
		const path = req.nextUrl.pathname
		const token = req.nextauth.token

		if (path === "/auth/signIn" && token !== null) {
			return NextResponse.redirect(new URL("/", req.url))
		}
	},
	{
		callbacks: {
			authorized: ({token, req}) => {
				const path = req.nextUrl.pathname
				if (path === "/auth/signIn") {
					return true
				}

				return token !== null
			},
		},
	}
)

export const config = {matcher: ["/add", "/edit/:id*", "/auth/signIn"]}
