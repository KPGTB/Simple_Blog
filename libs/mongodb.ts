import mongoose from "mongoose"

const connect = () => {
	try {
		// @ts-ignore
		mongoose.connect(process.env.MONGODB_URI)
	} catch (error) {
		console.log(error)
	}
}

export default connect
