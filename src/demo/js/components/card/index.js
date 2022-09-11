
import { html } from '../../vendor/preact';

import '@carbon/ibmdotcom-web-components/es/components/card/index.js';
import '@carbon/ibmdotcom-web-components/es/components/quote/index.js';
import 'carbon-web-components/es/components/button/index.js';


import { toSVG } from '@carbon/icon-helpers';
import iconDownload from '@carbon/icons/es/download/32';

const makeIcon = (icon = { attrs: {}}) => {
	return toSVG({
		...icon,
		attrs: {
			...icon.attrs,
			focusable: false,
			'area-hidden': 'true',
			preserveAspectRatio: 'xMidYMid meet',
			slot: 'icon',
			class: 'ibm-icon bx--btn__icon',
			width: 16,
			height: 16
		},
	}).outerHTML;
}

const Card = () => {
	return html`
		<dds-card>
			<dds-card-heading style='margin-bottom: 0;'>
				<dds-quote inverse mark-type="double-curved"
					style='
						background-color: #f4f4f4;
						margin-left: 0;
						padding-bottom: 0;
						margin-bottom: 0;
					'
				>
					Business can't succeed in societies that are failing.
					<dds-quote-source-heading>
						This is the first line of source
					</dds-quote-source-heading>
				</dds-quote>
			</dds-card-heading>

			<dds-card-footer slot="footer">
				<p>
					<audio-player-alternate />

					<bx-btn
						href="https://www.ibm.com"
						kind='ghost'
						size='sm'
						dangerouslySetInnerHTML='${{__html: `
							<span style='padding-right: 24px'>PDF, 30KB</span>
							${makeIcon(iconDownload)}
						`}}'
					/>
				</p>
			</dds-card-footer>
		</dds-card>
	`;
}

export default Card;
