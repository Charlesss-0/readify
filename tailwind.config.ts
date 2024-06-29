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
			{
				appTheme: {
					primary: '#1f1f1f',
					'primary-content': '#2f2f2f',

					secondary: '#f50057',
					'secondary-content': '#bbba',

					neutral: '#5f5f5f',
					'neutral-content': '#afafaf',

					accent: '#2f2f2f3f',
					'accent-secondary': '#efefef3f',

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
