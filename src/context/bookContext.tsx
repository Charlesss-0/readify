'use client'

import React, { createContext, useContext, useState } from 'react'

import { EpubReader } from '../lib'

interface EpubReaderType {
	renderBook: (file: string) => Promise<void>
	onKeyDown: (event: KeyboardEvent) => void
	next: () => Promise<void>
	previous: () => Promise<void>
	getBookTitle: () => string
	getBookCover: () => string
	setViewerRef: (ref: React.RefObject<HTMLDivElement>) => void
	getViewerRef: () => React.RefObject<HTMLDivElement>
}

interface BookContextValue {
	epubReader: EpubReaderType
	book: Book[]
	setBook: React.Dispatch<React.SetStateAction<Book[]>>
	bookURL: string
	setBookURL: React.Dispatch<React.SetStateAction<string>>
}

const BookContext = createContext<BookContextValue | null>(null)

export function BookContextProvider({ children }: { children: React.ReactNode }) {
	const epubReader = new EpubReader()
	const [book, setBook] = useState<Book[]>([])
	const [bookURL, setBookURL] = useState<string>('')

	const contextValue = {
		epubReader,
		book,
		setBook,
		bookURL,
		setBookURL,
	}

	return <BookContext.Provider value={contextValue}>{children}</BookContext.Provider>
}

export function useBookContext(): BookContextValue {
	const context = useContext(BookContext)
	if (!context) {
		throw new Error('useBookContext must be used within a ContextProvider')
	}
	return context
}
