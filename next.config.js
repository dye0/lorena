module.exports = {
	reactStrictMode: true,
	poweredByHeader: false,
	images: {
		domains: ["asuna.ga", "cdn.nekos.life"],
	},
	eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    		ignoreDuringBuilds: true,
  },
};
