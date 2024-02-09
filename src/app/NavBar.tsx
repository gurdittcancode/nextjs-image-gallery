"use client"

import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Container, Nav, Navbar } from "react-bootstrap" //because this is client component

export const NavBar = () => {
	const pathname = usePathname() //to get URL

	return (
		<Navbar
			bg="primary"
			variant="dark"
			sticky="top"
			expand="sm"
			collapseOnSelect>
			<Container>
				{/* combining next/link and bootstrap links */}
				<Navbar.Brand as={Link} href="/">
					NextJS 14 Image Gallery
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="main-navbar" />
				<Navbar.Collapse id="main-navbar">
					<Nav>
						<Nav.Link as={Link} href="/static" active={pathname === "/static"}>
							Static
						</Nav.Link>
						<Nav.Link as={Link} href="/dynamic" active={pathname === "/dynamic"}>
							Dynamic
						</Nav.Link>
						<Nav.Link as={Link} href="/isr" active={pathname === "/isr"}>
							ISR
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}
