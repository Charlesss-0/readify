'use client'

import React, { useEffect } from 'react'
import { useAuthContext, useBookContext } from '../context'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '@/src/lib'
import type { User } from 'firebase/auth'
import { fetchBookCollection } from '@/src/utils'
import { firebaseAuth } from '@/src/app/api/config/firebaseConfig'
import { setUser } from '../lib/features/authslice'
import { useRouter } from 'next/navigation'

export default function AppStateManager({ children }: { children: React.ReactNode }) {
	const router = useRouter()
	const dispatch = useDispatch()
	const currentUser = useSelector((state: RootState) => state.auth.currentUser)
	const { reader, setBook, setIsBookLoading } = useBookContext()

	const setUserData = async () => {
		const auth = firebaseAuth
		try {
			auth.onAuthStateChanged((data: User | null) => {
				if (!data) {
					router.push('/auth/login')
					return
				}

				localStorage.setItem('userUid', data?.uid as string)
				dispatch(setUser(data))
			})
		} catch (e) {
			console.error('Unable to verify user', e)
		}
	}

	useEffect(() => {
		setUserData()
		if (currentUser) {
			fetchBookCollection(reader, setBook, setIsBookLoading)
		}
	}, [dispatch, currentUser])

	return <>{children}</>
}
