
import { toSVG } from '@carbon/icon-helpers';
import iconPlayFilled from '@carbon/icons/es/play--filled/32';
import iconPauseFilled from '@carbon/icons/es/pause--outline--filled/32';
import iconDownload from '@carbon/icons/es/download/32';
import iconDocumentDownload from '@carbon/icons/es/document--download/32';
import iconQuotes from '@carbon/icons/es/quotes/32';

const makeIcon = (icon = { attrs: {}}, className = '') => {
	return toSVG({
		...icon,
		attrs: {
			...icon.attrs,
			focusable: false,
			'aria-hidden': true,
			preserveAspectRatio: 'xMidYMid meet',
			class: `ibm-icon ibm-icon__${className}`,
		},
	}).outerHTML;
}

const playFilled : string = makeIcon(iconPlayFilled, 'play');
const pauseFilled : string = makeIcon(iconPauseFilled, 'pause');
const download : string = makeIcon(iconDownload, 'download');
const quotes : string = makeIcon(iconQuotes, 'quotes');
const documentDownload : string = makeIcon(iconDocumentDownload, 'document-download');

export {
	playFilled,
	pauseFilled,
	download,
	quotes,
	documentDownload
}
