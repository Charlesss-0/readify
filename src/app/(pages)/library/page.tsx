'use client'

import { AppDispatch, RootState, appSlice, bookSlice } from '@/src/lib'
import { useDispatch, useSelector } from 'react-redux'

import { BookCollection } from '@/src/components'
import { GrFavorite } from 'react-icons/gr'
import { HiDownload } from 'react-icons/hi'
import { LuTrash } from 'react-icons/lu'
import { useAppContext } from '@/src/context'

export default function LibraryPage() {
	const { books } = useSelector((state: RootState) => state.book)
	const { mongoClient, awsClient } = useAppContext()
	const dispatch = useDispatch<AppDispatch>()
	const { setFileState } = appSlice.actions
	const { setBooks } = bookSlice.actions
	const { bookId } = useSelector((state: RootState) => state.book)

	const bookActions = [
		{
			text: 'Add to favorites',
			icon: <GrFavorite />,
			action: async () => {
				try {
					if (!books || !bookId) {
						console.error('Undefined books array or book id')
						return
					}

					const bookObj: Book[] | null = books.filter(
						book => bookId.replace(/^[^/]+\//, '') === book.id.replace(/^[^/]+\//, '')
					)

					if (bookObj) {
						await mongoClient.addToFavorites(bookObj)
						dispatch(setFileState('added to favorites'))
					}
				} catch (error) {
					console.log('Unable to add book to favorites', error)
				}
			},
		},
		{
			text: 'Download',
			icon: <HiDownload />,
			action: async () => {
				try {
					if (!books || !bookId) {
						console.error('Undefined books array or book id')
						return
					}

					const bookObj: Book[] | null = books.filter(
						book => bookId.replace(/^[^/]+\//, '') === book.id.replace(/^[^/]+\//, '')
					)

					if (bookObj) {
						const url = bookObj[0].url
						const title = bookObj[0].title

						await awsClient.downloadFile(title, url)
					}

					dispatch(setFileState('downloaded'))
				} catch (error) {
					console.log('Unable to download file:', error)
				}
			},
		},
		{
			text: 'Delete',
			icon: <LuTrash />,
			action: async () => {
				try {
					if (!books || !bookId) {
						console.error('Undefined books array or book id')
						return
					}

					await awsClient.removeObject(bookId.replace(/^[^/]+\//, ''))

					dispatch(setFileState('deleted'))

					const newBookList: Book[] | null = books.filter(
						book => book.id.replace(/^[^/]+\//, '') !== bookId.replace(/^[^/]+\//, '')
					)

					if (newBookList) {
						dispatch(setBooks(newBookList))
					}

					await mongoClient.removeFavorite(bookId)
				} catch (e) {
					console.error('Error deleting book', e)
				}
			},
		},
	]

	return (
		<BookCollection
			books={books}
			emptyMessage={'Your library is empty'}
			bookActions={bookActions}
		/>
	)
}
