'use client'

import { type AppDispatch, type RootState, appSlice, authSlice, bookSlice } from '@/src/lib'
import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useAppContext } from '../context'
import { useRouter } from 'next/navigation'
import { setCurrentUserState } from '../utils'
import { User } from 'firebase/auth'

export default function AppStateManager({ children }: { children: React.ReactNode }) {
	const router = useRouter()
	const dispatch = useDispatch<AppDispatch>()
	const { setAppState } = appSlice.actions
	const { alert } = useSelector((state: RootState) => state.app)
	const { currentUser } = useSelector((state: RootState) => state.auth)
	const { setUser } = authSlice.actions
	const { setBooks, clearBooks, setFavorites, clearFavorites } = bookSlice.actions
	const { books } = useSelector((state: RootState) => state.book)
	const { awsClient, firebaseAuth, mongoClient } = useAppContext()

	const verifyAndSetUserState = useCallback(async () => {
		try {
			const user: User | null = await firebaseAuth.getCurrentUser(router)

			if (user) {
				setCurrentUserState(user, (user: AuthState) => dispatch(setUser(user.currentUser)))
			}
		} catch (e) {
			console.error('No user signed in', e)
		}
	}, [dispatch])

	const fetchBooks = useCallback(async () => {
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

	const fetchFavorites = useCallback(async () => {
		try {
			const favoriteBooks: FavoriteBook[] | null = await mongoClient.getFavorites()

			if (favoriteBooks && books) {
				const favoriteBookIds = favoriteBooks.map(favorite => favorite.key)
				const bookList: Book[] | null = books.filter(book => favoriteBookIds.includes(book.id))

				dispatch(setFavorites(bookList))
			}
		} catch (error) {
			console.log('Unable to fetch favorites:', error)
			dispatch(clearFavorites())
		}
	}, [dispatch, books])

	useEffect(() => {
		if (
			books ||
			(alert.type === 'success' && alert.message === 'Book added to favorites') ||
			(alert.type === 'success' && alert.message === 'Book removed from favorites')
		) {
			fetchFavorites()
		}
	}, [books, alert])

	return <>{children}</>
}
