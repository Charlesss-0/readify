'use client'

import type { Contents, Rendition } from 'epubjs'
import { useEffect, useRef, useState } from 'react'

import { ReactReader } from 'react-reader'
import useLocalStorageState from 'use-local-storage-state'

export default function Book() {
	const [currentBook, setCurrentBook] = useState<string>('')
	const [location, setLocation] = useLocalStorageState<string | number | null>(
		'current-book-location',
		{
			defaultValue: 0,
		}
	)
	const rendition = useRef<Rendition | undefined>(undefined)

	const getBookUrl = async () => {
		try {
			const bookUrl = localStorage.getItem('bookUrl')

			if (!bookUrl) {
				console.error('No book url has been defined')
				return
			}

			setCurrentBook(bookUrl)
		} catch (error: any) {
			console.error('Error reading book', error.message)
		}
	}

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
		const setBookState = async () => {
			await getBookUrl()
			setFontSize()
		}
		setBookState()

		window.addEventListener('resize', setFontSize)

		return () => window.removeEventListener('resize', setFontSize)
	}, [])

	return (
		<>
			<div className="h-screen">
				<ReactReader
					url={currentBook}
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
