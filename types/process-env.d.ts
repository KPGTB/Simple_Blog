declare global {
	namespace NodeJS {
		interface ProcessEnv {
			MONGODB_URI: string
			NEXTAUTH_SECRET: string
			NEXTAUTH_URL: string
			CREATE_ADMIN: string
			ADMIN_FULL: string
			ADMIN_EMAIL: string
			ADMIN_PASSWORD: string
			SMTP_URL: string
			SMTP_SENDER: string
			RECAPTCHA_SECRET: string
			RECAPTCHA_PUBLIC: string
			PREVIEW: string
		}
	}
}
export {}
