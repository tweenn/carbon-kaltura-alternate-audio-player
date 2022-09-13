
import {
	createElement,
	render
} from './vendor/preact';

import App from './app';

const init = () => {
	render(
		createElement(App, {}),
		document.body
	);
}

init();
