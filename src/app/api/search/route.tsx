//YOU CAN ALSO CONNECT THIS TO AN EXPRESS BACKEND

//must be called route.tsx, otherwise it won't be recognised as api route

import { UnsplashSearchResponse } from "@/models/unsplash-image"
import { NextResponse } from "next/server"

//follow this convention!

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url)
	const query = searchParams.get("query")

	if (!query) {
		//it's a response type, but it extends the functionality
		return NextResponse.json({ error: "No query provided" }, { status: 400 })
	}

	const response = await fetch(
		`https://api.unsplash.com/search/photos?query=${query}&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
	)
	const { results }: UnsplashSearchResponse = await response.json()

	return NextResponse.json(results)
}
