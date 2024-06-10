import React from 'react'
import { fetchBookCollection } from './fetchBookCollection'

export const uploadFileToS3 = async (
	reader: BookReader,
	setBook: React.Dispatch<React.SetStateAction<Book[]>>,
	e: React.ChangeEvent<HTMLInputElement>
) => {
	const userUid = localStorage.getItem('userUid')
	if (!userUid) {
		alert('Please sign in to upload files')
		return
	}

	// set current file to upload
	const file = e.target.files?.[0]
	if (!file) {
		console.error('No file provided!')
		return
	}

	// check file type to allow only epub files
	if (file.type !== 'application/epub+zip') {
		alert('Only epub files are allowed')
		return
	}

	// set body form data
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
		fetchBookCollection(reader, setBook)
		console.log('File uploaded successfully!')
	} catch (e: any) {
		console.error('Error uploading file', e)
	}
}
