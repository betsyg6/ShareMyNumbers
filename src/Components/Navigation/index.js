import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../Constants/routes';
import { Nav } from 'react-bootstrap';

const Navigation = () => (
	<Nav>
		<Nav.Item as='li'>
			<Nav.Link href={ROUTES.LANDING}>Landing</Nav.Link>
		</Nav.Item>
		<Nav.Item as='li'>
			<Nav.Link href={ROUTES.BOOTCAMPS}>Bootcamps</Nav.Link>
		</Nav.Item>
	</Nav>
);

export default Navigation;
