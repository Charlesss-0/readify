'use client'

import { IoIosSearch } from 'react-icons/io'

export default function Header() {
	return (
		<header className="flex bg-base-100 fixed top-0 left-0 w-full z-10">
			<div className="flex justify-end w-full p-2 px-[1rem]">
				<button>
					<IoIosSearch className="w-10 h-10" />
				</button>
			</div>
		</header>
	)
}
