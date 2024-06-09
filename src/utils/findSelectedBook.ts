import React from 'react'

export const findSelectedBook = async (
	bookId: string,
	setBookURL: React.Dispatch<React.SetStateAction<string>>
) => {
	try {
		const response = await fetch('/api/books')
		if (!response.ok) {
			console.error('Failed to fetch books', response)
			return
		}
		const data = await response.json()

		const book = data.find((b: any) => bookId === b.Key)
		if (!book) {
			console.error('No matching book found')
			return
		}
		setBookURL(book.Url)
	} catch (error: any) {
		console.error('Error fetching book url: ', error)
	}
}
