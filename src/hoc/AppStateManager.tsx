'use client'

import React, { useEffect } from 'react'

import type { User } from 'firebase/auth'
import { fetchBookCollection } from '@/src/utils'
import { firebaseAuth } from '@/src/app/api/config/firebaseConfig'
import { setUser } from '@/src/lib'
import { useBookContext } from '../context'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'

export default function AppStateManager({ children }: { children: React.ReactNode }) {
	const router = useRouter()
	const dispatch = useDispatch()
	const { reader, setBook, setIsBookLoading } = useBookContext()

	const setUserData = () => {
		const auth = firebaseAuth
		try {
			auth.onAuthStateChanged((data: User | null) => {
				if (!data) {
					router.push('/auth/login')
					return
				}

				const user = {
					uid: data.uid as string,
					displayName: data.displayName as string,
					email: data.email as string,
					photoURL: data.photoURL as string,
				}

				localStorage.setItem('userUid', data.uid as string)
				dispatch(setUser(user))
			})
		} catch (e) {
			console.error('Unable to verify user', e)
		}
	}

	useEffect(() => {
		setUserData()
		fetchBookCollection(reader, setBook, setIsBookLoading)
	}, [])

	return <>{children}</>
}
