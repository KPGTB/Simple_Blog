import Activation from "@/components/Activation"

const Page = ({params}: {params: {hash: string}}) => {
	return (
		<Activation
			hash={params.hash}
			publicKey={process.env.RECAPTCHA_PUBLIC!}
		/>
	)
}

export default Page
