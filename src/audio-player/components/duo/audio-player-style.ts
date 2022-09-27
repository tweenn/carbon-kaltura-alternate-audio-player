import {
	css, unsafeCSS
} from 'lit';

import { black100, blue60, blue70, gray90, gray10Hover, white } from '@carbon/colors';

export default css`
	.audio-player-allternate--small {
		display: inline-flex;
		height: 3rem;
		box-sizing: border-box;
		
		font-family: 'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif;
	}
	
	::slotted(*) {
		display: none;
	}

	.action-button {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;

		padding: 0 0.5rem 0;
		outline: none;

		border: none;
		border-radius: 0;
		
		font-family: 'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif;
		font-size: 0.875rem;
		color: ${unsafeCSS(black100)};
		text-decoration: none;

		background-color: transparent;

		cursor: pointer;

		transition:
			background 70ms cubic-bezier(0, 0, 0.38, 0.9) 0s,
			box-shadow 70ms cubic-bezier(0, 0, 0.38, 0.9) 0s,
			outline 70ms cubic-bezier(0, 0, 0.38, 0.9) 0s;
	}

	.action-button:hover {
		background-color: ${unsafeCSS(gray10Hover)};
		color: ${unsafeCSS(gray90)};
	}

	.action-button:focus {
		box-shadow:
			inset 0 0 0 2px var(--cds-focus, ${unsafeCSS(blue60)}),
			inset 0 0 0 3px var(--cds-ui-background, ${unsafeCSS(white)});
	}

	a.action-button:visited {
		text-decoration: none;
	}

	.action-button .icon {
		box-sizing: border-box;
		width: auto;
		height: 3rem;
		color: inherit;
	}

	.action-button .icon svg {
		padding: 0.875rem 0;
		width: 1.25rem;
		height: 1.25rem;
	}

	.action-button.play-pause.is-playing {
		color: ${unsafeCSS(blue70)};
	}

	.action-button.play-pause.show-pause .ibm-icon.ibm-icon__play,
	.action-button.play-pause.show-play .ibm-icon.ibm-icon__pause {
		display: none;
	}

	.action-button.download {
		margin-left: 1rem;
	}
`;
