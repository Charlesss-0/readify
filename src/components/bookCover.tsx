import { EpubReader } from '@/src/lib'
import Link from 'next/link'
import styled from 'styled-components'
import { useBookContext } from '@/src/context/bookContext'
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
	const epubReader = new EpubReader()
	const { book, setBook } = useBookContext()

	async function fetchBooks() {
		try {
			const response = await fetch('/api/books')
			if (!response.ok) {
				console.error('Failed to fetch books', response)
			}
			const data = await response.json()

			const bookData = await Promise.all(
				data.map(async (book: any) => {
					await epubReader.renderBook(book.Url)
					const cover = epubReader.getBookCover()
					const title = epubReader.getBookTitle()

					return { url: book.Url, cover, title, id: book.Key }
				})
			)

			setBook(bookData)
		} catch (error: any) {
			console.error('Failed to load book', error)
		}
	}

	useEffect(() => {
		fetchBooks()
	}, [])

	const handleAdd = (id: string) => {
		localStorage.setItem('bookId', id)
	}

	return (
		<div className="flex items-center justify-around gap-[4rem] h-[450px] p-[0.5rem]">
			{book && (
				<>
					{book.map(book => (
						<Link key={book.url} href="/book" onClick={() => handleAdd(book.id)}>
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
