
import { html } from './vendor/preact';

import '@carbon/ibmdotcom-web-components/es/components/masthead/masthead-container.js';
import '@carbon/ibmdotcom-web-components/es/components/footer/index';

import './app.scss';

import ComponentCard from './components/card';

const App = () => {
	return html`
		<div id='app'>
			<dds-masthead-container
				platform='Audio Player'
			/>
			<main id='main-content' name='main-content' role="main">
				<div class='bx--grid py-2'>
					<div class='bx--row'>
						<div class='
							bx--col-sm-4
							bx--col-md-3
							bx--col-lg-6
							bx--col-xlg-4
							bx--no-gutter
						'>
							<${ComponentCard} />
						</div>
					</div>
				</div>
			</main>
			<dds-footer-container
				size='micro'
			/>
		</div>
	`;
};

export default App;
