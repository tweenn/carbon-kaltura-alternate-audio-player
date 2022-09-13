import { html } from 'lit-html';
import '../audio-player';

// More on default export: https://storybook.js.org/docs/web-components/writing-stories/introduction#default-export
export default {
	title: 'Player/Audio',
	argTypes: {
		layout: {
			control: { type: 'select' },
			options: ['carbon', 'duo'],
		},
		transcriptIcon: {
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
	playerAriaLabel = 'Play: "Test Audio - IBM Elevator Pitch Series EP1 - Supply Chain" - 1:01 min',
	transcriptUrl = '',
	transcriptFileName = 'test-transcript.txt',
	transcriptText = '(TXT, -1KB)',
	transcriptIcon = 'quote',
	transcriptAriaLabel = 'Download Transcript for: "Test Audio - IBM Elevator Pitch Series EP1 - Supply Chain"'
}) => {
	return html`
		<audio-player-alternate
			id='${id}'
			mediaId='${mediaId}'
			uiConfId='${uiConfId}'
			partnerId='${partnerId}'
			useIbmMetrics='${useIbmMetrics}'
			layout='${layout}'
			playerAriaLabel='${playerAriaLabel}'
			transcriptUrl='${transcriptUrl}'
			transcriptFileName='${transcriptFileName}'
			transcriptText='${transcriptText}'
			transcriptIcon='${transcriptIcon}'
			transcriptAriaLabel='${transcriptAriaLabel}'
		/>
	`;
}

export const Duo = Template.bind({});
Duo.args = {
	id: 'my-media',
	mediaId: '1_gp572bda',
	uiConfId: 27941801,
	partnerId: 1773841,
	useIbmMetrics: false,
	layout: 'duo',
	playerAriaLabel: 'Play: "Test Audio - IBM Elevator Pitch Series EP1 - Supply Chain" - 1:01 min',
	transcriptUrl: './transcript.txt',
	transcriptFileName: 'test-transcript.txt',
	transcriptText: '(TXT, -1KB)',
	transcriptIcon: 'quote',
	transcriptAriaLabel: 'Download Transcript for: "Test Audio - IBM Elevator Pitch Series EP1 - Supply Chain"'
};

export const Carbon = Template.bind({});
Carbon.args = {
	id: 'my-media',
	mediaId: '1_gp572bda',
	uiConfId: 27941801,
	partnerId: 1773841,
	useIbmMetrics: false,
	layout: 'carbon',
	playerAriaLabel: 'Play: "Test Audio - IBM Elevator Pitch Series EP1 - Supply Chain" - 1:01 min',
	transcriptUrl: './transcript.txt',
	transcriptFileName: 'test-transcript.txt',
	transcriptText: '(TXT, -1KB)',
	transcriptIcon: 'quote',
	transcriptAriaLabel: 'Download Transcript for: "Test Audio - IBM Elevator Pitch Series EP1 - Supply Chain"'
};

