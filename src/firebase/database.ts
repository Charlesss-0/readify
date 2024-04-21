import { get, getDatabase, onValue, orderByChild, push, query, ref } from 'firebase/database'

import Initialize from './initialize'

interface DataType {
	cover: string
	id: string
}

export default class FireDatabase extends Initialize {
	private db: ReturnType<typeof getDatabase>

	constructor() {
		super()
		this.init()
		this.db = getDatabase()
		this.add = this.add.bind(this)
		this.read = this.read.bind(this)
	}

	public async add(value: DataType): Promise<void> {
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

	public async read(): Promise<Book[]> {
		const dbRef = ref(this.db, 'books/')

		return new Promise((resolve, reject) => {
			onValue(
				dbRef,
				snapshot => {
					const data = snapshot.val()
					if (data) {
						const result = Object.values(data)
						resolve(result as Book[])
					} else {
						resolve([])
					}
				},
				error => reject(error)
			)
		})
	}
}
