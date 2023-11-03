import {JWT} from "next-auth/jwt"

import {UserDataType} from "@/models/User"

declare module "next-auth" {
	interface Session extends DefaultSession {
		user: UserDataType
	}
	interface User extends UserDataType {}
}

declare module "next-auth/jwt" {
	interface JWT {
		userData: UserDataType
	}
}
