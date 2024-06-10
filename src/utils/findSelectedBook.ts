import React from 'react'

export const findSelectedBook = async (
	bookId: string,
	setBookURL: React.Dispatch<React.SetStateAction<string>>
) => {
	const userUid = localStorage.getItem('userUid')
	if (!userUid) {
		console.error('Sign in to see your books')
		return
	}

	try {
		const response = await fetch(`/api/books?userUid=${userUid}`, {
			method: 'GET',
		})
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
