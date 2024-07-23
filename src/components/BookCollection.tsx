'use client'

import { AppDispatch, appSlice, bookSlice } from '@/src/lib'
import { devices, theme } from '../constants'

import { BsThreeDotsVertical } from 'react-icons/bs'
import { CiHeart } from 'react-icons/ci'
import Empty from '@/src/assets/images/home/empty'
import Link from 'next/link'
import styled from 'styled-components'
import { useAppContext } from '../context'
import { useDispatch } from 'react-redux'

interface BookActions {
	text: string
	icon: JSX.Element
	action: () => Promise<void>
}

interface BookCollectionProps {
	books: Book[] | null
	emptyMessage: string
	bookActions?: BookActions[]
}

const Collection = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(200px, 250px));
	justify-content: space-around;
	align-items: start;
	width: 100%;
	height: 100vh;
	padding: 1rem;
	padding-top: 5rem;

	@media only screen and ${devices.md} {
		grid-template-columns: repeat(auto-fill, minmax(150px, 150px));
		justify-content: space-around;
		gap: 1rem;
		font-size: 0.9rem;
	}
`

const BookItem = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
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

	@media only screen and ${devices.md} {
		border-radius: 0.5rem;
	}
`

const IconWrapper = styled.div`
	cursor: pointer;
	border-radius: 50%;
	padding: 3px;

	&:hover > svg {
		fill: red;
	}
`

export default function BookCollection({ books, emptyMessage, bookActions }: BookCollectionProps) {
	const { mongoClient } = useAppContext()
	const dispatch = useDispatch<AppDispatch>()
	const { setBookId } = bookSlice.actions
	const { setFileState } = appSlice.actions

	const handleBookSelection = (url: string) => {
		localStorage.setItem('bookUrl', url)
	}

	const handleFavoriteRemoval = async (bookId: string) => {
		try {
			await mongoClient.removeFavorite(bookId)
			dispatch(setFileState('book removed from favorites'))
		} catch (error) {
			console.error('Error removing book from favorites', error)
		}
	}

	return (
		<Collection>
			{books && books.length > 0 ? (
				<>
					{books.map(book => (
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
								<h1 className="w-full text-center px-1 text-neutral font-bold whitespace-nowrap text-ellipsis overflow-hidden">
									{book.title}
								</h1>

								{bookActions ? (
									<div className="dropdown dropdown-end">
										<div
											role="button"
											tabIndex={0}
											className="p-2 rounded-full transition-all duration-200 hover:bg-secondary-content"
											onClick={() => dispatch(setBookId(book.id))}
										>
											<BsThreeDotsVertical className="h-5 w-5 text-neutral" />
										</div>

										<ul
											tabIndex={0}
											className="dropdown-content w-max absolute mt-3 flex flex-col p-2 rounded-lg bg-base-200 select-none border border-neutral"
										>
											{bookActions.map((item: any, index: number) => (
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
								) : (
									<>
										<IconWrapper onClick={async () => await handleFavoriteRemoval(book.id)}>
											<CiHeart className="w-8 h-8" />
										</IconWrapper>
									</>
								)}
							</div>
						</BookItem>
					))}
				</>
			) : (
				<div className="bg-base-100 w-full h-screen flex flex-col items-center justify-end absolute top-0 left-0">
					<h1 className="text-neutral text-[1.5rem] p-12">{emptyMessage}</h1>
					<Empty className="w-[50%]" />
				</div>
			)}
		</Collection>
	)
}
