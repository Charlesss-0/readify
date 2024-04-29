'use client'

import { Add, Bookshelf } from '@/components'

import React from 'react'
import { SupaStorage } from '@/supabase'

export default function Home() {
	const supaStorage = new SupaStorage()

	const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			try {
				supaStorage.insert(file)
			} catch (e: any) {
				console.error('Error uploading file:', e)
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
