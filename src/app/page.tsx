'use client'

import { AddBtn, Bookshelf } from '@/components'
import React, { useEffect } from 'react'

import { FireStorage } from '@/firebase'
import { useBookContext } from '@/context/bookContext'

export default function Home() {
	const fireStorage = new FireStorage()

	const { bookViewer, setBookURL, bookURL, setBookCover } = useBookContext()

	const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			const url = await fireStorage.uploadAndGetURL(file)
			setBookURL(url)
		}
	}

	useEffect(() => {
		const loadBook = async (): Promise<void> => {
			if (bookURL) {
				await bookViewer.renderBook(bookURL)

				const cover = bookViewer.getBookCover()
				setBookCover(cover)
			}
		}

		loadBook()
	}, [bookURL])

	return (
		<div className="p-[1rem]">
			<h1 className="text-[2rem] font-bold p-[1rem] text-center">My Library</h1>
			<Bookshelf />

			<AddBtn onFileChange={onFileChange} />
		</div>
	)
}
