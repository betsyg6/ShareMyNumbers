import app from 'firebase/app';
import 'firebase/database';

const config = {
	apiKey: process.env.REACT_APP_API_KEY,
	databaseName: process.env.REACT_APP_DATABASE_NAME,
	databaseURL: process.env.REACT_APP_DATABASE_URL,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_APP_ID,
	measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

class Firebase {
	constructor() {
		app.initializeApp(config);
		this.db = app.database();
	}

	//bootcamp class api
	bootcamp = (bootcampId) => this.db.ref(`bootcamps/${bootcampId}`);
	bootcamps = () => this.db.ref(`bootcamps`);

	//offer api
	offersInClass = (bootcampId) => this.db.ref(`offers/${bootcampId}`);
	addOffer = (bootcampId) => this.db.ref(`offers/${bootcampId}`);
}

export default Firebase;
