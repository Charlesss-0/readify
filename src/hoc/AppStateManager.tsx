'use client'

import React, { useEffect } from 'react'
import { useAuthContext, useBookContext } from '../context'

import type { User } from 'firebase/auth'
import { fetchBookCollection } from '@/src/utils'
import { firebaseAuth } from '@/src/app/api/config/firebaseConfig'
import { useRouter } from 'next/navigation'

export default function AppStateManager({ children }: { children: React.ReactNode }) {
	const router = useRouter()
	const { setCurrentUser } = useAuthContext()
	const { reader, setBook, setIsBookLoading } = useBookContext()

	const setUserData = async () => {
		const auth = firebaseAuth
		try {
			auth.onAuthStateChanged((user: User | null) => {
				if (!user) {
					router.push('/auth/login')
					return
				}

				localStorage.setItem('userUid', user?.uid as string)
				setCurrentUser(user)
			})
		} catch (error: any) {
			console.error('Unable to verify user', error)
		}
	}

	useEffect(() => {
		setUserData()
		fetchBookCollection(reader, setBook, setIsBookLoading)
	}, [])

	return <>{children}</>
}
