'use client'

import { useEffect, useRef } from 'react'

import { FireDatabase } from '@/firebase'
import styled from 'styled-components'
import { useBookContext } from '@/context/bookContext'

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
	margin: 2rem;

	z-index: 1;
`

export default function Book() {
	const fireDatabase = new FireDatabase()
	const { epubReader, bookId } = useBookContext()
	const viewerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const loadBook = async () => {
			const book = await fireDatabase.getBook(bookId)
			if (book) {
				await epubReader.renderBook(book.url)
			}

			if (viewerRef.current) {
				if (viewerRef.current !== epubReader.getViewerRef()?.current) {
					epubReader.setViewerRef(viewerRef)
				}
			}
		}
		loadBook()

		const onKeyDown = async (e: KeyboardEvent) => {
			epubReader.onKeyDown(e)
		}

		window.addEventListener('keydown', onKeyDown)

		return () => {
			window.removeEventListener('keydown', onKeyDown)
		}
	}, [bookId])

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
