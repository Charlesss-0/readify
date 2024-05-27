import {
	get,
	getDatabase,
	onValue,
	orderByChild,
	push,
	query,
	ref,
} from 'firebase/database'

import Initialize from './initialize'

export default class FireDatabase extends Initialize {
	private db: ReturnType<typeof getDatabase>

	constructor() {
		super()
		this.init()
		this.db = getDatabase()
		this.add = this.add.bind(this)
		this.getBook = this.getBook.bind(this)
	}

	public async add(value: Book): Promise<void> {
		const dbRef = ref(this.db, 'books/')

		try {
			const nodeQuery = query(dbRef, orderByChild('id'))
			const snapshot = await get(nodeQuery)

			const data = snapshot.val() || {}
			if (value) {
				const idExists = Object.values(data).some((item: any) => item.id === value.id)

				if (!idExists) {
					console.log('Sending data to database')

					await push(dbRef, value)

					console.log('Data sent to database successfully')
				} else {
					return
				}
			}
		} catch (e: any) {
			console.error('Error adding data:', e.message)
		}
	}

	public async getBook(id: string): Promise<Book | null> {
		const dbRef = ref(this.db, 'books/')

		return new Promise((resolve, reject) => {
			onValue(
				dbRef,
				snapshot => {
					const data = snapshot.val()
					if (data) {
						const result = Object.values(data) as Book[]
						const book = result.find(book => book.id === id)
						resolve(book || null)
					} else {
						resolve(null)
					}
				},
				error => reject(error)
			)
		})
	}
}
