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
				lg: { max: '1023px' },
				md: { max: '800px' },
				sm: { max: '400px' },
			},
		},
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: ['retro', 'sunset', 'cupcake', 'forest'],
	},
}
export default config
