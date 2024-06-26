// class for methods to interact with s3 from the client

import React from 'react'
import Reader from '../epubjs/reader'

export default class AWSClient {
	private reader = new Reader()

	constructor() {
		this.getBooks = this.getBooks.bind(this)
		this.uploadFile = this.uploadFile.bind(this)
	}

	// get a list for the current books in s3 bucket depending on the user's uid stored in local storage
	public getBooks(): Promise<Book[] | null> {
		return new Promise(async (resolve, reject) => {
			const userUid = localStorage.getItem('userUid')
			if (!userUid) {
				console.error('User UID not defined')
				reject()
			}

			try {
				const response = await fetch(`/api/books?userUid=${userUid}`, {
					method: 'GET',
				})
				if (!response.ok) {
					console.error('Failed to fetch books', response)
					reject()
				}
				const data = await response.json()

				const books: Book[] = await Promise.all(
					data.map(async (book: any) => {
						await this.reader.renderBook(book.Url)

						const cover = this.reader.getBookCover()
						const title = this.reader.getBookTitle()

						return { url: book.Url, cover, title, id: book.Key }
					})
				)

				resolve(books)
			} catch (e) {
				console.error('Error fetching books', e)
				reject(e)
			}
		})
	}

	// append current file and userUID to the POST method body for the api/books route handler to upload files to s3
	public async uploadFile(e: React.ChangeEvent<HTMLInputElement>): Promise<void> {
		const userUid = localStorage.getItem('userUid')
		if (!userUid) {
			alert('Please sign in to upload files')
			return
		}

		const file = e.target.files?.[0]
		if (!file) {
			alert('No file provided!')
			return
		}

		if (file.type !== 'application/epub+zip') {
			alert('Only epub files are allowed')
			return
		}

		const formData = new FormData()
		formData.append('file', file)
		formData.append('userUid', userUid)

		try {
			const response = await fetch('/api/books', {
				method: 'POST',
				body: formData,
			})

			if (!response.ok) {
				console.error('Failed to upload file')
			}

			alert('File uploaded successfully!')
		} catch (e: any) {
			console.error('Error uploading file', e)
		}
	}
}
