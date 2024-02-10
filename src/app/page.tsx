import { Alert } from "@/components/bootstrap";

export default function Home() {
  return <div>
    <Alert>
      <p>
        This is a sample project to showcase and learn the new <strong>NextJS 14</strong>
      </p>
      <ul>
        <li>static and dynamic server-side rendering</li>
        <li>incremental static regeneration</li>
        <li>client-side rendering</li>
        <li>route handlers (API endpoints)</li>
        <li>Meta-data API</li>
        <li>and more...</li>
      </ul>
      <p className="mb-0">
        Every page uses a different approach to <strong>fetching and caching images</strong>
      </p>
      <Alert variant="secondary" className="mt-2">
        <p>Note: In order to run this application locally, you need to get an Unsplash access key</p>
        <p className="mb-0">Unplash has a free tier of 50 requests/hour</p>
      </Alert>
    </Alert>
  </div>
}
