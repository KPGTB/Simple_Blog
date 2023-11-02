export const passwordDigitRegex = "(?=.*\\d)"
export const passwordLowerRegex = "(?=.*[a-z])"
export const passwordUpperRegex = "(?=.*[A-Z])"
export const passwordSpecialRegex = "(?=.*[\\W])"
export const minPasswordLen = 8
export const maxPasswordLen = 20
export const passwordRegex = `(${passwordDigitRegex}${passwordLowerRegex}${passwordUpperRegex}${passwordSpecialRegex}.{${minPasswordLen},${maxPasswordLen}})`
