// fetch book collection to be rendered on the home page
export const fetchBooks = async (
	reader: BookReader,
	setBook: React.Dispatch<React.SetStateAction<Book[]>>
) => {
	try {
		const response = await fetch('/api/books')
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
			return
		}

		setBook(books)
	} catch (error: any) {
		console.error('Failed to load books', error)
	}
}
