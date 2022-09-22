import { html } from 'lit-html';
import '../audio-player';

// More on default export: https://storybook.js.org/docs/web-components/writing-stories/introduction#default-export
export default {
	title: 'Player/Audio/Duo',
	argTypes: {
		buttonDownloadIcon: {
			control: { type: 'select' },
			options: ['quotes', 'download', 'file'],
		}
	},
};

const Template = ({
	id = 'my-media',
	buttonPlayAriaLabel = 'Play: "Test Audio - IBM Elevator Pitch Series EP1 - Supply Chain" - 1:01 min',
	buttonDownloadHref = '',
	buttonDownloadFileName = 'test-transcript.txt',
	buttonDownloadText = '(TXT, -1KB)',
	buttonDownloadIcon = 'quote',
	buttonDownloadAriaLabel = 'Download Transcript for: "Test Audio - IBM Elevator Pitch Series EP1 - Supply Chain"'
}) => {
	return html`
		<audio-player-alternate-duo
			id='${id}'
			buttonPlayAriaLabel='${buttonPlayAriaLabel}'
			buttonDownloadHref='${buttonDownloadHref}'
			buttonDownloadFileName='${buttonDownloadFileName}'
			buttonDownloadText='${buttonDownloadText}'
			buttonDownloadIcon='${buttonDownloadIcon}'
			buttonDownloadAriaLabel='${buttonDownloadAriaLabel}'
		/>
	`;
}

export const Player = Template.bind({});
Player.args = {
	id: 'my-media-duo',
	mediaId: '1_gp572bda',
	buttonPlayAriaLabel: 'Play: "Test Audio - IBM Elevator Pitch Series EP1 - Supply Chain" - 1:01 min',
	buttonDownloadHref: './transcript.txt',
	buttonDownloadFileName: 'test-transcript.txt',
	buttonDownloadText: '(TXT, -1KB)',
	buttonDownloadIcon: 'quote',
	buttonDownloadAriaLabel: 'Download Transcript for: "Test Audio - IBM Elevator Pitch Series EP1 - Supply Chain"'
};

