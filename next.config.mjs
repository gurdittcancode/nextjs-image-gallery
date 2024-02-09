/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com"
            },
            {
                protocol: "https",
                hostname: "plus.unsplash.com"
            }
        ]
	},
    logging: {
        fetches: {
            // fullUrl: true,
        }
    }
}

export default nextConfig
