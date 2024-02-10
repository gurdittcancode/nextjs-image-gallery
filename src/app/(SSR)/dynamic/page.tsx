import { UnsplashImage } from "@/models/unsplash-image"
import Image from "next/image"
import Link from "next/link"
import { Alert } from "@/components/bootstrap"

export const metadata = {
	title: "Dynamic fetching - NextJS 14 Image Gallery",
}

//tells next how often to refresh. 0 means revalidate every time (don't cache)
export const revalidate = 0

export default async function Page() {
	const response = await fetch(
		"https://api.unsplash.com/photos/random?client_id=" +
			process.env.UNSPLASH_ACCESS_KEY,
		{
			// cache: "no-cache" / "no-store", //same thing as the revalidate, but call-level customization
			// next: { revalidate: 0 }, //same thing, functionality built into next
		}
	)
	//it is safe to write api key here as this will only run on server, so user can't see the network call
	
	const image: UnsplashImage = await response.json()

	const width = Math.min(500, image.width)
	const height = Math.min((width / image.width) * image.height, image.height)

	return (
		<div className="d-flex flex-column align-items-center">
			<Alert>
                This page <strong>fetches data dynamically</strong>.
                Every time you refresh the page, you get a new image from the unsplash API
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
