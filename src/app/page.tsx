'use client'

import { BookCollection, UploadBtn } from '@/src/components'

import React from 'react'

export default function Home() {
	return (
		<main className="h-screen">
			<BookCollection />

			<UploadBtn />
		</main>
	)
}
