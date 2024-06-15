'use client'

import Link from 'next/link'
import { fetchBookCollection } from '@/src/utils'
import styled from 'styled-components'
import { useBookContext } from '../context/bookContext'
import { useEffect } from 'react'

const Cover = styled.div`
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	border-radius: 0.5rem;
	box-shadow: 1px 1px 1rem 0 #000a;
`

export default function BookCollection() {
	const { reader } = useBookContext()
	const { book, setBook } = useBookContext()

	const handleAdd = (id: string) => {
		localStorage.setItem('bookId', id)
	}

	// useEffect(() => {
	// 	fetchBookCollection(reader, setBook)
	// }, [])

	return (
		<div className="flex flex-wrap w-full items-start justify-around gap-[5%] p-[1rem]">
			{book && (
				<>
					{book.map(book => (
						<Link
							key={book.id}
							href={`/book/${book.title.replace(/\s+/g, '_')}`}
							onClick={() => handleAdd(book.id)}
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
