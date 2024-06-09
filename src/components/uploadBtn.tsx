import React, { useRef } from 'react'

import { FaFileCirclePlus } from 'react-icons/fa6'

export default function UploadBtn(): React.ReactElement {
	const inputRef = useRef<HTMLInputElement>(null)

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (!file) {
			console.error('No file provided!')
			return
		}
		if (file.type !== 'application/epub+zip') {
			console.error('Only epub files are allowed')
			alert('Only epub files are allowed')
			return
		}

		const formData = new FormData()
		formData.append('file', file)

		try {
			const response = await fetch('/api/books', {
				method: 'POST',
				body: formData,
			})
			if (!response.ok) {
				console.error('Failed to upload file')
			}
			await response.json()
		} catch (e: any) {
			console.error('Error uploading file', e)
		}
	}

	return (
		<div className="fixed bottom-[1rem] right-[1rem]">
			<input
				ref={inputRef}
				id="file"
				type="file"
				onChange={handleFileChange}
				className="m-[1rem] hidden"
			/>
			<button
				type="button"
				onClick={() => inputRef.current?.click()}
				className="btn btn-neutral sm:btn-sm md:btn-md"
			>
				Upload Book
			</button>
		</div>
	)
}
