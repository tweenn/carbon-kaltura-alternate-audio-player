module.exports = {
	stories: [
		'../src/stories/**/*.stories.mdx',
		'../src/stories/**/*.stories.@(js|jsx|ts|tsx)'
	],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-a11y'
	],
	framework: '@storybook/web-components',
	core: {
		disableTelemetry: true
	},
	staticDirs: ['../src/stories/static'],

	// TURN AROUND TO MAKE STORYBOOK RENDER LIT-ELEMENT CORRECTLY
	// FOUND AT https://github.com/storybookjs/storybook/issues/12578#issuecomment-702664081
	babel: async (options) => {
		Object.assign(options.plugins.find((plugin) => plugin[0].includes('plugin-proposal-decorators'))[1], {
			decoratorsBeforeExport: true,
			legacy: false
		})
		return options;
	}
}
