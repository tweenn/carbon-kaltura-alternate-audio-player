import {
	LitElement,
	html
} from 'lit';

import {
	customElement,
	property,
	state
} from 'lit/decorators.js';

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
	mediaId = '1_gp572bda';

	// @property()
	// uiConfId = 27941801;

	// @property()
	// partnerId = 1773841;

	@property()
	useMetrics = true;

	@state()
	private isPlayerInitiated = false;

	@state()
	private isPlayerReady = false;

	@state()
	private isPlaying = false;

	@state()
	private kalturaDigitalPlayer = {
		sendNotification: (notification = '') => {}
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
	}

	async getMediaInformation () {
		this.mediaInformation = await KalturaPlayerAPI.api(this.mediaId);
		this.mediaCurrentTime = this.mediaInformation.duration;
	}

	standarizePlayer () {
		this.playerId = this.holderId + this.playerId;

		if (this.getAttribute('id') === null) {
			this.setAttribute('id', this.holderId);
		}

		this.holderId = this.getAttribute('id') || this.holderId;
	}

	createChildPlayerElement () {
		const elementMediaPlayer = document.createElement('div');
		elementMediaPlayer.id = this.playerId;

		this.appendChild(elementMediaPlayer);
	}

	async embbedPlayer () {
		const context = this;

		this.standarizePlayer();
		this.createChildPlayerElement();

  		const embedAnswer = await KalturaPlayerAPI.embedMedia(
			this.mediaId,
			this.playerId,
			{
				autoPlay: true
			},
			this.useMetrics,
			(kdp: any) => {
				context.isPlayerReady = true;

				kdp?.addJsListener('playerUpdatePlayhead.alternate-player', function (time = 0) {
					context.mediaCurrentTime = context.mediaInformation.duration - Math.floor(time);
				});

				kdp?.addJsListener('playerPlayEnd.alternate-player', function () {
					context.isPlaying = false;
					context.mediaCurrentTime = context.mediaInformation.duration;
				});
			}
		);

        this.kalturaDigitalPlayer = await embedAnswer.kWidget();

		document.getElementById(this.playerId)?.click();

		this.isPlaying = true;
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
			<link rel='stylesheet' href='https://1.www.s81c.com/common/carbon-for-ibm-dotcom/tag/v1/latest/plex.css' />
			<span class='player-holder ${this.isPlaying ? 'is-playing' : 'is-paused'}'>
				<a
					@click='${this.handlePlay}'
					role='button'
					part='button'
				>
					${(
						(this.isPlayerInitiated) && (this.isPlaying))
						? unsafeHTML(iconPauseFilledHtml)
						: unsafeHTML(iconPlayFilledHtml)
					}
				</a>

				${KalturaPlayerAPI.getMediaDuration(this.mediaCurrentTime)}
			</span>
			<slot />
		`;
	}
};
