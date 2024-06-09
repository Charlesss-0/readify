'use client'

import React, { createContext, useContext, useState } from 'react'

import { Reader } from '../lib'

interface BookReaderType {
	renderBook: (bookURL: string) => Promise<void>
	getBookTitle: () => string
	getBookCover: () => string
}

interface BookContextValue {
	reader: BookReaderType
	book: Book[]
	setBook: React.Dispatch<React.SetStateAction<Book[]>>
	bookURL: string
	setBookURL: React.Dispatch<React.SetStateAction<string>>
}

const BookContext = createContext<BookContextValue | null>(null)

export function BookContextProvider({ children }: { children: React.ReactNode }) {
	const reader = new Reader()
	const [book, setBook] = useState<Book[]>([])
	const [bookURL, setBookURL] = useState<string>('')

	const contextValue = {
		reader,
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
