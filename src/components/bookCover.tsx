import { FireDatabase, FireStorage } from '@/firebase'

import Link from 'next/link'
import styled from 'styled-components'
import { useBookContext } from '@/context/bookContext'
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
	const fireStorage = new FireStorage()
	const fireDatabse = new FireDatabase()
	const { epubReader, book, setBook, setBookId } = useBookContext()

	useEffect(() => {
		const loadBookCover = async () => {
			try {
				const books = await fireStorage.getList()

				const bookData = await Promise.all(
					books.map(async url => {
						await epubReader.renderBook(url)
						const cover = epubReader.getBookCover()
						const title = epubReader.getBookTitle()

						return { url: url, cover: cover, title: title, id: url }
					})
				)

				setBook(bookData)
			} catch (e: any) {
				console.error('Error loading book:', e.message)
			}
		}
		loadBookCover()
	}, [])

	const handleAdd = async ({ url, id, title }: Book) => {
		await fireDatabse.add({ url, id, title })
		setBookId(id)
	}

	return (
		<div className="flex items-center justify-around gap-[4rem] h-[450px] p-[0.5rem]">
			{book && (
				<>
					{book.map(book => (
						<Link
							key={book.url}
							href={`/book/${book.title.replace(/\s+/g, '')}`}
							onClick={() => handleAdd({ url: book.url, id: book.id, title: book.title })}
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
