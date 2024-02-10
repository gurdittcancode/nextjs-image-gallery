import { UnsplashImage } from "@/models/unsplash-image"
import Image from "next/image"
import styles from "./topic.module.css"
import { Alert } from "@/components/bootstrap"
import { Metadata } from "next"

//you have to follow this convention. nextjs automatically picks up the value of 'topic'
interface PageProps {
	params: { topic: string }
}

export function generateMetadata({params: {topic}}: PageProps): Metadata {
    return {
        title: topic + " - NextJS 14 Image Gallery"
    }
}

// export const dynamicParams = false //can only access static params in build mode

//this data is fetched during build time, function name has to be this only
export function generateStaticParams() {
	return ["health", "fitness", "coding"].map((topic) => ({ topic }))
}

export default async function Page({ params: { topic } }: PageProps) {
	const response = await fetch(
		`https://api.unsplash.com/photos/random?query=${topic}&count=30&client_id=${process.env.UNSPLASH_ACCESS_KEY}`,
		{
			// next: { revalidate: 0 },
		}
	)

	const images: UnsplashImage[] = await response.json()

	return (
		<div>
			<Alert>
				This page uses <strong>generateStaticParams</strong> to render and cache
				static pages at build time, even though the URL has a dynamic parameter.
				Pages that are not included in generateStaticParams will be fetched &
				rendered on first access and then{" "}
				<strong>cached for subsequent requests</strong> (which can be disabled)
			</Alert>
			<h1>{topic}</h1>
			{images.map((image) => (
				<Image
					src={image.urls.raw}
					width={250}
					height={250}
					alt={image.description}
					key={image.urls.raw}
					className={styles.image}
				/>
			))}
		</div>
	)
}
