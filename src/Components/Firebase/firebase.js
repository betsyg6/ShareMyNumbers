import app from 'firebase/app';
import 'firebase/database';

const config = {
	apiKey: process.env.REACT_APP_API_KEY,
	databaseName: process.env.REACT_APP_DATABASE_NAME,
	databaseURL: process.env.REACT_APP_DATABASE_URL,
};

class Firebase {
	constructor() {
		app.initializeApp(config);
	}
}

export default Firebase;
