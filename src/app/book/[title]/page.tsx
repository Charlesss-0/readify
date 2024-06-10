'use client'

import type { Contents, Rendition } from 'epubjs'
import { useEffect, useRef, useState } from 'react'

import { ReactReader } from 'react-reader'
import { findSelectedBook } from '@/src/utils'
import useLocalStorageState from 'use-local-storage-state'

export default function Book() {
	const [bookURL, setBookURL] = useState<string>('')
	const [location, setLocation] = useLocalStorageState<string | number | null>(
		'current-book-location',
		{
			defaultValue: null,
		}
	)
	const rendition = useRef<Rendition | undefined>(undefined)

	const setFontSize = () => {
		const screenWidth = window.innerWidth
		let fontSize

		if (screenWidth < 600) {
			fontSize = '80%'
		} else if (screenWidth >= 600 && screenWidth <= 900) {
			fontSize = '120%'
		} else {
			fontSize = '140%'
		}

		rendition.current?.themes.fontSize(fontSize)
	}

	useEffect(() => {
		const bookId = localStorage.getItem('bookId')
		if (!bookId) {
			console.error('No book id has been defined')
			return
		}
		findSelectedBook(bookId, setBookURL)
	}, [bookURL])

	useEffect(() => {
		if (rendition.current && location === null) {
			rendition.current.display().then(() => {
				const initialLocation = rendition.current?.location.start.cfi
				setLocation(initialLocation!)
			})
		}
	}, [location])

	useEffect(() => {
		setFontSize()
		window.addEventListener('resize', setFontSize)

		return () => window.removeEventListener('resize', setFontSize)
	}, [])

	return (
		<>
			<div className="h-screen">
				<ReactReader
					url={bookURL}
					location={location}
					locationChanged={(loc: string) => setLocation(loc)}
					epubOptions={{
						allowPopups: true,
						allowScriptedContent: true,
					}}
					getRendition={(_rendition: Rendition) => {
						rendition.current = _rendition
						setFontSize()
						_rendition.hooks.content.register((contents: Contents) => {
							// @ts-ignore - manager type is missing in epubjs Rendition
							_rendition.manager.container.style['scroll-behavior'] = 'smooth'
						})
					}}
				></ReactReader>
			</div>
		</>
	)
}
