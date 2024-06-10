import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { User } from 'firebase/auth'
import { firebaseAuth } from '@/server/config/firebaseConfig'

// check if user is logged in so they can be redirected to the home page
export const verifyCurrentUser = async (router: AppRouterInstance, path: string) => {
	const auth = firebaseAuth
	try {
		auth.onAuthStateChanged((user: User | null) => {
			if (user) {
				router.push(path)
			}
		})
	} catch (error: any) {
		console.error('Unable to locate user', error)
	}
}
