'use client'

import { BookCollection, Header, Sidebar } from '@/src/components'
import React, { useEffect, useState } from 'react'

import type { User } from 'firebase/auth'
import { firebaseAuth } from '@/server/config/firebaseConfig'
import styled from 'styled-components'
import { useBookContext } from '../context/bookContext'
import { useRouter } from 'next/navigation'

const Main = styled.main<{ $isOpen: boolean }>`
	height: 100vh;

	${props =>
		props.$isOpen
			? `
			&::before {
				content: '';
				position: fixed;
				left: 0;
				top: 0;
				right: 0;
				bottom: 0;
				width: 100%;
				height: 100%;
				background-color: #0f0f0f5f;
				opacity: 1;
				transition: all 200ms;
				z-index: 1;
			}
		`
			: `
				&::before {
				content: '';
				position: fixed;
				left: 0;
				top: 0;
				right: 0;
				bottom: 0;
				width: 100%;
				height: 100%;
				background-color: #0f0f0f5f;
				opacity: 0;
				transition: all 200ms;
				z-index: 1;
			`}
`

export default function Home() {
	const router = useRouter()
	const { setCurrentUser } = useBookContext()
	const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen)
	}

	const setUserData = async () => {
		const auth = firebaseAuth
		try {
			auth.onAuthStateChanged((user: User | null) => {
				if (!user) {
					router.push('/auth/login')
					return
				}

				localStorage.setItem('userUid', user?.uid as string)
				setCurrentUser(user)
			})
		} catch (error: any) {
			console.error('Unable to verify user', error)
		}
	}

	useEffect(() => {
		setUserData()
	}, [])

	return (
		<>
			<Header />
			<Sidebar />
			<Main $isOpen={isSidebarOpen}>
				<BookCollection />
			</Main>
		</>
	)
}
