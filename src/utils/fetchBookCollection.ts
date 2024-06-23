import React from 'react'

// fetch book collection to be rendered on the home page and set loading state
export const fetchBookCollection = async (
	userUid: string,
	reader: BookReader,
	setBook: React.Dispatch<React.SetStateAction<Book[]>>,
	setIsBookLoading: React.Dispatch<React.SetStateAction<boolean>>
): Promise<void> => {
	try {
		setIsBookLoading(true)

		const response = await fetch(`/api/books?userUid=${userUid}`, {
			method: 'GET',
		})
		if (!response.ok) {
			console.error('Failed to fetch books', response)
			return
		}
		const data = await response.json()

		const books = await Promise.all(
			data.map(async (book: any) => {
				await reader.renderBook(book.Url)

				const cover = reader.getBookCover()
				const title = reader.getBookTitle()

				return { url: book.Url, cover, title, id: book.Key }
			})
		)
		if (!books) {
			console.error('No books found')
			setIsBookLoading(false)
			return
		}

		setBook(books)

		setIsBookLoading(false)
	} catch (error: any) {
		console.error('Error fetching books:', error)
	}
}
