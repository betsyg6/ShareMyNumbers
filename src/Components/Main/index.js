import React from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import * as ROUTES from '../../Constants/routes';

//this page might end up getting deleted
const Main = () => {
	return (
		<Jumbotron>
			<h1>Welcome to Share My Numbers</h1>
			<p>
				Share My Numbers is a place for bootcamp grads to share their offers
				anonymously.
			</p>
			<p>
				<Button href={ROUTES.BOOTCAMPS} variant='primary'>
					Enter
				</Button>
			</p>
		</Jumbotron>
	);
};

export default Main;
