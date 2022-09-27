import { html } from 'lit-html';
import '../audio-player';

// More on default export: https://storybook.js.org/docs/web-components/writing-stories/introduction#default-export
export default {
	title: 'Player/Small/Multi',
	argTypes: {
		layout: {
			control: { type: 'select' },
			options: ['carbon', 'duo'],
		},
		buttonDownloadIcon: {
			control: { type: 'select' },
			options: ['quotes', 'download', 'file'],
		}
	},
};

// More on component templates: https://storybook.js.org/docs/web-components/writing-stories/introduction#using-args
const Template = ({
	id = 'my-media',
	uiConfId = 27941801,
	partnerId = 1773841,
	mediaId = '1_gp572bda',
	useIbmMetrics = false,
	layout = 'carbon',
	buttonPlayAriaLabel = 'Play: "Test Audio - IBM Elevator Pitch Series EP1 - Supply Chain" - 1:01 min',
	buttonDownloadHref = '',
	buttonDownloadFileName = 'test-transcript.txt',
	buttonDownloadText = '(TXT, -1KB)',
	buttonDownloadIcon = 'quote',
	buttonDownloadAriaLabel = 'Download Transcript for: "Test Audio - IBM Elevator Pitch Series EP1 - Supply Chain"'
}) => {
	return html`
		<audio-player-alternate
			id='${id}'
			mediaId='${mediaId}'
			uiConfId='${uiConfId}'
			partnerId='${partnerId}'
			useIbmMetrics='${useIbmMetrics}'
			layout='${layout}'
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
	id: 'my-media-duo',
	mediaId: '1_gp572bda',
	uiConfId: 27941801,
	partnerId: 1773841,
	useIbmMetrics: false,
	layout: 'duo',
	buttonPlayAriaLabel: 'Play: "Test Audio - IBM Elevator Pitch Series EP1 - Supply Chain" - 1:01 min',
	buttonDownloadHref: './transcript.txt',
	buttonDownloadFileName: 'test-transcript.txt',
	buttonDownloadText: '(TXT, -1KB)',
	buttonDownloadIcon: 'quote',
	buttonDownloadAriaLabel: 'Download Transcript for: "Test Audio - IBM Elevator Pitch Series EP1 - Supply Chain"'
};

export const Carbon = Template.bind({});
Carbon.args = {
	id: 'my-media-carbon',
	mediaId: '1_gp572bda',
	uiConfId: 27941801,
	partnerId: 1773841,
	useIbmMetrics: false,
	layout: 'carbon',
	buttonPlayAriaLabel: 'Play: "Test Audio - IBM Elevator Pitch Series EP1 - Supply Chain" - 1:01 min',
	buttonDownloadHref: './transcript.txt',
	buttonDownloadFileName: 'test-transcript.txt',
	buttonDownloadText: '(TXT, -1KB)',
	buttonDownloadIcon: 'quote',
	buttonDownloadAriaLabel: 'Download Transcript for: "Test Audio - IBM Elevator Pitch Series EP1 - Supply Chain"'
};

