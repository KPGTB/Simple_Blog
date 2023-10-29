"use client"

import {useEffect, useState} from "react"
import {FaCheck} from "react-icons/fa"
import {FaXmark} from "react-icons/fa6"

type ComponentProps = {
	containerClass: string
	inputClass: string
	checksClass: string
	inputPlaceholder: string
	inputName: string
	required?: boolean
}

const PasswordValidator = (props: ComponentProps) => {
	const [digit, setDigit] = useState<boolean>(false)
	const [lower, setLower] = useState<boolean>(false)
	const [upper, setUpper] = useState<boolean>(false)
	const [special, setSpecial] = useState<boolean>(false)
	const [length, setLength] = useState<boolean>(false)
	const [password, setPassword] = useState<string>("")
	const [showChecks, setShowChecks] = useState<boolean>(false)

	const checks = new Map([
		["At least one digit (0-9)", digit],
		["At least one lower case (a-z)", lower],
		["At least one upper case (A-Z)", upper],
		["At least one special character", special],
		["Length between 8 to 20", length],
	])

	useEffect(() => {
		const digitRegex = new RegExp("(?=.*\\d)")
		const lowerRegex = new RegExp("(?=.*[a-z])")
		const upperRegex = new RegExp("(?=.*[A-Z])")
		const specialRegex = new RegExp("(?=.*[\\W])")

		setDigit(digitRegex.test(password))
		setLower(lowerRegex.test(password))
		setUpper(upperRegex.test(password))
		setSpecial(specialRegex.test(password))
		setLength(password.length >= 8 && password.length <= 20)
	}, [password])

	return (
		<section className={props.containerClass}>
			<input
				type="password"
				pattern="((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,20})"
				placeholder={props.inputPlaceholder}
				className={props.inputClass}
				name={props.inputName}
				required={props.required}
				value={password}
				onChange={(el) => setPassword(el.target.value)}
				onFocus={() => setShowChecks(true)}
				onBlur={() => setShowChecks(false)}
			/>

			<section
				className={
					props.checksClass + " " + (showChecks ? "show" : "hide")
				}
			>
				{Array.from(checks).map(([text, value]) => {
					return (
						<section key={text}>
							<span style={{color: value ? "green" : "red"}}>
								{value ? <FaCheck /> : <FaXmark />}
							</span>{" "}
							{text}
						</section>
					)
				})}
			</section>
		</section>
	)
}

export default PasswordValidator
