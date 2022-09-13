
import { html } from './vendor/preact';

import './app.scss';

import ComponentCard from './components/card';

const App = () => {
	return html`
		<div id='app'>
			<dds-masthead-container
				platform='Alternate Kaltura Audio Player'
			/>
			<main id='main-content' name='main-content' role="main">
				<div class='bx--grid py-2'>
					<div class='bx--row'>
						<div class='
							bx--col-sm-4
							bx--col-md-4
							bx--col-lg-8
							bx--col-xlg-6
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
