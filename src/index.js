import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App';
import 'bootstrap/dist/css/bootstrap.min.css';

import Firebase, { FirebaseContext } from './Components/Firebase';

ReactDOM.render(
	<FirebaseContext.Provider value={new Firebase()}>
		<div>
			<App />
		</div>
	</FirebaseContext.Provider>,
	document.getElementById('root')
);
