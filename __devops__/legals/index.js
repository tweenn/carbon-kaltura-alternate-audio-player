
const version = require('../../package.json').version;
const date = new Intl.DateTimeFormat('en-US', {
	timeStyle: 'medium',
	dateStyle: 'medium'
}).format(new Date());

module.exports = (environment = 'production') => {
	environment = environment.charAt(0).toUpperCase() + environment.slice(1);

	return `
/**
 * @license
 * Name: Carbon Kaltura Alternate Audio Player
 * Environment: ${environment}
 * Release: ${version}
 * Built: ${date}
 * Owner: Felipe Zuntini
 * Description: Experimental file, use with caution as is
 */
	`;
};
