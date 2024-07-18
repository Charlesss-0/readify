declare global {
	interface FavoriteBook {
		userUid: string
		key: string
		title: string
	}
}

export default class MongoClient {
	constructor() {
		this.getBooks = this.getBooks.bind(this)
		this.addToFavorites = this.addToFavorites.bind(this)
	}

	public getBooks(): Promise<FavoriteBook[] | null> {
		return new Promise(async (resolve, reject) => {
			const userUid = localStorage.getItem('userUid')

			if (!userUid) {
				console.error('User UID is not defined')
				reject(null)
			}

			try {
				const response = await fetch(`/api/favorites?userUid=${userUid}`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				})

				if (!response.ok) {
					console.error('Failed to fetch books', response)
					reject(null)
				}

				const data = await response.json()
				resolve(data)
			} catch (error) {
				console.error('Unable to fetch books:', error)
				reject(null)
			}
		})
	}

	public async addToFavorites(books: Book[] | null): Promise<void> {
		const userUid = localStorage.getItem('userUid')

		if (!userUid) {
			console.log('User UID is not defined')
			return
		}

		if (!books) {
			console.log('No books array provided')
			return
		}

		const book = books[0]
		const document: FavoriteBook = {
			userUid: userUid,
			key: book.id,
			title: book.title,
		}

		try {
			const response = await fetch('/api/favorites', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(document),
			})
			if (!response.ok) {
				console.error('Failed to upload file')
				return
			}
		} catch (error: any) {
			console.log('Unable to add to favorites:', error)
		}
	}
}
