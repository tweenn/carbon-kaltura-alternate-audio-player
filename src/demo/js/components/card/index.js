
import { html } from '../../vendor/preact';

import '../../../../audio-player';

const Card = () => {
	return html`
		<dds-card>
			<dds-card-heading style='margin-bottom: 0;'>
				<dds-quote inverse mark-type="double-curved"
					style='
						background-color: #f4f4f4;
						margin-left: 0;
						padding-bottom: 0;
						margin-bottom: 0;
					'
				>
					Business can't succeed in societies that are failing.
					<dds-quote-source-heading>
						This is the first line of source
					</dds-quote-source-heading>
				</dds-quote>
			</dds-card-heading>

			<p>
				<audio-player-alternate
					layout='duo'
					transcriptUrl='./static/transcript.txt'
					transcriptFileName='demo-transcript.txt'
					transcriptIcon='quotes'
				/>
			</p>
		</dds-card>
	`;
}

export default Card;
