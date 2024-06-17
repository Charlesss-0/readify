'use client'

import { LuSettings, LuUser2, LuUserCircle } from 'react-icons/lu'
import { PiBooks, PiBooksLight } from 'react-icons/pi'
import React, { useEffect, useState } from 'react'

import { FiClock } from 'react-icons/fi'
import { GrFavorite } from 'react-icons/gr'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { TbLogout } from 'react-icons/tb'
import UploadBtn from './uploadBtn'
import styled from 'styled-components'
import { theme } from '../constants'
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
	gap: 1rem;
	position: fixed;
	left: 0;
	top: 0;
	height: 100vh;
	transform: ${props => (props.$isOpen ? 'translateX(0%)' : 'translateX(-101%)')};
	transition: transform 300ms;
	background: ${theme['primary-content']};
	padding: 1rem;
	z-index: 2;
`

const SideSection = styled.ul`
	display: flex;
	flex-direction: column;
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
			background: #0f0f0f9f;
			opacity: 1;
		`
			: ''}
`

export default function Sidebar() {
	const { currentUser } = useAuthContext()
	const [userInfo, setUserInfo] = useState<User | null>(null)
	const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)
	const profileOptions = [
		{
			item: 'Profile',
			icon: <LuUser2 />,
		},
		{
			item: 'Settings',
			icon: <LuSettings />,
		},
		{
			item: 'Log out',
			icon: <TbLogout />,
		},
	]
	const sidebarItems = [
		{
			item: 'Recent',
			icon: <FiClock />,
		},
		{
			item: 'Library',
			icon: <PiBooks />,
		},
		{
			item: 'Favorites',
			icon: <GrFavorite />,
		},
	]

	const toggleDrawer = () => {
		if (!isSidebarOpen) {
			return
		}

		setIsSidebarOpen(!isSidebarOpen)
	}

	const fetchCurrentUserData = () => {
		const userData = currentUser?.providerData[0]

		setUserInfo(prev => ({
			...prev,
			photoURL: userData?.photoURL as string,
			name: userData?.displayName as string,
		}))
	}

	useEffect(() => {
		fetchCurrentUserData()
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
				<details className="dropdown pt-12 text-base-100">
					<summary className="flex items-center gap-3 p-1 px-2 rounded-md text-base transition-all duration-200 cursor-pointer outline-none select-none hover:bg-neutral active:scale-[0.98]">
						<div className="w-8 rounded-full overflow-hidden">
							{userInfo?.photoURL ? (
								<img
									src={userInfo.photoURL}
									alt={userInfo.name}
									draggable={false}
									loading="lazy"
								/>
							) : (
								<LuUserCircle />
							)}
						</div>

						<p className="font-bold">{userInfo?.name}</p>

						<MdKeyboardArrowDown />
					</summary>

					<ul className="absolute w-full mt-3 flex flex-col gap- p-2 rounded-lg bg-primary select-none border border-neutral">
						{profileOptions.map((item, index) => (
							<li
								key={index}
								className="flex items-center gap-2 p-2 rounded-md transition-all duration-200 cursor-pointer hover:bg-neutral active:scale-[0.98]"
							>
								{item.icon}
								{item.item}
							</li>
						))}
					</ul>
				</details>

				<SideSection>
					{sidebarItems.map((item, index) => (
						<li
							key={index}
							className="flex items-center gap-2 p-2 rounded-md transition-all duration-200 select-none cursor-pointer hover:bg-neutral active:scale-[0.98]"
						>
							{item.icon}
							{item.item}
						</li>
					))}
				</SideSection>

				<UploadBtn />
			</SideDrawer>

			<Overlay $isOpen={isSidebarOpen} onClick={toggleDrawer} />
		</Aside>
	)
}
