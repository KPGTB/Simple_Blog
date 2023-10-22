import {UserDataType} from "@/models/User"
import NextAuth from "next-auth"
import {JWT} from "next-auth/jwt"

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
