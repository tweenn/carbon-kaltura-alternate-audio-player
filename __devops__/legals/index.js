
const version = require('../../package.json').version;
const date = new Intl.DateTimeFormat('en-US', {
	timeStyle: 'medium',
	dateStyle: 'medium'
}).format(new Date());

module.exports = (environment = 'production') => {
	environment = environment.charAt(0).toUpperCase() + environment.slice(1);

	return `
/**
 * @license MIT
 * @description
 * Carbon Kaltura Alternate Audio Player:
 * This is a community component, provided as is
 * Environment: ${environment}
 * Built: ${date}
 * @version ${version}
 * @author Felipe Zuntini <felipezuntini@hotmail.com>
 * @example https://tweenn.github.io/carbon-kaltura-alternate-audio-player/
 * @url https://github.com/tweenn/carbon-kaltura-alternate-audio-player
 */
	`;
};
