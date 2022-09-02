import {
	css
} from 'lit';

export default css`
	#player-control-play {
		cursor: pointer;
		text-decoration-line: none;
	}

	p {
		font-family: 'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif;
	}

	a svg {
		width: 16px;
		height: 16px;
	}

	::slotted(*) {
		display: none;
	}
`;
