import {
	LitElement,
	html,
	nothing
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
	download as iconDownload,
	quotes as iconQuotes,
	documentDownload as iconDocumentDownload,
	playFilled as iconPlayFilledHtml,
	pauseFilled as iconPauseFilledHtml
} from './audio-player-icons';

@customElement('audio-player-alternate-duo')
export class AudioPlayerAlternateDuo extends LitElement {
	@property()
	mediaId = '1_gp572bda';

	// Not yet supported
	// @property()
	// uiConfId = 27941801;
	// Not yet supported
	// @property()
	// partnerId = 1773841;

	@property()
	useIbmMetrics = true;

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

	getIcon(iconName: string) {
		let icon;
	
		switch (iconName) {
			case 'quotes':
				icon = iconQuotes;
				break;
			case 'file':
				icon = iconDocumentDownload;
				break;
			case 'download':
			default:
				icon = iconDownload;
				break;
		}
		return icon;
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

	handleCssClass () {
		if ((this.isPlayerInitiated) && (this.isPlaying)) {
			return 'is-playing show-pause';
		}
		return 'is-paused show-play';
	}

	render() {
		return html`
			<div class='audio-player-allternate--small'>
				<div class='audio-player--holder'>
					<button
						@click='${this.handlePlay}'
						class='action-button play-pause ${this.handleCssClass()}'
						aria-label='${this.buttonPlayAriaLabel}'
					>
						<span class='icon'>
							${unsafeHTML(iconPauseFilledHtml)}
							${unsafeHTML(iconPlayFilledHtml)}
						</span>
						<span class='text'>
							${KalturaPlayerAPI.getMediaDuration(this.mediaCurrentTime)}
						</span>
					</button>
					${
						(this.buttonDownloadHref === '')
						? nothing
						: html`
							<a
								class='action-button download'
								href='${this.buttonDownloadHref}'
								download='${this.buttonDownloadFileName}'
								aria-label='${this.buttonDownloadAriaLabel}'
							>
								<span class='icon'>
									${unsafeHTML(this.getIcon(this.buttonDownloadIcon))}
								</span>
								<span class='text'>
									${this.buttonDownloadText}
								</span>
							</a>
						`
					}
				</div>
			</div>
			<slot />
		`;
	}
}
