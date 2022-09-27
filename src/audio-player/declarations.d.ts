interface contentProps {
	elem: String,
	attrs: any
}

interface iconProps {
	elem: String,
	attrs: {
		xmlns: String,
		viewBox: String,
		fill: String,
		width: Number,
		height: Number
	},
	content: Array<contentProps>,
	name: String,
	size: Number
}

declare module '@carbon/icons/es/play--filled/32' {
	const icon: iconProps;
	export default icon;
}
declare module '@carbon/icons/es/pause--outline--filled/32' {
	const icon: iconProps;
	export default icon;
}
declare module '@carbon/icons/es/download/32' {
	const icon: iconProps;
	export default icon;
}
declare module '@carbon/icons/es/document--download/32' {
	const icon: iconProps;
	export default icon;
}
declare module '@carbon/icons/es/quotes/32' {
	const icon: iconProps;
	export default icon;
}
