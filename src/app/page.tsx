'use client'

import { BookCover, Bookshelf, UploadBtn } from '@/src/components'

import React from 'react'

export default function Home() {
	return (
		<main className="min-h-screen p-[1rem]">
			<BookCover />

			<UploadBtn />
		</main>
	)
}
