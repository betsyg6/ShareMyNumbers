import React from 'react';
import * as ROUTES from '../../Constants/routes';
import { Nav, Navbar } from 'react-bootstrap';

const Navigation = () => (
	<Navbar bg='dark' variant='dark' expand='md'>
		<Navbar.Brand>Share My Numbers</Navbar.Brand>
		<Navbar.Toggle aria-controls='basic-navbar-nav' />
		<Nav>
			<Nav.Item as='li'>
				<Nav.Link href={ROUTES.HOME}>Home</Nav.Link>
			</Nav.Item>
			<Nav.Item as='li'>
				<Nav.Link href={ROUTES.BOOTCAMPS}>Bootcamps</Nav.Link>
			</Nav.Item>
		</Nav>
	</Navbar>
);

export default Navigation;
