'use client'

import { AppDispatch, appSlice, bookSlice } from '@/src/lib'
import React, { useRef } from 'react'

import { useAppContext } from '@/src/context'
import { useDispatch } from 'react-redux'

export default function UploadBtn(): React.ReactElement {
	const inputRef = useRef<HTMLInputElement>(null)
	const { awsClient } = useAppContext()
	const dispatch = useDispatch<AppDispatch>()
	const { setBooks } = bookSlice.actions
	const { setAlert } = appSlice.actions

	const reFetchBooks = async () => {
		const newBooks: Book[] | null = await awsClient.getBooks()

		dispatch(setBooks(newBooks))
	}

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setAlert({ type: 'info', message: 'Uploading book' }))

		try {
			if (e.target.files) {
				await awsClient.uploadFile(e)
				await reFetchBooks()
			}

			dispatch(setAlert({ type: 'success', message: 'Book uploaded successfully' }))
		} catch (error) {
			console.error('Failed to upload file', error)
			dispatch(setAlert({ type: 'error', message: 'Unable to upload book' }))
		}
	}

	return (
		<>
			<div className="flex-1 flex justify-center items-end">
				<input
					ref={inputRef}
					id="file"
					type="file"
					accept=".epub"
					onChange={e => handleFileChange(e)}
					className="m-[1rem] hidden"
				/>
				<button
					type="button"
					onClick={() => inputRef.current?.click()}
					className="btn text-base-100 btn-secondary w-full sm:btn-sm md:btn-md"
				>
					Upload Book
				</button>
			</div>
		</>
	)
}
