'use client'

import { IoIosSearch } from 'react-icons/io'
import { theme } from '../constants'

export default function Header() {
	return (
		<header className="flex bg-base-100 fixed top-0 left-0 w-full z-10 shadow-md">
			<div className="flex justify-end w-full p-[0.65rem] px-[1rem]">
				<button>
					<IoIosSearch className="w-8 h-8" fill={`${theme.neutral}`} />
				</button>
			</div>
		</header>
	)
}
