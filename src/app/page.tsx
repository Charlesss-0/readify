'use client'

import { Add, Bookshelf } from '@/components'

import { FireStorage } from '@/firebase'
import React from 'react'

export default function Home() {
	const fireStorage = new FireStorage()

	const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			await fireStorage.upload(file)
		}
	}

	return (
		<div className="p-[1rem]">
			<h1 className="text-[2rem] font-bold p-[1rem] text-center">My Library</h1>
			<Bookshelf />

			<Add onFileChange={onFileChange} />
		</div>
	)
}
