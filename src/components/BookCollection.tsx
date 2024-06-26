'use client'

import { BsThreeDotsVertical } from 'react-icons/bs'
import DropdownContent from './ui/dropdownContent'
import { GrFavorite } from 'react-icons/gr'
import { HiDownload } from 'react-icons/hi'
import Link from 'next/link'
import { LuTrash } from 'react-icons/lu'
import { RootState } from '@/src/lib'
import { devices } from '../constants'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

const Collection = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	justify-content: center;
	gap: 2rem;
	width: 100%;
	padding: 1rem;
	margin-top: 5rem;

	@media only screen and ${devices.md} {
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		gap: 1rem;
		font-size: 0.9rem;
	}
`

const BookItem = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-bottom: 2rem;
`

const Cover = styled.div`
	aspect-ratio: 1/1.5;
	border-radius: 1rem;
	box-shadow: 1px 1px 1rem 0 #000a;
	overflow: hidden;

	& > img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`

export default function BookCollection() {
	const { book } = useSelector((state: RootState) => state.book)
	const bookOptions = [
		{
			item: 'Add to favorites',
			icon: <GrFavorite />,
		},
		{
			item: 'Download',
			icon: <HiDownload />,
		},
		{
			item: 'Delete',
			icon: <LuTrash />,
		},
	]

	const handleBookSelection = (url: string) => {
		localStorage.setItem('bookUrl', url)
	}

	return (
		<Collection>
			{book && book.length > 0 ? (
				<>
					{book.map(book => (
						<BookItem key={book.id}>
							<Link
								href={`/book/${book.title.replace(/\s+/g, '_')}`}
								onClick={() => handleBookSelection(book.url)}
							>
								<Cover>
									<img src={`${book.cover}`} alt={`${book.title}`} loading="lazy" />
								</Cover>
							</Link>

							<div className="w-full flex items-center pt-3">
								<h1 className="w-full text-center font-bold whitespace-nowrap text-ellipsis overflow-hidden">
									{book.title}
								</h1>

								<div className="dropdown dropdown-end">
									<div
										role="button"
										tabIndex={0}
										className="p-2 rounded-full hover:bg-neutral active:scale-95"
									>
										<BsThreeDotsVertical className="h-5 w-5" />
									</div>

									<ul className="dropdown-content w-52">
										<DropdownContent items={bookOptions} />
									</ul>
								</div>
							</div>
						</BookItem>
					))}
				</>
			) : (
				<h1>Add books...</h1>
			)}
		</Collection>
	)
}
