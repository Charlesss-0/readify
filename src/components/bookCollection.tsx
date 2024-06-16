'use client'

import Link from 'next/link'
import styled from 'styled-components'
import { useBookContext } from '@/src/context/bookContext'

const Cover = styled.div`
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	border-radius: 0.5rem;
	box-shadow: 1px 1px 1rem 0 #000a;
	margin-bottom: 2rem;
`

export default function BookCollection() {
	const { book } = useBookContext()

	const handleBookSelection = (id: string) => {
		localStorage.setItem('bookId', id)
	}

	return (
		<div className="flex flex-wrap w-full items-start justify-around gap-[5%] p-[1rem]">
			{book && (
				<>
					{book.map(book => (
						<Link
							key={book.id}
							href={`/book/${book.title.replace(/\s+/g, '_')}`}
							onClick={() => handleBookSelection(book.id)}
						>
							<Cover
								className="w-[260px] h-[400px] md:w-[140px] md:h-[210px]"
								style={{
									backgroundImage: `url(${book.cover})`,
								}}
							/>
						</Link>
					))}
				</>
			)}
		</div>
	)
}
