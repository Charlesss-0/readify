'use client'

import { useEffect, useRef, useState } from 'react'

import styled from 'styled-components'
import { useBookContext } from '@/src/context/bookContext'

const BookView = styled.div`
	background-color: #f8f6e3;
	width: 100%;
	height: 100vh;
	overflow: auto;
	position: relative;

	&::-webkit-scrollbar {
		display: none;
	}

	& > div::-webkit-scrollbar {
		display: none;
	}
`

const BtnContainer = styled.div`
	position: fixed;
	top: 0;
	height: 100vh;
	transition: all 0.5s;

	display: flex;
	align-items: center;
	opacity: 0;
	z-index: 1;

	&:hover {
		opacity: 1;
	}
`

const Button = styled.button`
	color: #2f2f2f;
	font-size: 2.5rem;
	margin: 0.5rem;

	z-index: 1;
`

export default function Book() {
	const { epubReader } = useBookContext()
	const viewerRef = useRef<HTMLDivElement>(null)
	const [bookURL, setBookURL] = useState<string>('')

	useEffect(() => {
		const bookId = localStorage.getItem('bookId')

		if (bookId) {
			const fetchBooks = async () => {
				try {
					if (bookURL) {
						await epubReader.renderBook(bookURL)

						if (viewerRef.current !== epubReader.getViewerRef()?.current) {
							epubReader.setViewerRef(viewerRef)
						}
					}

					const response = await fetch('/api/books')
					if (!response.ok) {
						console.error('Failed to fetch books', response)
						return
					}
					const data = await response.json()

					const book = data.find((b: any) => bookId === b.Key)
					if (!book) {
						console.error('No matching book found')
						return
					}
					setBookURL(book.Url)
				} catch (error: any) {
					console.error('Error fetching book url: ', error)
				}
			}
			fetchBooks()
		}
	}, [bookURL])

	useEffect(() => {
		const onKeyDown = async (e: KeyboardEvent) => {
			epubReader.onKeyDown(e)
		}

		window.addEventListener('keydown', onKeyDown)

		return () => {
			window.removeEventListener('keydown', onKeyDown)
		}
	}, [])

	const onNext = async () => {
		await epubReader.next()
	}

	const onPrevious = async () => {
		await epubReader.previous()
	}

	return (
		<>
			<BookView ref={viewerRef} id="viewer">
				<BtnContainer className="left-0">
					<Button type="button" onClick={onPrevious} className="left-[1rem]">
						<i className="fi fi-rr-arrow-circle-left"></i>
					</Button>
				</BtnContainer>

				<BtnContainer className="right-0">
					<Button type="button" onClick={onNext} className="right-[1rem]">
						<i className="fi fi-rr-arrow-circle-right"></i>
					</Button>
				</BtnContainer>
			</BookView>
		</>
	)
}
