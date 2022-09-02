import {
	LitElement,
	html
} from 'lit';

import {
	customElement,
	property,
	state
} from 'lit/decorators.js';

import { styleMap } from 'lit/directives/style-map.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import audioPlayerStyle from './audio-player-style';

import { KalturaPlayer as KalturaPlayerAPI } from '@carbon/ibmdotcom-services';

import {
	playFilled as iconPlayFilledHtml,
	pauseFilled as iconPauseFilledHtml,
} from './audio-player-icons';

@customElement('audio-player-alternate')
export class AudioPlayerAlternate extends LitElement {
	@property()
	iconStyle = { color: '#000'};

	@property()
	mediaId = '1_gp572bda';

	@state()
	private isPlayerInitiated = false;

	@state()
	private isPlayerReady = false;

	@state()
	private isPlaying = false;

	@state()
	private kalturaDigitalPlayer = {
		sendNotification: () => {}
	};

	@state()
	private mediaCurrentTime = 0;

	private holderId = 'my-media';
	private playerId = '--media-player';

	private mediaInformation = {
		duration: 0
	};

	static styles = audioPlayerStyle;

	constructor() {
		super();

		this.getMediaInformation();

		this.playerId = this.holderId + this.playerId;

		if (this.getAttribute('id') === null) {
			this.setAttribute('id', this.holderId);
		} else {
			this.holderId = this.getAttribute('id');
		}

		const elementMediaPlayer = document.createElement('div');
		elementMediaPlayer.id = this.playerId;

		this.appendChild(elementMediaPlayer);
	}

	async getMediaInformation () {
		this.mediaInformation = await KalturaPlayerAPI.api(this.mediaId);
	}

	async embbedPlayer () {
		const context = this;

  		const embedAnswer = await KalturaPlayerAPI.embedMedia(
			this.mediaId,
			this.playerId,
			{
				autoPlay: true
			}
		);

        const kdp = await embedAnswer.kWidget();
        this.kalturaDigitalPlayer = kdp;

		document.getElementById(this.playerId).click();
		
		this.isPlayerReady = true;
		this.isPlaying = true;

		kdp.addJsListener('playerUpdatePlayhead.ibm', function (time = 0) {
			context.mediaCurrentTime = Math.floor(time);
		});

		kdp.addJsListener('playerPlayEnd.ibm', function () {
			context.isPlaying = false;
			context.mediaCurrentTime = context.mediaInformation.duration;
		});
	}

	handlePlay () {
		if (!this.isPlayerInitiated) {
			this.isPlayerInitiated = true;
			this.embbedPlayer();

		} else if (this.isPlayerReady) {
			if (this.isPlaying) {
				this.kalturaDigitalPlayer.sendNotification('doPause');
			} else {
				this.kalturaDigitalPlayer.sendNotification('doPlay');
			}
			this.isPlaying = !this.isPlaying;
		}
	}

	render() {
		return html`
			<p>
				<a
					id='player-control-play'
					@click='${this.handlePlay}'
					style=${styleMap(this.iconStyle)}
				>
					${(
						(this.isPlayerInitiated) && (this.isPlaying))
							? unsafeHTML(iconPauseFilledHtml)
							: unsafeHTML(iconPlayFilledHtml)
					}
				</a>
				<span>${KalturaPlayerAPI.getMediaDuration(this.mediaCurrentTime)}</span>
			</p>
			<link rel="stylesheet" href="https://1.www.s81c.com/common/carbon-for-ibm-dotcom/tag/v1/latest/plex.css" />
			<slot />
		`;
	}
};
