import {
	css
} from 'lit';

export default css`
	.audio-player {
		display: inline-flex;
		height: 48px;
		box-sizing: border-box;
	}

	::slotted(*) {
		display: none;
	}
`;
