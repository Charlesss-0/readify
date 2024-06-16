'use client'

import { BsThreeDotsVertical } from 'react-icons/bs'
import Link from 'next/link'
import styled from 'styled-components'
import { useBookContext } from '@/src/context/bookContext'

const Collection = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1rem));
	justify-content: center;
	gap: 2rem;
	width: 100%;
	padding: 1rem;
	margin-top: 5rem;

	@media (max-width: 600px) {
		grid-template-columns: repeat(auto-fit, minmax(150px, 1rem));
		gap: 1rem;
		font-size: 0.7rem;
	}
`

const Cover = styled.div`
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	border-radius: 0.5rem;
	box-shadow: 1px 1px 2rem 0 #000a;
`

export default function BookCollection() {
	const { book } = useBookContext()

	const handleBookSelection = (id: string) => {
		localStorage.setItem('bookId', id)
	}

	return (
		<Collection>
			{book && (
				<>
					{book.map(book => (
						<div
							key={book.id}
							className="card grid justify-items-center bg-[#efefef2f] p-3 mb-5"
						>
							<Link
								href={`/book/${book.title.replace(/\s+/g, '_')}`}
								onClick={() => handleBookSelection(book.id)}
							>
								<Cover
									className="w-[260px] h-[400px] md:w-[120px] md:h-[180px]"
									style={{
										backgroundImage: `url(${book.cover})`,
									}}
								/>
							</Link>
							<div className="flex items-center justify-between w-full p-3">
								<h1>{book.title}</h1>
								<BsThreeDotsVertical />
							</div>
						</div>
					))}
				</>
			)}
		</Collection>
	)
}
