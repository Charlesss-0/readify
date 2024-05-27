import { FirebaseApp, initializeApp } from 'firebase/app'

export default class Initialize {
	constructor() {
		this.init = this.init.bind(this)
	}

	public init(): FirebaseApp {
		const config = {
			apiKey: 'AIzaSyDsTYHZ366HSLzKk5qy7FWhrFMILLdzv6E',
			authDomain: 'e-reader-12e0e.firebaseapp.com',
			databaseURL: 'https://e-reader-12e0e-default-rtdb.firebaseio.com/',
			storageBucket: 'e-reader-12e0e.appspot.com',
			projectId: 'e-reader-12e0e',
			messagingSenderId: '434023833895',
			appId: '1:434023833895:web:50c9e96ee1df9e2c5d4902',
			measurementId: 'G-T8MY734XBZ',
		}

		return initializeApp(config)
	}
}
