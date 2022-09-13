import {
	css
} from 'lit';

import commonStyles from './common-styles';

export default css`
	${commonStyles}

	button.is-playing {
		color: #0f62fe;
	}

	button.show-pause .ibm-icon.play {
		display: none;
	}

	button.show-play .ibm-icon.pause {
		display: none;
	}
`;
