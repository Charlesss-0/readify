import { getDownloadURL, getStorage, listAll, ref, uploadBytesResumable } from 'firebase/storage'

import Initialize from './initialize'

export default class FireStorage extends Initialize {
	private storage: ReturnType<typeof getStorage>

	constructor() {
		super()
		this.init()
		this.storage = getStorage()
		this.upload = this.upload.bind(this)
		this.getList = this.getList.bind(this)
	}

	public async upload(file: File): Promise<string> {
		const storageRef = ref(this.storage, `books/${file.name}`)

		try {
			console.log('uploading ' + file.name)

			await uploadBytesResumable(storageRef, file)
			const url = await getDownloadURL(storageRef)

			console.log('File uploaded successfully')

			return url
		} catch (e: any) {
			console.error('Error uploading file', e.message)
			throw e
		}
	}

	public async getList(): Promise<string[]> {
		const listRef = ref(this.storage, 'books/')

		try {
			const items = await listAll(listRef)
			const fileUrls: string[] = []

			await Promise.all(
				items.items.map(async item => {
					const url = await getDownloadURL(item)
					fileUrls.push(url)
				})
			)

			return fileUrls
		} catch (e) {
			console.error(e)
			throw e
		}
	}
}
