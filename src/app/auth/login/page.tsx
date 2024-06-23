'use client'

import {
	GoogleAuthProvider,
	User,
	browserLocalPersistence,
	setPersistence,
	signInWithPopup,
} from 'firebase/auth'

import { firebaseAuth } from '@/src/app/api/config/firebaseConfig'
import { setUser } from '@/src/lib/features/authslice'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { verifyCurrentUser } from '@/src/utils'

export default function LoginPage() {
	const dispatch = useDispatch()
	const router = useRouter()
	const provider = new GoogleAuthProvider()

	const handleGoogleSignIn = async () => {
		try {
			const auth = firebaseAuth
			await setPersistence(auth, browserLocalPersistence)
			const result = await signInWithPopup(auth, provider)
			dispatch(setUser(result.user as User))
		} catch (error) {
			console.error('Error signing in with Google', error)
		}
	}

	useEffect(() => {
		verifyCurrentUser(router, '/')
	}, [])

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
