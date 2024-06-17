'use client'

import React, { useRef } from 'react'

import { uploadFileToS3 } from '@/src/utils'

export default function UploadBtn(): React.ReactElement {
	const inputRef = useRef<HTMLInputElement>(null)

	return (
		<div className="flex-1 flex justify-center items-end">
			<input
				ref={inputRef}
				id="file"
				type="file"
				accept=".epub"
				onChange={e => uploadFileToS3(e)}
				className="m-[1rem] hidden"
			/>
			<button
				type="button"
				onClick={() => inputRef.current?.click()}
				className="btn btn-secondary w-full sm:btn-sm md:btn-md"
			>
				Upload Book
			</button>
		</div>
	)
}
