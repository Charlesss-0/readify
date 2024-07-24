const config = {
	siteUrl: 'https://readify-one.vercel.app',
	generateRobotsTxt: true,
	robotsTxtOptions: {
		policies: [
			{ userAgent: '*', disallow: '/api/' },
			{ userAgent: '*', allow: '/' },
		],
	},
}

module.exports = config
