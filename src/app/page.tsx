'use client'

import { Add, Bookshelf } from '@/components'

import { FireStorage } from '@/firebase'
import React from 'react'
import { supabase } from '@/supabase'

export default function Home() {
	const fireStorage = new FireStorage()

	const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			try {
				// upload file to firebase storage
				await fireStorage.upload(file)

				// upload file to supabase storage
				const fileName = `${file.name.substring(file.name.lastIndexOf('.'))}`
				await supabase.storage.from('books').upload(fileName, file)
			} catch (e: any) {
				console.error('Error uploading file:', e.mesaage)
			}
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
