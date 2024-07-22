declare global {
	interface FavoriteBook {
		userUid: string
		key: string
		title: string
	}
}

export default class MongoClient {
	constructor() {
		this.getFavorites = this.getFavorites.bind(this)
		this.addToFavorites = this.addToFavorites.bind(this)
		this.removeFavorite = this.removeFavorite.bind(this)
	}

	public getFavorites(): Promise<FavoriteBook[] | null> {
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

		if (!userUid || !books) {
			console.log('User UID or books array is not defined')
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
				headers: {
					'Content-Type': 'application/json',
				},
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

	public async removeFavorite(bookId: string): Promise<void> {
		const userUid = localStorage.getItem('userUid')

		if (!userUid || !bookId) {
			console.log('User UID or book key is not defined')
			return
		}

		try {
			const response = await fetch(`/api/favorites?userUid=${userUid}&bookId=${bookId}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			})
			if (!response.ok) {
				const errorData = await response.json()
				console.error('Failed to delete file:', errorData)
				return
			}
		} catch (error) {
			console.error('Unable to remove from favorites:', error)
		}
	}
}
