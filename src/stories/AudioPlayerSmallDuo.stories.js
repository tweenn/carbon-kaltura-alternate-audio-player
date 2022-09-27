import { html } from 'lit-html';
import '../audio-player';

// More on default export: https://storybook.js.org/docs/web-components/writing-stories/introduction#default-export
export default {
	title: 'Player/Small',
	argTypes: {
		buttonDownloadIcon: {
			control: { type: 'select' },
			options: ['quotes', 'download', 'file'],
		}
	},
};

const Template = ({
	mediaId = '1_gp572bda',
	useIbmMetrics = false,
	buttonPlayAriaLabel = 'Play: "Test Audio - IBM Elevator Pitch Series EP1 - Supply Chain" - 1:01 min',
	buttonDownloadHref = '',
	buttonDownloadFileName = 'test-transcript.txt',
	buttonDownloadText = '(TXT, -1KB)',
	buttonDownloadIcon = 'quote',
	buttonDownloadAriaLabel = 'Download Transcript for: "Test Audio - IBM Elevator Pitch Series EP1 - Supply Chain"'
}) => {
	return html`
		<link
			rel="stylesheet"
			href="https://1.www.s81c.com/common/carbon-for-ibm-dotcom/tag/v1/latest/plex.css"
		/>
		<link
			rel="stylesheet"
			href="https://unpkg.com/carbon-components@10.58.1/css/carbon-components.min.css"
		/>
		<audio-player-alternate-duo
			id='my-media-duo'
			mediaId='${mediaId}'
			useIbmMetrics='${useIbmMetrics}'
			buttonPlayAriaLabel='${buttonPlayAriaLabel}'
			buttonDownloadHref='${buttonDownloadHref}'
			buttonDownloadFileName='${buttonDownloadFileName}'
			buttonDownloadText='${buttonDownloadText}'
			buttonDownloadIcon='${buttonDownloadIcon}'
			buttonDownloadAriaLabel='${buttonDownloadAriaLabel}'
		/>
	`;
}

export const Duo = Template.bind({});
Duo.args = {
	mediaId: '1_gp572bda',
	useIbmMetrics: false,
	buttonPlayAriaLabel: 'Play: "Test Audio - IBM Elevator Pitch Series EP1 - Supply Chain" - 1:01 min',
	buttonDownloadHref: './transcript.txt',
	buttonDownloadFileName: 'test-transcript.txt',
	buttonDownloadText: '(TXT, -1KB)',
	buttonDownloadIcon: 'quote',
	buttonDownloadAriaLabel: 'Download Transcript for: "Test Audio - IBM Elevator Pitch Series EP1 - Supply Chain"'
};

