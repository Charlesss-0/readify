import Link from 'next/link'
import styled from 'styled-components'
import { useBookContext } from '../context/bookContext'
import { useEffect } from 'react'

const Cover = styled.div`
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	width: 250px;
	height: 400px;
	border-radius: 0.5rem;
	box-shadow: 1px 1px 1rem 0 #000a;
`

export default function BookCover() {
	const { reader } = useBookContext()
	const { book, setBook } = useBookContext()

	const fetchBooks = async () => {
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

	const handleAdd = (id: string) => {
		localStorage.setItem('bookId', id)
	}

	useEffect(() => {
		fetchBooks()
	}, [])

	return (
		<div className="flex items-center justify-around gap-[4rem] h-[450px] p-[0.5rem]">
			{book && (
				<>
					{book.map(book => (
						<Link
							key={book.id}
							href={`/book/${book.title.replace(/\s+/g, '_')}`}
							onClick={() => handleAdd(book.id)}
						>
							<Cover
								style={{
									backgroundImage: `url('${book.cover}')`,
								}}
							/>
						</Link>
					))}
				</>
			)}
		</div>
	)
}
