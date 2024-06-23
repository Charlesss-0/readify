// src/types/global.d.ts
import { ReactNode } from 'react'

declare global {
	interface Book {
		id: string
		url: string
		cover: string
		title: string
	}

	interface S3File {
		Key: string
		LastModified: string
		ETag: string
		Size: number
		StorageClass: string
		Url: string
	}

	interface BookReader {
		renderBook: (bookURL: string) => Promise<void>
		getBookTitle: () => string
		getBookCover: () => string
	}

	interface ItemOption {
		item: string
		icon: ReactNode
		action?: () => void
	}
}
