'use client'

import {
	type AppDispatch,
	type RootState,
	appSlice,
	authSlice,
	bookSlice,
} from '@/src/lib'
import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useAppContext } from '../context'
import { useRouter } from 'next/navigation'
import { setCurrentUserState } from '../utils'
import { User } from 'firebase/auth'

export default function AppStateManager({ children }: { children: React.ReactNode }) {
	const router = useRouter()
	const dispatch = useDispatch<AppDispatch>()
	const { currentUser } = useSelector((state: RootState) => state.auth)
	const { awsClient, firebaseAuth } = useAppContext()
	const { setAppState } = appSlice.actions
	const { setUser } = authSlice.actions
	const { setBooks, clearBooks } = bookSlice.actions

	const verifyAndSetUserState = useCallback(async () => {
		try {
			const user: User | null = await firebaseAuth.getCurrentUser(router)

			if (user) {
				setCurrentUserState(user, (user: AuthState) =>
					dispatch(setUser(user.currentUser))
				)
			}
		} catch (e) {
			console.error('No user signed in', e)
		}
	}, [dispatch])

	const fetchBooks = useCallback(async () => {
		dispatch(setAppState('loading'))

		try {
			const books: Book[] | null = await awsClient.getBooks()

			dispatch(setBooks(books))
		} catch (e) {
			console.error('Error fetching books in AppStateManager:', e)
			dispatch(clearBooks())
		} finally {
			dispatch(setAppState('ready'))
		}
	}, [dispatch])

	useEffect(() => {
		const initializeAppState = async () => {
			if (!currentUser) {
				await verifyAndSetUserState()
			} else {
				await fetchBooks()
			}
		}

		initializeAppState()
	}, [currentUser])

	return <>{children}</>
}
