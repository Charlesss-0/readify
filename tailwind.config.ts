import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			screens: {
				xl: { max: '1279px' },
				lg: { max: '900px' },
				md: { max: '600px' },
				sm: { max: '400px' },
			},
		},
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: [
			'retro',
			'sunset',
			'cupcake',
			'forest',
			'emerald',
			{
				appTheme: {
					primary: '#00c2ff',
					'primary-content': '#000e16',
					secondary: '#0068ff',
					'secondary-content': '#d1e4ff',
					accent: '#ff5c00',
					'accent-content': '#160300',
					neutral: '#1f1f1f',
					'neutral-content': '#cdcdcd',
					'base-100': '#fff4f2',
					'base-200': '#ded4d2',
					'base-300': '#bdb5b4',
					'base-content': '#161414',
					info: '#009ad1',
					'info-content': '#000910',
					success: '#008a59',
					'success-content': '#000703',
					warning: '#d07300',
					'warning-content': '#100500',
					error: '#fc4d5d',
					'error-content': '#160203',
				},
			},
		],
	},
}
export default config
