'use client'

import { Add, Bookshelf } from '@/components'
import { FireDatabase, FireStorage } from '@/firebase'
import React, { useEffect, useState } from 'react'

import { useBookContext } from '@/context/bookContext'

export default function Home() {
	const fireStorage = new FireStorage()
	const fireDatabase = new FireDatabase()

	const { epubReader, setBookURL, setBookCover } = useBookContext()

	const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			const url = await fireStorage.uploadAndGetURL(file)

			setBookURL(url)
		}
	}

	useEffect(() => {
		const renderBooks = async () => {
			const books = await fireStorage.getList()

			books.forEach(async url => {
				await epubReader.renderBook(url)
				const cover = epubReader.getBookCover()

				await fireDatabase.add({ id: url, cover: cover })
			})
		}
		renderBooks()
	}, [])

	return (
		<div className="p-[1rem]">
			<h1 className="text-[2rem] font-bold p-[1rem] text-center">My Library</h1>
			<Bookshelf />

			<Add onFileChange={onFileChange} />
		</div>
	)
}
