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
		this.db = app.database();
	}

	//bootcamp class api
	class = (classId) => this.db.ref(`classes/${classId}`);
	classes = () => this.db.ref(`classes`);

	//offer api
	offersInClass = (classId) => this.db.ref(`offers/${classId}`);
	addOffer = (classId) => this.db.ref(`offers/${classId}`);
}

export default Firebase;
