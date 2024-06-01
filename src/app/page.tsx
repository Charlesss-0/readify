'use client'

import { Bookshelf, UploadBtn } from '@/src/components'

import React from 'react'

export default function Home() {
	return (
		<main className="min-h-screen p-[1rem]">
			<h1 className="text-[2rem] font-bold p-[1rem] text-center">My Library</h1>
			<Bookshelf />

			<UploadBtn />
		</main>
	)
}
