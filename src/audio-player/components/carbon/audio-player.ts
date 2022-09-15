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
	playFilled as iconPlayFilledHtml,
	pauseFilled as iconPauseFilledHtml
} from '../audio-player-icons';

import { KalturaPlayer as KalturaPlayerAPI } from '@carbon/ibmdotcom-services';

@customElement('audio-player-alternate-player-carbon')
export class AudioPlayerAlternateDuoPlayer extends LitElement {
	@property() // For reasons, this will never receive bool, just strings
	ariaLabel = 'missing aria label';

	@property() // For reasons, this will never receive bool, just strings
	isPlayerInitiated = 'false';

	@property() // For reasons, this will never receive bool, just strings
	isPlaying = 'false';

	@property()
	mediaCurrentTime = 0;

	private iconPlayFilledHtmlFixed = '';
	private iconPauseFilledHtmlFixed = '';

	private scriptId = 'alternate-audio-player-script-for-carbon-button';

	constructor() {
		super();

		this.loadScript();
		this.fixIconSizes();
	}

	loadScript () {
		if (!document.getElementById(this.scriptId)) {
			const script = document.createElement('script');
			script.src = 'https://1.www.s81c.com/common/carbon/web-components/tag/latest/button.min.js';
			script.async = true;
			script.id = 'alternate-audio-player-script-for-carbon-button';
			script.type = 'module';
			document.body.appendChild(script);
		}
	}

	fixIconSizes () {
		const fixSize = (html = '') => {
			return html.replace('width="32"', 'width="20"')
			.replace('height="32"', 'height="20"');
		}

		this.iconPlayFilledHtmlFixed = fixSize(iconPlayFilledHtml);
		this.iconPauseFilledHtmlFixed = fixSize(iconPauseFilledHtml);
	}

	handleClick () {
		this.dispatchEvent(
			new CustomEvent('click-play', {})
		);
	}

	handleIsPlayingState () {
		if ((this.isPlayerInitiated === 'false') || (this.isPlaying === 'false')) {
			return false; // is-paused show-play
		}
		return true; // is-playing show-pause
	}

	render() {
		return html`
			<bx-btn
				kind='${this.handleIsPlayingState() ? 'primary' : 'tertiary'}'
				@click='${this.handleClick}'
				aria-label='${this.ariaLabel}'
				icon-layout='condensed'
			>
				${KalturaPlayerAPI.getMediaDuration(this.mediaCurrentTime)}
				${
					(this.handleIsPlayingState())
					? unsafeHTML(this.iconPauseFilledHtmlFixed)
					: unsafeHTML(this.iconPlayFilledHtmlFixed)
				}
			</bx-btn>
		`;
	}
}
