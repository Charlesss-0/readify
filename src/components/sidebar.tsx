import React, { useEffect, useState } from 'react'

import { FiSidebar } from 'react-icons/fi'
import styled from 'styled-components'
import { useBookContext } from '../context/bookContext'

interface User {
	photoURL: ''
	name: ''
}

const Avatar = styled.div`
	background-size: cover;
	background-position: center;
	width: 3.5em;
	height: 3.5em;
	border-radius: 1em;
	justify-self: end;
`

export default function Sidebar() {
	const { currentUser } = useBookContext()
	const [user, setUser] = useState<User | null>(null)
	const [photoURL, setPhotoURL] = useState<string>('')
	const [userName, setUserName] = useState<string>('')
	const [isOpen, setIsOpen] = useState<boolean>(false)

	const handleToggle = () => {
		setIsOpen(!isOpen)
	}

	const fetchCurrentUser = () => {
		if (!currentUser) {
			console.error('No user found!')
		}
		setUserName(currentUser?.providerData[0].displayName as string)
		setPhotoURL(currentUser?.providerData[0].photoURL as string)
	}

	useEffect(() => {
		fetchCurrentUser()
	}, [currentUser])

	return (
		<aside className="drawer p-[1rem]">
			<input
				id="toggle-sidebar"
				type="checkbox"
				className="drawer-toggle"
				checked={isOpen}
				onChange={handleToggle}
			/>
			<label
				htmlFor="toggle-sidebar"
				className={`btn btn-ghost drawer-button text-[2rem] z-10 transition-all ${
					isOpen ? 'ml-60' : 'ml-0'
				}`}
				style={{
					transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
					transitionDuration: '200ms',
				}}
			>
				<FiSidebar />
			</label>

			<div className="drawer-side">
				<label
					htmlFor="toggle-sidebar"
					aria-label="close sidebar"
					className="drawer-overlay"
				></label>

				<ul className="menu menu-content bg-base-content w-60 h-screen text-base-100">
					<li className="flex items-center gap-[1rem]">
						<Avatar
							style={{
								backgroundImage: `url(${photoURL})`,
							}}
						/>
						<p className="text-base">{userName}</p>
					</li>
					<li>
						<a>Profile</a>
					</li>
					<li>
						<a>Settings</a>
					</li>
					<li>
						<a>Logout</a>
					</li>
				</ul>
			</div>
		</aside>
	)
}
