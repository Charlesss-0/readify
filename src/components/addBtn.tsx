import React, { useRef } from 'react'

interface BtnProps {
	onFileChange: React.ChangeEventHandler<HTMLInputElement>
}

export default function AddBtn({ onFileChange }: BtnProps) {
	const inputRef = useRef<HTMLInputElement>(null)

	return (
		<div className="fixed bottom-[1rem] right-[1rem]">
			<input
				ref={inputRef}
				id="file"
				type="file"
				accept=".epub"
				onChange={onFileChange}
				className="m-[1rem] hidden"
			/>
			<button
				type="button"
				onClick={() => inputRef.current?.click()}
				className="text-[3rem] m-[1rem]"
			>
				<i className="fi fi-rr-add"></i>
			</button>
		</div>
	)
}
