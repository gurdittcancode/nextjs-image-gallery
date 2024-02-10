"use client"

import { UnsplashImage } from "@/models/unsplash-image"
import Image from "next/image"
import { FormEvent, useState } from "react"
import { Alert, Button, Form, Spinner } from "react-bootstrap"
import styles from "./SearchPage.module.css"

export const SearchPage = () => {
	const [searchResults, setSearchResults] = useState<UnsplashImage[] | null>(null)
	const [loading, setLoading] = useState(false)
	const [loadingError, setLoadingError] = useState(false)

	async function handleSubmit(ev: FormEvent<HTMLFormElement>) {
		ev.preventDefault()
		const formData = new FormData(ev.target as HTMLFormElement)
		const query = formData.get("query")?.toString().trim()

		if (query) {
			// alert(process.env.UNSPLASH_ACCESS_KEY)
			//here, the api key will be 'undefined' for the client (nextjs security)
			//if you want to explicitly show something to client, do NEXT_PUBLIC_UNPLASH_ACCESS_KEY in env file

			try {
				setSearchResults(null)
				setLoading(true)
				setLoadingError(false)
				const response = await fetch("/api/search?query=" + query)
				const images: UnsplashImage[] = await response.json()
				setSearchResults(images)
			} catch (error) {
				console.error(error)
				setLoadingError(true)
			} finally {
				setLoading(false)
			}
		}
	}

	return (
		<div>
            <Alert>
                This page fetches data <strong>client-side</strong>. In order to not leak
                API credentials, the request is sent to a NextJS <strong>router handler</strong>
                that runs on the server. This route handler then fetches the data from the 
                Unsplash API and returns it to the client.
            </Alert>
			<Form onSubmit={handleSubmit}>
				<Form.Group className="mb-3" controlId="search-input">
					<Form.Label>Search query</Form.Label>
					<Form.Control name="query" placeholder="E.g. cats, hotdogs..." />
				</Form.Group>
				<Button type="submit" className="mb-3" disabled={loading}>
					Search
				</Button>
			</Form>

			<div className="d-flex flex-column align-items-center">
				{loading && <Spinner animation="border" />}
                {loadingError && <p>Something went wrong. Please try again...</p>}
                {searchResults?.length === 0 && <p>Nothing found for that search term ☹️</p>}
			</div>

            {searchResults && (
                <>
                {searchResults.map(image => <Image 
                    src={image.urls.raw}
                    width={250}
                    height={250}
                    alt={image.description}
                    key={image.urls.raw}
                    className={styles.image}/>
                )}
                </>
            )}
		</div>
	)
}
