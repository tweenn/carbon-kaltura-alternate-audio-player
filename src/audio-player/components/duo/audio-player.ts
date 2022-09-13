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

import audioPlayerStyle from './audio-player-style';

import { KalturaPlayer as KalturaPlayerAPI } from '@carbon/ibmdotcom-services';

@customElement('audio-player-alternate-player-duo')
export class AudioPlayerAlternateDuoPlayer extends LitElement {
	@property() // For reasons, this will never receive bool, just strings
	ariaLabel = 'missing aria label';

	@property() // For reasons, this will never receive bool, just strings
	isPlayerInitiated = 'false';

	@property() // For reasons, this will never receive bool, just strings
	isPlaying = 'false';

	@property()
	mediaCurrentTime = 0;

	static styles = audioPlayerStyle;

	handleClick () {
		this.dispatchEvent(
			new CustomEvent('click-play', {})
		);
	}

	handleCssClass () {
		if ((this.isPlayerInitiated === 'false') || (this.isPlaying === 'false')) {
			return 'is-paused show-play';
		}
		return 'is-playing show-pause';
	}

	render() {
		return html`
			<button
				@click='${this.handleClick}'
				class='${this.handleCssClass()}'
				aria-label='${this.ariaLabel}'
			>
				<span class='icon'>
					${unsafeHTML(iconPauseFilledHtml)}
					${unsafeHTML(iconPlayFilledHtml)}
				</span>
				<span class='text'>
					${KalturaPlayerAPI.getMediaDuration(this.mediaCurrentTime)}
				</span>
			</button>
		`;
	}
}
