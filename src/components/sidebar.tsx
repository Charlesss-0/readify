'use client'

import React, { useEffect, useState } from 'react'

import { MdKeyboardArrowDown } from 'react-icons/md'
import UploadBtn from './uploadBtn'
import styled from 'styled-components'
import { useAuthContext } from '../context'

interface User {
	photoURL: string
	name: string
}

const Aside = styled.aside<{ $isOpen: boolean }>`
	position: fixed;
	top: 0;
	left: 0;
	z-index: 10;
`

const SideDrawer = styled.div<{ $isOpen: boolean }>`
	display: flex;
	flex-direction: column;
	position: fixed;
	left: 0;
	top: 0;
	height: 100vh;
	transform: ${props => (props.$isOpen ? 'translateX(0%)' : 'translateX(-101%)')};
	transition: transform 300ms;
	background: #2f2f2f;
	z-index: 2;
`

const Overlay = styled.div<{ $isOpen: boolean }>`
	transition: all 200ms;
	opacity: 0;

	${props =>
		props.$isOpen
			? `
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100vh;
			background: #0f0f0f5f;
			backdrop-filter: blur(10px);
			opacity: 1;
		`
			: ''}
`

export default function Sidebar() {
	const { currentUser } = useAuthContext()
	const [userInfo, setUserInfo] = useState<User | null>(null)
	const profileOptions = ['Profile', 'Settings', 'Log out']
	const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)

	const toggleDrawer = () => {
		if (!isSidebarOpen) {
			return
		}

		setIsSidebarOpen(!isSidebarOpen)
	}

	const fetchCurrentUser = () => {
		const userData = currentUser?.providerData[0]

		setUserInfo(prev => ({
			...prev,
			photoURL: userData?.photoURL as string,
			name: userData?.displayName as string,
		}))
	}

	useEffect(() => {
		fetchCurrentUser()
	}, [currentUser])

	return (
		<Aside $isOpen={isSidebarOpen}>
			<button
				onClick={() => setIsSidebarOpen(!isSidebarOpen)}
				className="absolute p-5 transition-all duration-200 hover:opacity-90 active:scale-95 z-10"
			>
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
			</button>

			<SideDrawer $isOpen={isSidebarOpen}>
				<details className="dropdown pt-[4.4rem] px-3 text-base-100">
					<summary className="flex items-center gap-3 p-1 px-2 rounded-md text-base transition-all duration-200 cursor-pointer outline-none select-none hover:bg-[#efefef2f] active:scale-[0.99]">
						<div className="w-8 rounded-full overflow-hidden">
							<img
								src={userInfo?.photoURL as string}
								alt={userInfo?.name as string}
								draggable={false}
								loading="lazy"
							/>
						</div>

						<p className="font-bold">{userInfo?.name}</p>

						<MdKeyboardArrowDown />
					</summary>

					<ul className="mt-3 flex flex-col gap-3 p-3 rounded-lg bg-neutral select-none border border-[#efefef3f]">
						{profileOptions.map((item, index) => (
							<li
								key={index}
								className="p-2 rounded-md transition-all duration-200 cursor-pointer hover:bg-[#efefef2f] active:scale-[0.98]"
							>
								{item}
							</li>
						))}
					</ul>
				</details>

				<UploadBtn />
			</SideDrawer>

			<Overlay $isOpen={isSidebarOpen} onClick={toggleDrawer} />
		</Aside>
	)
}
