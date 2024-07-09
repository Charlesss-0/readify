// src/types/global.d.ts
import { User } from 'firebase/auth'
import { ReactNode } from 'react'

// describres the structure of the Reader, AWSClient, and FirebaseAuth classes
declare global {
	interface BookReader {
		renderBook: (bookURL: string) => Promise<void>
		getBookTitle: () => string
		getBookCover: () => string
	}

	interface AWSInstance {
		getBooks: () => Promise<Book[] | null>
		uploadFile: (e: React.ChangeEvent<HTMLInputElement>) => void
		removeObject: (bookToDelete: string) => Promise<Book[] | null>
	}

	interface FirebaseAuthInstance {
		signInWithGoogle: () => Promise<User | null>
		logOut: () => Promise<void>
		getCurrentUser: (router: AppRouterInstance) => Promise<User | null>
	}
}

// Describes the structure of a book in the application
declare global {
	interface Book {
		id: string
		url: string
		cover: string
		title: string
	}
}

// Describes the structure of a file stored in S3
declare global {
	interface S3File {
		Key: string
		LastModified: string
		ETag: string
		Size: number
		StorageClass: string
		Url: string
	}
}

// Describes the authentication state in the application
declare global {
	interface AuthState {
		currentUser: {
			uid: string
			displayName: string
			email: string
			photoURL: string
		} | null
	}
}
