'use client'

import { RootState, authSlice } from '@/src/lib'
import { useDispatch, useSelector } from 'react-redux'

import { User } from 'firebase/auth'
import { setCurrentUserState } from '@/src/utils'
import { useAppContext } from '@/src/context'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
	const router = useRouter()
	const dispatch = useDispatch()
	const { setUser } = authSlice.actions
	const { currentUser } = useSelector((state: RootState) => state.auth)
	const { firebaseAuth } = useAppContext()

	const handleGoogleSignIn = async () => {
		try {
			const user: User | null = await firebaseAuth.signInWithGoogle()

			if (user) {
				setCurrentUserState(user, (user: AuthState) =>
					dispatch(setUser(user.currentUser))
				)
			}
		} catch (error) {
			console.error('Error signing in with Google:', error)
		}
	}

	useEffect(() => {
		const checkCurrentUser = async () => {
			await firebaseAuth.getCurrentUser(router)
		}
		checkCurrentUser()
	}, [currentUser])

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="flex flex-col items-center bg-white p-8 rounded shadow-md">
				<h2 className="text-2xl font-bold mb-4 text-gray-500">Login</h2>
				<button onClick={handleGoogleSignIn} className="btn btn-primary">
					Sign in with Google
				</button>
			</div>
		</div>
	)
}
