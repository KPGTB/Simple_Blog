"use client"

import {useEffect, useState} from "react"
import {FaCheck} from "react-icons/fa"
import {FaXmark} from "react-icons/fa6"
import Input from "../Input/Input"
import {
	maxPasswordLen,
	minPasswordLen,
	passwordDigitRegex,
	passwordLowerRegex,
	passwordRegex,
	passwordSpecialRegex,
	passwordUpperRegex,
} from "@/utils/regex"
import {classesToClass} from "@/utils/convert"

import styles from "./PasswordValidator.module.scss"

type ComponentProps = {
	inputClass: string
	inputPlaceholder: string
	inputName: string
	required?: boolean
}

const Entry = ({text, correct}: {text: string; correct: boolean}) => {
	return (
		<section key={text}>
			<span style={{color: correct ? "green" : "red"}}>
				{correct ? <FaCheck /> : <FaXmark />}
			</span>{" "}
			{text}
		</section>
	)
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
		[`Length between ${minPasswordLen} to ${maxPasswordLen}`, length],
	])

	useEffect(() => {
		const digitRegex = new RegExp(passwordDigitRegex)
		const lowerRegex = new RegExp(passwordLowerRegex)
		const upperRegex = new RegExp(passwordUpperRegex)
		const specialRegex = new RegExp(passwordSpecialRegex)

		setDigit(digitRegex.test(password))
		setLower(lowerRegex.test(password))
		setUpper(upperRegex.test(password))
		setSpecial(specialRegex.test(password))
		setLength(
			password.length >= minPasswordLen &&
				password.length <= maxPasswordLen
		)
	}, [password])

	return (
		<section className={styles.container}>
			<Input
				type="password"
				pattern={passwordRegex}
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
				className={classesToClass(
					styles.checks,
					showChecks ? styles.show : ""
				)}
			>
				{Array.from(checks).map(([text, value]) => (
					<Entry
						text={text}
						correct={value}
					/>
				))}
			</section>
		</section>
	)
}

export default PasswordValidator
