'use client'

import { Bookshelf, UploadBtn } from '@/src/components'
import React, { useEffect, useState } from 'react'

interface S3File {
	Key: string
	LastModified: string
	Size: number
}

export default function Home() {
	const [files, setFiles] = useState<S3File[]>([])

	const fetchFiles = async () => {
		try {
			const response = await fetch('api/documents')

			if (!response.ok) {
				console.error('Failed to fetch files')
			}

			const result = await response.json()
			setFiles(result)
		} catch (e: any) {
			console.error('Error fetching files', e)
		}
	}

	useEffect(() => {
		fetchFiles()
	}, [])

	useEffect(() => {
		console.log(files)
	}, [files])

	return (
		<main className="min-h-screen p-[1rem]">
			<h1 className="text-[2rem] font-bold p-[1rem] text-center">My Library</h1>
			<Bookshelf />

			<UploadBtn />
		</main>
	)
}
