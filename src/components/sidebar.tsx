import React, { useEffect, useState } from 'react'

import { FiSidebar } from 'react-icons/fi'
import Image from 'next/image'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { useBookContext } from '../context/bookContext'

interface User {
	photoURL: string
	name: string
}

export default function Sidebar() {
	const { currentUser } = useBookContext()
	const [user, setUser] = useState<User | null>(null)
	const profileOptions = ['Profile', 'Settings', 'Log out']

	const fetchCurrentUser = () => {
		if (!currentUser) {
			console.error('No user found!')
		}

		const userData = currentUser?.providerData[0]

		setUser(prev => ({
			...prev,
			photoURL: userData?.photoURL as string,
			name: userData?.displayName?.replace(/(?<=\S)\s\S+/, '') as string,
		}))
	}

	useEffect(() => {
		fetchCurrentUser()
	}, [currentUser])

	return (
		<aside className="flex bg-neutral sticky top-0">
			<div className="drawer">
				<input id="toggle-sidebar" type="checkbox" className="drawer-toggle" />
				<label htmlFor="toggle-sidebar" className="btn btn-ghost z-10">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M4 6h16M4 12h16M4 18h7"
						/>
					</svg>
				</label>

				<div className="drawer-side">
					<label
						htmlFor="toggle-sidebar"
						aria-label="close sidebar"
						className="drawer-overlay"
					></label>

					<details className="dropdown bg-neutral flex flex-col gap-3 w-60 h-screen pt-[3.5rem] px-3 text-base-100">
						<summary className="flex items-center gap-3 w-[max-content] p-1 px-2 rounded-md text-base transition-all duration-200 cursor-pointer outline-none select-none hover:bg-[#efefef2f] active:scale-[0.98]">
							<div className="avatar">
								<Image
									src={user?.photoURL!}
									alt={user?.name!}
									width={30}
									height={30}
									className="rounded-full"
								/>
							</div>
							<p className="font-bold">{user?.name}</p>
							<MdKeyboardArrowDown />
						</summary>
						<ul className="mt-3 flex flex-col gap-3 p-3 rounded-lg bg-neutral select-none border border-[#efefef3f]">
							{profileOptions.map((opt, index) => (
								<li
									key={index}
									className="p-2 rounded-md transition-all duration-200 cursor-pointer hover:bg-[#efefef2f] active:scale-[0.98]"
								>
									{opt}
								</li>
							))}
						</ul>
					</details>
				</div>
			</div>

			<div className="flex justify-end w-full p-2 px-[1rem]">
				<input
					type="text"
					placeholder="Search"
					className="input rounded-full border border-[#efefef3f] bg-transparent"
				/>
			</div>
		</aside>
	)
}
