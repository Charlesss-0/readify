import {
	type User,
	browserLocalPersistence,
	getAuth,
	setPersistence,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	updateProfile,
	signInWithEmailAndPassword,
} from 'firebase/auth'

import { type AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { type FirebaseApp, initializeApp } from 'firebase/app'

export default class FirebaseAuth {
	private init: FirebaseApp
	private auth: ReturnType<typeof getAuth>
	private provider: GoogleAuthProvider
	private currentUser: User | null = null

	constructor() {
		this.init = this.initialize()
		this.auth = getAuth()
		this.provider = new GoogleAuthProvider()

		this.signInWithGoogle = this.signInWithGoogle.bind(this)
		this.logOut = this.logOut.bind(this)
		this.getCurrentUser = this.getCurrentUser.bind(this)
	}

	private initialize(): FirebaseApp {
		return initializeApp({
			apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY as string,
			authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN as string,
			databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL as string,
			projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
			storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET as string,
			messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID as string,
			appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID as string,
			measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID as string,
		})
	}

	public async signInWithGoogle(): Promise<User | null> {
		try {
			await setPersistence(this.auth, browserLocalPersistence)
			const result = await signInWithPopup(this.auth, this.provider)

			this.currentUser = result.user
			return this.currentUser
		} catch (e: any) {
			throw new Error(e)
		}
	}

	// create a user when signing up for the first time
	public async createUserWithEmailAndPassword(
		displayName: string,
		email: string,
		password: string
	): Promise<User | null> {
		try {
			await setPersistence(this.auth, browserLocalPersistence)
			const userCredential = await createUserWithEmailAndPassword(this.auth, email, password)

			this.currentUser = userCredential.user
			await updateProfile(this.currentUser, { displayName })

			return this.currentUser
		} catch (error: any) {
			throw new Error('Unable to Sign Up:', error)
		}
	}

	// sign in with already existing user email and password
	public async signInWithEmailAndPassword(email: string, password: string): Promise<User | null> {
		try {
			await setPersistence(this.auth, browserLocalPersistence)
			const userCredential = await signInWithEmailAndPassword(this.auth, email, password)

			this.currentUser = userCredential.user

			return this.currentUser
		} catch (error: any) {
			throw new Error('Unable to sign in:', error)
		}
	}

	public async logOut(): Promise<void> {
		try {
			await this.auth.signOut()
			this.currentUser = null
		} catch (e) {
			console.error('Error signing out:', e)
		}
	}

	// verify if the current user is signed in to return the user structure state
	// and redirect them to the home page or login page
	public getCurrentUser(router: AppRouterInstance): Promise<User | null> {
		return new Promise((resolve, reject) => {
			try {
				this.auth.onAuthStateChanged((user: User | null) => {
					if (!user) {
						router.push('/auth/register')
						resolve(null)
						return
					}

					router.push('/')
					this.currentUser = user
					resolve(this.currentUser)
				})
			} catch (e) {
				console.error('Error verifying user:', e)
				reject(null)
			}
		})
	}
}
