import supabase from './supabase'

export default class SupaStorage {
	constructor() {
		this.insert = this.insert.bind(this)
	}

	async insert(file: File): Promise<void> {
		const fileName = crypto.randomUUID() + file.name.substring(file.name.lastIndexOf('.'))

		const { data, error } = await supabase.storage.from('books').upload(fileName, file)

		if (error) {
			console.error('Failed to upload:', error)
		} else {
			console.log('Upload completed successfully:', data)
		}
	}
}
