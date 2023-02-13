module.exports = {
	'env': {
		'browser': true,
		'es2021': true
	},
	'extends': ['react-app', 'react-app/jest', 'prettier'],
	'overrides': [
	],
	'parser': '@typescript-eslint/parser',
	'parserOptions': {
		'ecmaVersion': 'latest',
		'sourceType': 'module'
	},
	'plugins': [
		'react',
		'@typescript-eslint'
	],
	'rules': {
		'indent': [
			'warn',
			'tab'
		],
		'linebreak-style': [
			'warn',
			'unix'
		],
		'quotes': [
			'warn',
			'single'
		]
	}
};
