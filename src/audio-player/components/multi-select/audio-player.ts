import {
	LitElement,
	html
} from 'lit';

import {
	customElement,
	property,
	state
} from 'lit/decorators.js';

import audioPlayerStyle from './audio-player-style';

import { KalturaPlayer as KalturaPlayerAPI } from '@carbon/ibmdotcom-services';

import './duo/audio-player';
import './duo/download-button';

import './carbon/audio-player';
import './carbon/download-button';

import plex from 'https://1.www.s81c.com/common/carbon-for-ibm-dotcom/tag/v1/latest/plex.css';

@customElement('audio-player-alternate')
export class AudioPlayerAlternate extends LitElement {
	@property()
	mediaId = '1_gp572bda';

	@property()
	uiConfId = 27941801;

	@property()
	partnerId = 1773841;

	@property()
	useIbmMetrics = true;

	@property()
	layout = 'carbon';

	@property()
	buttonPlayAriaLabel = 'Play: "Test Audio - IBM Elevator Pitch Series EP1 - Supply Chain" - 1:01 min';

	@property()
	buttonDownloadHref = '';

	@property()
	buttonDownloadFileName = 'no.name';

	@property()
	buttonDownloadText = '(TXT, 112KB)';

	@property()
	buttonDownloadIcon = 'quote'; // 'quotes', 'download', 'file'

	@property()
	buttonDownloadAriaLabel = 'Download Transcript for: "Test Audio - IBM Elevator Pitch Series EP1 - Supply Chain"';

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

	private holderId = 'default-player-id';
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
		if (this.getAttribute('id') === null) {
			this.setAttribute('id', this.holderId);
		}

		this.holderId = this.getAttribute('id') || this.holderId;

		this.playerId = this.holderId + this.playerId;
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
			this.useIbmMetrics,
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
				this.isPlaying = false;
			} else {
				this.kalturaDigitalPlayer.sendNotification('doPlay');
				this.isPlaying = true;
			}
		}
	}

	render() {
		return html`
			<div class='audio-player ${this.isPlaying ? 'is-playing' : 'is-paused'}'>
				<div class='audio-player--holder'>
					${
						(this.layout === 'duo')
						? html`
							<audio-player-alternate-player-duo
								@click-play='${() => {
									this.handlePlay();
								}}'
								isPlayerInitiated='${this.isPlayerInitiated}'
								isPlaying='${this.isPlaying}'
								mediaCurrentTime='${this.mediaCurrentTime}'
								ariaLabel='${this.buttonPlayAriaLabel}'
							></audio-player-alternate-player-duo>
							<audio-player-alternate-download-button-duo
								buttonDownloadHref='${this.buttonDownloadHref}'
								buttonDownloadFileName='${this.buttonDownloadFileName}'
								buttonDownloadText='${this.buttonDownloadText}'
								buttonDownloadIcon='${this.buttonDownloadIcon}'
								ariaLabel='${this.buttonDownloadAriaLabel}'
							></audio-player-alternate-download-button-duo>
						`
						: ''
					}
					${
						(this.layout === 'carbon')
						? html`
							<audio-player-alternate-player-carbon
								@click-play='${() => {
									this.handlePlay();
								}}'
								isPlayerInitiated='${this.isPlayerInitiated}'
								isPlaying='${this.isPlaying}'
								mediaCurrentTime='${this.mediaCurrentTime}'
								ariaLabel='${this.buttonPlayAriaLabel}'
							>
							</audio-player-alternate-player-carbon>
							<audio-player-alternate-download-button-carbon
								buttonDownloadHref='${this.buttonDownloadHref}'
								buttonDownloadFileName='${this.buttonDownloadFileName}'
								buttonDownloadText='${this.buttonDownloadText}'
								buttonDownloadIcon='${this.buttonDownloadIcon}'
								ariaLabel='${this.buttonDownloadAriaLabel}'
							>
							</audio-player-alternate-download-button-carbon>
						`
						: ''
					}
				</div>
			</div>
			<slot />
		`;
	}
}
