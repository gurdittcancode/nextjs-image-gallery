export default async function Page() {
	await new Promise((resolve) => setTimeout(resolve, 1000))
	//   throw new Error('AHHHHH')
	return <div>Hello NextJS!</div>
}
