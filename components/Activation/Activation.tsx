"use client"

import ReCAPTCHA from "react-google-recaptcha"
import {activateAccount} from "@/libs/captcha"
import {useState} from "react"
import CaptchaResponse from "@/libs/enum/CaptchaResponse"

const Activation = ({hash, publicKey}: {hash: string; publicKey: string}) => {
	const [response, setResponse] = useState<CaptchaResponse | null>(null)

	const handleChange = async (token: string | null) => {
		if (token !== null) {
			activateAccount(token, hash).then((resp) => {
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
					sitekey={publicKey}
					onChange={handleChange}
				/>
			)}
		</>
	)
}

export default Activation
