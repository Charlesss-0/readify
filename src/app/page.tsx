'use client'

import { BookCollection, Header, Sidebar } from '@/src/components'
import React, { useEffect } from 'react'

import type { User } from 'firebase/auth'
import { firebaseAuth } from '@/server/config/firebaseConfig'
import { useBookContext } from '../context/bookContext'
import { useRouter } from 'next/navigation'

export default function Home() {
	const router = useRouter()
	const { setCurrentUser } = useBookContext()

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
	}, [])

	return (
		<>
			<Header />
			<Sidebar />
			<main className="h-screen">
				<BookCollection />
			</main>
		</>
	)
}
