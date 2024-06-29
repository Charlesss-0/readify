'use client'

import React from 'react'

export default function Header() {
	return (
		<header className="flex bg-base-100 sticky top-0 left-0 w-full z-10">
			<div className="flex justify-end w-full p-2 px-[1rem]">
				<input
					type="text"
					placeholder="Search"
					className="input rounded-full border border-neutral bg-transparent outline-none"
				/>
			</div>
		</header>
	)
}
