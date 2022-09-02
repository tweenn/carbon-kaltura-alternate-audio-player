
import { toSVG } from '@carbon/icon-helpers';
import iconPlayFilled from '@carbon/icons/es/play--filled/32';
import iconPauseFilled from '@carbon/icons/es/pause--filled/32';

const makeIcon = (icon = { attrs: {}}) => {
	return toSVG({
		...icon,
		attrs: {
			...icon.attrs,
			focusable: false,
			preserveAspectRatio: 'xMidYMid meet',
			class: 'ibm-icon'
		},
	}).outerHTML;
}

const playFilled = makeIcon(iconPlayFilled);
const pauseFilled = makeIcon(iconPauseFilled);

export {
	playFilled,
	pauseFilled
}
