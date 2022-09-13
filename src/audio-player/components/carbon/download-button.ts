import {
	LitElement,
	html
} from 'lit';

import {
	customElement,
	property
} from 'lit/decorators.js';

import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import {
	download as iconDownload,
	quotes as iconQuotes,
	documentDownload as iconDocumentDownload
} from '../audio-player-icons';

@customElement('audio-player-alternate-download-button-carbon')
export class AudioPlayerAlternateCarbonDownloadButton extends LitElement {
	@property() // For reasons, this will never receive bool, just strings
	ariaLabel = 'missing aria label';

	@property()
	transcriptUrl = '';

	@property()
	transcriptFileName = 'no.name';

	@property()
	transcriptText = '';

	@property()
	transcriptIcon = 'download'; // 'quotes', 'download', 'file'

	private icons : object = {};

	constructor() {
		super();

		this.fixIconSizes();
	}

	fixIconSizes () {
		const fixSize = (html = '') => {
			return html.replace('width="32"', 'width="20"')
			.replace('height="32"', 'height="20"');
		}

		this.icons = {
			download: fixSize(iconDownload),
			quotes: fixSize(iconQuotes),
			file: fixSize(iconDocumentDownload)
		}
	}

	render() {
		return (this.transcriptUrl === '')
		? ''
		: html`
			<bx-btn
				kind='tertiary'
				href='${this.transcriptUrl}'
				download='${this.transcriptFileName}'
				aria-label='${this.ariaLabel}'
				icon-layout='condensed'
			>
				${this.transcriptText}
				${unsafeHTML(this.icons[this.transcriptIcon] || this.icons.download)}
			</bx-btn>
		`;
		// : html`
		// 	<a
		// 		href='${this.transcriptUrl}'
		// 		download='${this.transcriptFileName}'
		// 		aria-label='${this.ariaLabel}'
		// 	>
		// 		<span class='icon'>
		// 			${unsafeHTML(this.icons[this.transcriptIcon] || iconDownload)}
		// 		</span>
		// 		<span class='text'>
		// 			${this.transcriptText}
		// 		</span>
		// 	</a>
		// `;
	}
}
