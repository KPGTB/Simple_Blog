import {ObjectId} from "mongoose"
import {NextAuthOptions} from "next-auth"
import NextAuth from "next-auth/next"
import Credentials from "next-auth/providers/credentials"

import {comparePasswords} from "@/libs/bcrypt"
import connect from "@/libs/mongodb"
import {User} from "@/models/User"

const authOptions = {
	secret: process.env.NEXTAUTH_SECRET,
	providers: [
		Credentials({
			name: "E-Mail",
			credentials: {
				email: {
					label: "E-Mail",
					type: "text",
					placeholder: "user@example.com",
				},
				password: {label: "Password", type: "password"},
			},
			async authorize(credentials, req) {
				if (credentials == null) {
					return null
				}

				const {email, password} = credentials

				if (email == null || password == null) {
					return null
				}

				await connect()
				const user: {_id: ObjectId; password: string} | null =
					await User.findOne(
						{
							email: email,
							activated: true,
						},
						{password: 1}
					)

				if (user === null) {
					return null
				}

				const correctPassword = await comparePasswords(
					password,
					user.password
				)
				if (!correctPassword) {
					return null
				}

				const result = await User.findById(user._id, {
					password: 0,
				})
				return result
			},
		}),
	],
	pages: {
		signIn: "/auth/signIn",
	},
	callbacks: {
		async session({token, session}) {
			if (token && token.userData && session.user) {
				session.user = token.userData
			}
			return session
		},
		async jwt({token, user}) {
			if (user) {
				token.userData = user
			}

			return token
		},
	},
} satisfies NextAuthOptions

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST, authOptions}
