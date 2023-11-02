const HiddenId = ({id}: {id: string}) => {
	return (
		<input
			type="hidden"
			name="id"
			value={id}
		/>
	)
}

export default HiddenId
