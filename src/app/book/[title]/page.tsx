'use client'

import { useEffect, useRef } from 'react'

import { EpubReader } from '@/src/lib'
import styled from 'styled-components'

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
	const epubReader = useRef(new EpubReader())
	const viewerRef = useRef<HTMLDivElement>(null)
	const bookURL = typeof window !== 'undefined' ? localStorage.getItem('book') : null

	const displayBook = async () => {
		try {
			if (bookURL) {
				await epubReader.current.renderBook(bookURL)

				if (viewerRef.current) {
					if (viewerRef.current !== epubReader.current.getViewerRef()?.current) {
						epubReader.current.setViewerRef(viewerRef)
					}
				}
			} else {
				console.log('No book url was found!')
			}
		} catch (e) {
			console.error(e)
		}
	}

	useEffect(() => {
		displayBook()
		const onKeyDown = async (e: KeyboardEvent) => {
			epubReader.current.onKeyDown(e)
		}

		window.addEventListener('keydown', onKeyDown)

		return () => {
			window.removeEventListener('keydown', onKeyDown)
		}
	}, [bookURL])

	const onNext = async () => {
		await epubReader.current.next()
	}

	const onPrevious = async () => {
		await epubReader.current.previous()
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
