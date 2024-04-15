'use client'

import React, { createContext, useContext, useState } from 'react'

import { BookViewer } from '../lib'

interface BookViewerType {
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
	bookViewer: BookViewerType
	bookURL: string
	setBookURL: React.Dispatch<React.SetStateAction<string>>
	bookCover: string
	setBookCover: React.Dispatch<React.SetStateAction<string>>
}

const BookContext = createContext<BookContextValue | null>(null)

export function BookContextProvider({ children }: { children: React.ReactNode }) {
	const bookViewer = new BookViewer()
	const [bookURL, setBookURL] = useState<string>('')
	const [bookCover, setBookCover] = useState<string>('')

	const contextValue = {
		bookViewer,
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
