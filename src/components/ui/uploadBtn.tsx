'use client'

import React, { useRef } from 'react'

import { useAppContext } from '@/src/context'

export default function UploadBtn(): React.ReactElement {
	const inputRef = useRef<HTMLInputElement>(null)
	const { awsClient } = useAppContext()

	return (
		<div className="flex-1 flex justify-center items-end">
			<input
				ref={inputRef}
				id="file"
				type="file"
				accept=".epub"
				onChange={e => awsClient.uploadFile(e)}
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
	)
}
