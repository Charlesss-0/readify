import Link from 'next/link'
import { fetchBooks } from '@/src/utils'
import styled from 'styled-components'
import { useBookContext } from '../context/bookContext'
import { useEffect } from 'react'

const Cover = styled.div`
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	width: 180px;
	height: 280px;
	border-radius: 0.5rem;
	box-shadow: 1px 1px 1rem 0 #000a;
`

export default function BookCover() {
	const { reader } = useBookContext()
	const { book, setBook } = useBookContext()

	const handleAdd = (id: string) => {
		localStorage.setItem('bookId', id)
	}

	useEffect(() => {
		fetchBooks(reader, setBook)
	}, [])

	return (
		<div className="flex flex-wrap h-screen w-full items-start justify-around gap-[5%] p-[1rem] overflow-auto">
			{book && (
				<>
					{book.map(book => (
						<Link
							key={book.id}
							href={`/book/${book.title.replace(/\s+/g, '_')}`}
							onClick={() => handleAdd(book.id)}
						>
							<Cover
								className=""
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
