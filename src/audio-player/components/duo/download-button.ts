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

import downloadButtonStyle from './download-button-style';

@customElement('audio-player-alternate-download-button-duo')
export class AudioPlayerAlternateDuoDownloadButton extends LitElement {
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

	static styles = downloadButtonStyle;

	private icons = {
		download: iconDownload,
		quotes: iconQuotes,
		file: iconDocumentDownload
	};

	render() {
		return (this.transcriptUrl === '')
		? ''
		: html`
			<a
				href='${this.transcriptUrl}'
				download='${this.transcriptFileName}'
				aria-label='${this.ariaLabel}'
			>
				<span class='icon'>
					${unsafeHTML(this.icons[this.transcriptIcon] || iconDownload)}
				</span>
				<span class='text'>
					${this.transcriptText}
				</span>
			</a>
		`;
	}
}
