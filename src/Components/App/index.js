import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from '../Navigation';
import Landing from '../Landing';
import Main from '../Main';
import * as ROUTES from '../../Constants/routes';

const App = () => {
	return (
		<Router>
			<div>
				<Navigation />

				<Route exact path={ROUTES.LANDING} component={Landing} />
				<Route path={ROUTES.MAIN} component={Main} />
			</div>
		</Router>
	);
};

export default App;