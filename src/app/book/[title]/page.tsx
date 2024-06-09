'use client'

import type { Contents, Rendition } from 'epubjs'
import { useEffect, useRef, useState } from 'react'

import { ReactReader } from 'react-reader'
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

	useEffect(() => {
		const bookId = localStorage.getItem('bookId')

		if (bookId) {
			const fetchBooks = async () => {
				try {
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
		if (rendition.current && location === null) {
			rendition.current.display().then(() => {
				const initialLocation = rendition.current?.location.start.index
				setLocation(initialLocation!)
			})
		}
	}, [location])

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
						rendition.current.themes.fontSize('120%')
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
