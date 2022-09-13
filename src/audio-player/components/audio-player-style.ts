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
`;
