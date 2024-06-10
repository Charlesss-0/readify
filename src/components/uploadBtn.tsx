'use client'

import React, { useRef } from 'react'

import { uploadFileToS3 } from '@/src/utils'
import { useBookContext } from '../context/bookContext'

export default function UploadBtn(): React.ReactElement {
	const { reader, setBook } = useBookContext()
	const inputRef = useRef<HTMLInputElement>(null)

	return (
		<div className="fixed bottom-[1rem] right-[1rem]">
			<input
				ref={inputRef}
				id="file"
				type="file"
				accept=".epub"
				onChange={e => uploadFileToS3(reader, setBook, e)}
				className="m-[1rem] hidden"
			/>
			<button
				type="button"
				onClick={() => inputRef.current?.click()}
				className="btn btn-neutral sm:btn-sm md:btn-md"
			>
				Upload Book
			</button>
		</div>
	)
}
