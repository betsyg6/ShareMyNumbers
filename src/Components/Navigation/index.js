import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../Constants/routes';

const Navigation = () => (
	<div>
		<ul>
			<li>
				<Link to={ROUTES.LANDING}>Landing</Link>
			</li>

			<li>
				<Link to={ROUTES.BOOTCAMPS}>Bootcamps</Link>
			</li>
		</ul>
	</div>
);

export default Navigation;
