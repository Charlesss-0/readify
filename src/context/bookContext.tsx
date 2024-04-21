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
	bookURL: string
	setBookURL: React.Dispatch<React.SetStateAction<string>>
	bookCover: Book[]
	setBookCover: React.Dispatch<React.SetStateAction<Book[]>>
}

const BookContext = createContext<BookContextValue | null>(null)

export function BookContextProvider({ children }: { children: React.ReactNode }) {
	const epubReader = new EpubReader()
	const [bookURL, setBookURL] = useState<string>('')
	const [bookCover, setBookCover] = useState<Book[]>([])

	const contextValue = {
		epubReader,
		bookURL,
		setBookURL,
		bookCover,
		setBookCover,
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
