import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from '../Navigation';
import Main from '../Main';
import * as ROUTES from '../../Constants/routes';
import ListOffers from '../Offers/DisplayOffers';
import BootcampsMain from '../Offers/BootcampsMain';
import ListClasses from '../Offers/DisplayClasses';

const App = () => {
	return (
		<Router>
			<div>
				<Navigation />

				<Route exact path={ROUTES.HOME} component={Main} />
				<Route exact path={ROUTES.BOOTCAMPS} component={BootcampsMain} />
				<Route exact path={ROUTES.CLASSES} component={ListClasses} />
				<Route path={ROUTES.OFFERS} component={ListOffers} />
			</div>
		</Router>
	);
};

export default App;
