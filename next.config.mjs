import withPWA from 'next-pwa'

/** @type {import('next').NextConfig} */

const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	compiler: {
		styledComponents: true,
		removeConsole: process.env.NODE_ENV !== 'development',
	},
	async redirects() {
		return [
			{
				source: '/',
				destination: '/library',
				permanent: false,
			},
		]
	},
}

export default withPWA({
	dest: 'public',
	disable: process.env.NODE_ENV === 'development',
	register: true,
	skipWaiting: true,
})(nextConfig)
