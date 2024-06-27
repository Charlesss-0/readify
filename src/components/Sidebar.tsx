'use client'

import {
	FiClock,
	GrFavorite,
	LuSettings,
	LuUser2,
	LuUserCircle,
	MdKeyboardArrowDown,
	MdKeyboardArrowUp,
	PiBooks,
	TbLogout,
} from '@/src/assets/icons/icons'
import { useEffect, useMemo, useState } from 'react'

import DropdownContent from './ui/dropdownContent'
import { RootState } from '@/src/lib'
import UploadBtn from './ui/uploadBtn'
import styled from 'styled-components'
import { theme } from '@/src/constants'
import { useAppContext } from '@/src/context'
import { useSelector } from 'react-redux'

const Avatar = styled.div`
	width: 2rem;
	border-radius: 50%;
	overflow: hidden;
`

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
	width: 18rem;
	transform: ${props => (props.$isOpen ? 'translateX(0%)' : 'translateX(-101%)')};
	transition: transform 300ms;
	background: ${theme['base-200']};
	color: ${theme['primary']};
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
	const { firebaseAuth } = useAppContext()
	const { currentUser } = useSelector((state: RootState) => state.auth)
	const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)
	const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
	const [formattedName, setFormattedName] = useState<string>('')

	useEffect(() => {
		const formatName = () => {
			const name = currentUser?.displayName
			const nameParts = name?.trim().split(/\s+/)
			console.log(nameParts)

			if (nameParts?.length === 4) {
				setFormattedName(`${nameParts[0]} ${nameParts[2]}`)
			}

			setFormattedName(name as string)
		}
		formatName()
	}, [currentUser])

	const profileOptions = useMemo(
		() => [
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
				action: async () => await firebaseAuth.logOut(),
			},
		],
		[]
	)

	const sidebarItems = useMemo(
		() => [
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
		],
		[]
	)

	const toggleDrawer = () => {
		if (!isSidebarOpen) {
			return
		}

		setIsSidebarOpen(!isSidebarOpen)
	}

	return (
		<Aside $isOpen={isSidebarOpen}>
			<button
				onClick={() => setIsSidebarOpen(!isSidebarOpen)}
				className="absolute p-5 transition-all duration-200 hover:opacity-90 active:scale-95 z-10"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-7 w-7"
					fill="none"
					viewBox="0 0 24 24"
					stroke={theme.neutral}
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
				<details className="dropdown pt-12 text-primary">
					<summary
						onClick={() => setIsDropdownOpen(!isDropdownOpen)}
						className="flex items-center justify-center gap-3 p-2 rounded-md text-base transition-all duration-200 cursor-pointer outline-none select-none hover:bg-secondary-content active:scale-[0.98]"
					>
						{currentUser ? (
							<>
								<Avatar>
									<img
										src={currentUser.photoURL!}
										alt={currentUser.displayName!}
										draggable={false}
										loading="lazy"
									/>
								</Avatar>

								<p className="font-bold">{formattedName}</p>
							</>
						) : (
							<>
								<LuUserCircle />

								<p className="font-bold">No user</p>
							</>
						)}

						{isDropdownOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
					</summary>

					<DropdownContent items={profileOptions} />
				</details>

				<SideSection>
					{sidebarItems.map((item, index) => (
						<li
							key={index}
							className="flex items-center gap-2 p-2 rounded-md transition-all duration-200 select-none cursor-pointer hover:bg-secondary-content active:scale-[0.98]"
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
