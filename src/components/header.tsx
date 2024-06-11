import React, { useEffect, useState } from 'react'

import styled from 'styled-components'
import { useBookContext } from '../context/bookContext'

const Avatar = styled.div`
	background-size: cover;
	background-position: center;
	width: 3.5em;
	height: 3.5em;
	border-radius: 50em;
	justify-self: end;
`

export default function Header() {
	const { currentUser } = useBookContext()
	const [photoURL, setPhotoURL] = useState<string>('')
	const [userName, setUserName] = useState<string>('')

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
		<header className="sticky top-0 p-[0.5rem]">
			<div className="navbar bg-base-100 flex justify-end px-[1.5rem] py-[1rem] w-full rounded-[1rem]">
				<div className="dropdown dropdown-end">
					<div tabIndex={0} role="button" className="flex items-center gap-[1rem]">
						<p className="text-neutral">{userName}</p>
						<Avatar
							style={{
								backgroundImage: `url(${photoURL})`,
							}}
						></Avatar>
					</div>
					<ul
						tabIndex={0}
						className="text-neutral mt-5 z-[1] p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52"
					>
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
			</div>
		</header>
	)
}
