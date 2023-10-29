"use client"

import ReCAPTCHA from "react-google-recaptcha"
import {verifyCaptcha} from "@/libs/captcha"
import {useEffect, useState} from "react"
import {CaptchaResponse} from "@/types/CaptchaResponse"

const Page = ({params}: {params: {hash: string}}) => {
	const [response, setResponse] = useState<CaptchaResponse | null>(null)

	const handleChange = async (token: string | null) => {
		if (token !== null) {
			verifyCaptcha(token, params.hash).then((resp) => {
				setResponse(resp)
			})
		}
	}

	return (
		<>
			{response === CaptchaResponse.BOT ? (
				<p>ReCAPTCHA failed</p>
			) : response === CaptchaResponse.ACTIVATED ? (
				<p>Account has been activated</p>
			) : response === CaptchaResponse.WRONG_HASH ? (
				<p>Provided hash is wrong</p>
			) : (
				<ReCAPTCHA
					sitekey="6LeUhdwoAAAAAJI5nJ3fG7MOx_IYJblGTPXnVuUL"
					onChange={handleChange}
				/>
			)}
		</>
	)
}

export default Page
