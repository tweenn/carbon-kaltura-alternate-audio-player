import {
	css
} from 'lit';

export default css`
	.player-holder {
		padding: 3px 16px;
		height: 24px;
		border: 1px solid transparent;
		box-sizing: border-box;

		font-family: 'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif;
		color: #000;
	}
	.player-holder.is-playing,
	.player-holder.is-playing a {
		color: #0f62fe;
	}

	a {
		width: 24px;
		height: 24px;

		display: inline-block;

		cursor: pointer;
		text-decoration-line: none;

		color: #000;

		vertical-align: middle;
		text-align: center;
	}

	a svg {
		width: 16px;
		height: 16px;
	}

	::slotted(*) {
		display: none;
	}
`;
