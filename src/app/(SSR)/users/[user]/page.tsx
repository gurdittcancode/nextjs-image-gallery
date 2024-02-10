import { UnsplashUser } from "@/models/unsplash-user"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { Alert } from "@/components/bootstrap"

interface PageProps {
	params: { user: string }
}

async function getUser(username: string): Promise<UnsplashUser> {
	const response = await fetch(
		`https://api.unsplash.com/users/${username}?client_id=${process.env.UNSPLASH_ACCESS_KEY}`
	)
	if (response.status === 404) notFound()
	return await response.json()
}

export async function generateMetadata({
	params: { user },
}: PageProps): Promise<Metadata> {
	// const response = await fetch(
	// 		`https://api.unsplash.com/users/${user}?client_id=${process.env.UNSPLASH_ACCESS_KEY}`
	// 	)
	//this isn't wasted, nextjs reuses results of duplicate calls. ONLY WORKS ON FETCH
	/*
        const getUserCashed = cache(getUser) - use this if not using fetch
    */

	const foundUser = await getUser(user)

	return {
		title: `@${foundUser.username} - NextJS 14 Image Gallery`,
	}
}

export default async function Page({ params: { user } }: PageProps) {
	const foundUser = await getUser(user)

	return (
		<div>
			<Alert>
				This profile page uses <strong>generateMetadata</strong> to set the page
				title dynamically from the API response
			</Alert>
			<h1>{foundUser.username}</h1>
			<p>First name: {foundUser.first_name}</p>
			<p>Last name: {foundUser.last_name}</p>
			<a href={`https://unsplash.com/${foundUser.username}`}>
				View Unsplash profile
			</a>
		</div>
	)
}
