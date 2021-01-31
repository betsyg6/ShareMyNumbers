import React from 'react';
import { Jumbotron, Button } from 'react-bootstrap';

const Landing = () => {
	return (
		<Jumbotron>
			<h1>Welcome to Share My Numbers</h1>
			<p>
				Share My Numbers is a place for bootcamp grads to share their offers
				anonymously.
			</p>
			<p>
				<Button variant='primary'>Enter</Button>
			</p>
		</Jumbotron>
	);
};

export default Landing;
