import React from 'react'

export default function Header() {
	return (
		<header className="flex bg-neutral sticky top-0 z-10">
			<div className="flex justify-end w-full p-2 px-[1rem]">
				<input
					type="text"
					placeholder="Search"
					className="input rounded-full border border-[#efefef3f] bg-transparent"
				/>
			</div>
		</header>
	)
}
