import { firebaseAuth } from '@/src/app/api/config/firebaseConfig'

export const signOut = async (): Promise<void> => {
	try {
		const auth = firebaseAuth
		auth.signOut()
	} catch (error: any) {
		console.error('Error signing out', error)
	}
}
