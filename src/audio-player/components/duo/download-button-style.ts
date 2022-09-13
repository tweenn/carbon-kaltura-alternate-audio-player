import {
	css
} from 'lit';

import commonStyles from './common-styles';

export default css`
	${commonStyles}

	a {
		margin-left: 16px;
	}

	.icon {
		width: 32px;
	}

	.icon svg {
		padding: 14px 6px;
		width: 20px;
		height: 20px;
	}
`;
