'use client'

import {
	GrFavorite,
	LuSettings,
	LuUser2,
	LuUserCircle,
	MdKeyboardArrowDown,
	MdKeyboardArrowUp,
	PiBooks,
	TbLogout,
} from '@/src/assets/icons/icons'
import { ItemListContainer, theme } from '@/src/constants'
import { useEffect, useMemo, useState } from 'react'

import Link from 'next/link'
import { RootState } from '@/src/lib'
import UploadBtn from './ui/uploadBtn'
import styled from 'styled-components'
import { useAppContext } from '@/src/context'
import { usePathname } from 'next/navigation'
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

const UserBtn = styled.summary`
	display: flex;
	align-items: center;
	justify-content: space-around;
	gap: 0.75rem;
	padding: 0.5rem;
	border-radius: 0.375rem;
	transition: all 200ms;
	cursor: pointer;
	outline: none;
	user-select: none;

	&:hover {
		background-color: ${theme['secondary-content']};
	}

	&:active {
		transform: scale(0.98);
	}
`

const SideSection = styled.ul`
	display: flex;
	flex-direction: column;
`

const SectionLink = styled.li<{ $active: boolean }>`
	background-color: ${props => (props.$active ? `${theme['secondary-content']}` : '')};
	display: flex;
	align-items: center;
	gap: 0.5rem;
	padding: 0.5rem;
	border-radius: 0.375rem;
	transition: all 200ms;
	user-select: none;
	cursor: pointer;

	&:hover {
		background-color: ${theme['secondary-content']};
	}

	&:active {
		transform: scale(0.98);
	}
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
	const pathName = usePathname()
	const { firebaseAuth } = useAppContext()
	const { currentUser } = useSelector((state: RootState) => state.auth)
	const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)
	const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
	const [formattedName, setFormattedName] = useState<string>('')

	useEffect(() => {
		const formatName = () => {
			const name = currentUser?.displayName
			const nameParts = name?.trim().split(/\s+/)

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
				text: 'Profile',
				icon: <LuUser2 />,
				action: () => {
					const modal = document.getElementById('profile_modal') as HTMLDialogElement
					if (modal) {
						modal.showModal()
					}
				},
			},
			{
				text: 'Settings',
				icon: <LuSettings />,
				action: () => {},
			},
			{
				text: 'Log out',
				icon: <TbLogout />,
				action: async () => await firebaseAuth.logOut(),
			},
		],
		[]
	)

	const sidebarItems = useMemo(
		() => [
			{
				text: 'Library',
				icon: <PiBooks />,
				route: '/library',
			},
			{
				text: 'Favorites',
				icon: <GrFavorite />,
				route: '/favorites',
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
					<UserBtn onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
						{currentUser ? (
							<>
								<Avatar>
									<img
										src={currentUser.photoURL}
										alt={currentUser.displayName}
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
					</UserBtn>

					<ItemListContainer tabIndex={0} className="dropdown-content">
						{profileOptions.map((item: any, index: number) => (
							<li
								key={index}
								onClick={item.action}
								className="flex items-center gap-2 p-2 rounded-md transition-all duration-200 cursor-pointer hover:bg-secondary-content text-primary active:scale-[0.98]"
							>
								{item.icon}
								{item.text}
							</li>
						))}
					</ItemListContainer>
				</details>

				<SideSection>
					{sidebarItems.map((item, index) => (
						<Link key={index} href={item.route}>
							<SectionLink $active={pathName === item.route}>
								{item.icon}
								{item.text}
							</SectionLink>
						</Link>
					))}
				</SideSection>

				<UploadBtn />
			</SideDrawer>

			<Overlay $isOpen={isSidebarOpen} onClick={toggleDrawer} />

			{/* profile modal */}
			<dialog id="profile_modal" className="modal">
				<div className="modal-box bg-base-100">
					<div className="modal-action">
						<form method="dialog">
							<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
								✕
							</button>
						</form>
					</div>

					<div className="flex flex-col gap-10 items-center">
						{currentUser && (
							<>
								<img
									src={currentUser.photoURL}
									alt={currentUser.displayName}
									className="w-28 rounded-full"
								/>

								<div className="w-full">
									<p>Your name</p>
									<p className="text-[1.3rem]">{currentUser.displayName}</p>
								</div>

								<div className="w-full">
									<p>Your email</p>
									<p className="text-[1.3rem]">{currentUser.email}</p>
								</div>
							</>
						)}
					</div>
				</div>
			</dialog>
		</Aside>
	)
}
