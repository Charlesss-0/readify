'use client'

import { AppDispatch, RootState, bookSlice } from '@/src/lib'
import { devices, theme } from '../constants'
import { useDispatch, useSelector } from 'react-redux'

import { BsThreeDotsVertical } from 'react-icons/bs'
import Empty from '@/src/assets/images/home/empty'
import { GrFavorite } from 'react-icons/gr'
import { HiDownload } from 'react-icons/hi'
import Link from 'next/link'
import { LuTrash } from 'react-icons/lu'
import styled from 'styled-components'
import { useAppContext } from '../context'
import { useState } from 'react'

const Collection = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	align-items: start;
	gap: 2rem;
	width: 100%;
	height: 100vh;
	padding: 1rem;
	padding-top: 5rem;

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
	border: 1.5px solid ${theme.neutral};
	overflow: hidden;

	& > img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`

export default function BookCollection() {
	const { awsClient } = useAppContext()
	const dispatch = useDispatch<AppDispatch>()
	const { book } = useSelector((state: RootState) => state.book)
	const { setBooks } = bookSlice.actions
	const [bookToDelete, setBookToDelete] = useState<string>('')

	const bookOptions = [
		{
			text: 'Add to favorites',
			icon: <GrFavorite />,
			action: () => {},
		},
		{
			text: 'Download',
			icon: <HiDownload />,
		},
		{
			text: 'Delete',
			icon: <LuTrash />,
			action: async () => {
				try {
					await awsClient.removeObject(bookToDelete)
					alert('File deleted successfully')
				} catch (e) {
					console.error('Error deleting book', e)
				}
			},
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
								<h1 className="w-full text-center text-neutral font-bold whitespace-nowrap text-ellipsis overflow-hidden">
									{book.title}
								</h1>

								<div className="dropdown dropdown-end">
									<div
										role="button"
										tabIndex={0}
										className="p-2 rounded-full transition-all duration-200 hover:bg-secondary-content"
										onClick={() => setBookToDelete(book.id.replace(/^[^/]+\//, ''))}
									>
										<BsThreeDotsVertical className="h-5 w-5 text-neutral" />
									</div>

									<ul
										tabIndex={0}
										className="dropdown-content w-max absolute mt-3 flex flex-col p-2 rounded-lg bg-base-200 select-none border border-neutral"
									>
										{bookOptions.map((item: any, index: number) => (
											<li
												key={index}
												onClick={item.action}
												className="flex items-center gap-2 p-2 rounded-md transition-all duration-200 cursor-pointer hover:bg-secondary-content text-primary active:scale-[0.98]"
											>
												{item.icon}
												{item.text}
											</li>
										))}
									</ul>
								</div>
							</div>
						</BookItem>
					))}
				</>
			) : (
				<div className="bg-base-100 w-full h-screen flex flex-col items-center justify-end absolute top-0 left-0">
					<h1 className="text-neutral text-[1.5rem] p-12">Your library is empty</h1>
					<Empty className="w-[50%]" />
				</div>
			)}
		</Collection>
	)
}
