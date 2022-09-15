import {
	css
} from 'lit';

export default css`
	.audio-player {
		display: inline-flex;
		height: 48px;
		box-sizing: border-box;

		font-family: 'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif;
	}

	::slotted(*) {
		display: none;
	}

	button,
	a {
		display: inline-flex;
		align-items: center;
		border: 0 solid transparent;
		padding: 0;
		
		font-family: 'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif;
		font-size: 0.875rem;
		color: #000;

		background-color: transparent;

		cursor: pointer;
	}

	a:hover,
	a:focus,
	a:focus-visible,
	button:hover,
	button:focus,
	button:focus-visible {
		background-color: #e5e5e5;
	}

	a {
		text-decoration: none;
	}

	a:visited: {
		text-decoration: none;
	}

	.text {
		padding-right: 8px;
	}

	.icon {
		box-sizing: border-box;
		width: 32px;
		height: 48px;
		color: inherit;
	}

	.icon svg {
		padding: 14px 6px;
		width: 20px;
		height: 20px;
	}

	.btn-play-pause.is-playing {
		color: #0f62fe;
	}

	.btn-play-pause.show-pause .ibm-icon.play {
		display: none;
	}

	.btn-play-pause.show-play .ibm-icon.pause {
		display: none;
	}

	.btn-download {
		margin-left: 16px;
	}
`;
