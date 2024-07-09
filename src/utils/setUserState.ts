import { User } from 'firebase/auth'

// set the current uid to local storage and set the current user data to redux store
export function setCurrentUserState(
	user: User | null,
	setUser: (user: AuthState) => void
) {
	const data: AuthState = {
		currentUser: {
			uid: user?.uid as string,
			displayName: user?.displayName as string,
			email: user?.email as string,
			photoURL: user?.photoURL as string,
		},
	}

	localStorage.setItem('userUid', data.currentUser?.uid as string)
	setUser(data)
}
