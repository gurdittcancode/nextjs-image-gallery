import { UnsplashImage } from "@/models/unsplash-image"
import Image from "next/image"
import Link from "next/link"
import { Alert } from "@/components/bootstrap"

export const metadata = {
	title: "Static fetching - NextJS 14 Image Gallery",
}

export default async function Page() {
	const response = await fetch(
		"https://api.unsplash.com/photos/random?client_id=" +
			process.env.UNSPLASH_ACCESS_KEY
	)
	//it is safe to write api key here as this will only run on server, so user can't see the network call
	const image: UnsplashImage = await response.json()

	const width = Math.min(500, image.width)
	const height = Math.min((width / image.width) * image.height, image.height)
	//calculates aspect-ratio

	return (
		<div className="d-flex flex-column align-items-center">
			<Alert>
				This page <strong>fetches and caches data at build time</strong>. Even
				though the Unplash API always returns a new image, we see the same image
				after refresh
			</Alert>
			<Image
				src={image.urls.raw}
				width={width}
				height={height}
				alt={image.description}
				className="rounded shadow mw-100 h-100"
			/>
			by
			<Link href={"/users/" + image.user.username}>{image.user.username}</Link>
		</div>
	)
}
