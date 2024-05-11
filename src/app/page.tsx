'use client'

import { Add, Bookshelf } from '@/components'

import React from 'react'

export default function Home() {
	const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			try {
				console.log('Hello')
			} catch (e: any) {
				console.error('Error uploading file:', e)
			}
		}
	}

	return (
		<main className="min-h-screen p-[1rem]">
			<h1 className="text-[2rem] font-bold p-[1rem] text-center">My Library</h1>
			<Bookshelf />

			<Add onFileChange={onFileChange} />
		</main>
	)
}
