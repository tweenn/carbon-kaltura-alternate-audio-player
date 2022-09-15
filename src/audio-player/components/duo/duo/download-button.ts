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

@customElement('audio-player-alternate-duo-download-button')
export class AudioPlayerAlternateDuoDownloadButton extends LitElement {
	@property() // For reasons, this will never receive bool, just strings
	ariaLabel = 'missing aria label';

	@property()
	buttonDownloadHref = '';

	@property()
	buttonDownloadFileName = 'no.name';

	@property()
	buttonDownloadText = '';

	@property()
	buttonDownloadIcon = 'download'; // 'quotes', 'download', 'file'

	static styles = downloadButtonStyle;

	private icons = {
		download: iconDownload,
		quotes: iconQuotes,
		file: iconDocumentDownload
	};

	render() {
		return (this.buttonDownloadHref === '')
		? ''
		: html`
			<a
				href='${this.buttonDownloadHref}'
				download='${this.buttonDownloadFileName}'
				aria-label='${this.ariaLabel}'
			>
				<span class='icon'>
					${unsafeHTML(this.icons[this.buttonDownloadIcon] || iconDownload)}
				</span>
				<span class='text'>
					${this.buttonDownloadText}
				</span>
			</a>
		`;
	}
}
