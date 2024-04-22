import { FireStorage } from '@/firebase'
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
	overflow: hidden;
	border-radius: 0.5rem;
	box-shadow: 1px 1px 1rem 0 #000a;
`

export default function BookCover() {
	const fireStorage = new FireStorage()
	const { epubReader, book, setBook, setBookURL } = useBookContext()

	useEffect(() => {
		const loadBookCover = async () => {
			try {
				const books = await fireStorage.getList()

				const bookData = await Promise.all(
					books.map(async url => {
						await epubReader.renderBook(url)
						const cover = epubReader.getBookCover()

						return { id: url, cover: cover }
					})
				)

				setBook(bookData)
			} catch (e: any) {
				console.error('Error loading book cover:', e.message)
			}
		}
		loadBookCover()
	}, [])

	const handleClick = (url: string) => {
		setBookURL(url)
	}

	return (
		<div className="flex items-center justify-around gap-[4rem] h-[450px] p-[0.5rem]">
			{book ? (
				<>
					{book.map(book => (
						<Link href="/book" key={book.id} onClick={() => handleClick(book.id)}>
							<Cover
								key={book.id}
								style={{
									backgroundImage: `url('${book.cover}')`,
								}}
							/>
						</Link>
					))}
				</>
			) : null}
		</div>
	)
}
