import {compare, genSalt, hash} from "bcrypt"

export const hashPassword = (password: string) =>
	genSalt(10)
		.then((salt) => hash(password, salt))
		.then((hash) => hash)

export const comparePasswords = (password: string, hashPassword: string) =>
	compare(password, hashPassword).then((resp) => resp)
