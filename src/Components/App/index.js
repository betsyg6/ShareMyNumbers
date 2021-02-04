import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from '../Navigation';
import Main from '../Main';
import * as ROUTES from '../../Constants/routes';
import ListOffers from '../Offers/DisplayOffers';
import BootcampsMain from '../Offers/BootcampsMain';
import ListClasses from '../Offers/DisplayClasses';
import { Jumbotron, Button } from 'react-bootstrap';

const App = () => {
	const [toggle, setToggle] = useState(false);
	return (
		<div>
			{!toggle ? (
				<Jumbotron>
					<h1>Welcome to Share My Numbers</h1>
					<p>
						Share My Numbers is a place for bootcamp grads to share their offers
						anonymously.
					</p>
					<p>
						<Button onClick={() => setToggle(true)} variant='primary'>
							Enter
						</Button>
					</p>
				</Jumbotron>
			) : (
				<Router>
					<div>
						<h1>Share my Numbers</h1>
						<Navigation />

						<Route exact path={ROUTES.BOOTCAMPS} component={BootcampsMain} />
						<Route exact path={ROUTES.CLASSES} component={ListClasses} />
						<Route path={ROUTES.OFFERS} component={ListOffers} />
					</div>
				</Router>
			)}
		</div>
	);
};

export default App;
