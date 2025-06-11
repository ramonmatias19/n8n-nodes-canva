module.exports = {
	extends: ['eslint:recommended'],
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
	},
	env: {
		es6: true,
		node: true,
	},
	rules: {
		'no-unused-vars': 'off',
	},
}; 