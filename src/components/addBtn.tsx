import React, { useRef } from 'react'

import styled from 'styled-components'

const Button = styled.button`
	background-color: #2f2f2f;
	color: #efefef;
	font-size: 1.5rem;
	border-radius: 50rem;
	padding: 1rem;
	margin: 1rem;
`

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
			<Button type="button" onClick={() => inputRef.current?.click()}>
				<i className="fi fi-rr-plus"></i>
			</Button>
		</div>
	)
}
