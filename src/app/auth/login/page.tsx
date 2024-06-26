'use client'

import { FaFacebook, FaGoogle } from 'react-icons/fa'
import { RootState, authSlice } from '@/src/lib'
import { useDispatch, useSelector } from 'react-redux'

import BookShelves from '@/src/assets/images/login/bookshelves'
import { User } from 'firebase/auth'
import { setCurrentUserState } from '@/src/utils'
import styled from 'styled-components'
import { theme } from '@/src/constants'
import { useAppContext } from '@/src/context'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const Field = styled.fieldset`
	position: relative;
	display: flex;
	flex-direction: column;

	& > input {
		background: transparent;
		padding: 1rem;
		border-bottom: 2px solid ${theme['neutral-content']};
		color: ${theme['neutral']};
		outline: none;
	}

	& > input:focus + label,
	& > input:not(:placeholder-shown) + label {
		font-size: 1rem;
		transform: translateY(-150%);
	}

	& > label {
		color: ${theme['neutral']};
		font-size: 1.3rem;
		letter-spacing: 1px;
		padding: 5px;

		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		transition: all 200ms ease-in-out;
		pointer-events: none;
	}
`

export default function LoginPage() {
	const router = useRouter()
	const dispatch = useDispatch()
	const { setUser } = authSlice.actions
	const { currentUser } = useSelector((state: RootState) => state.auth)
	const { firebaseAuth } = useAppContext()

	const handleGoogleSignIn = async () => {
		try {
			const user: User | null = await firebaseAuth.signInWithGoogle()

			if (user) {
				setCurrentUserState(user, (user: AuthState) =>
					dispatch(setUser(user.currentUser))
				)
			}
		} catch (error) {
			console.error('Error signing in with Google:', error)
		}
	}

	const fieldItems = [
		{
			type: 'text',
			text: 'Name',
			name: 'user-name',
		},
		{
			type: 'email',
			text: 'Email',
			name: 'user-email',
		},
		{
			type: 'password',
			text: 'Password',
			name: 'user-password',
		},
	]

	const signUpIcons = [
		{
			icon: <FaGoogle />,
			event: handleGoogleSignIn,
		},
		{
			icon: <FaFacebook />,
		},
	]

	useEffect(() => {
		const checkCurrentUser = async () => {
			await firebaseAuth.getCurrentUser(router)
		}
		checkCurrentUser()
	}, [currentUser])

	return (
		<div className="bg-base-100 flex items-center h-screen">
			<div className="flex items-end w-[50%] h-screen p-3">
				<BookShelves />
			</div>

			<div className="w-[50%] h-screen bg-base-200 flex flex-col justify-center p-20 rounded-tl-[2rem] rounded-bl-[2rem] text-base-100">
				<h1 className="text-[2rem] text-neutral text-center mb-12">Create account</h1>

				<form
					action="#"
					onSubmit={e => e.preventDefault()}
					className="p-2 flex flex-col gap-12"
				>
					{fieldItems.map((item, index) => (
						<Field key={index}>
							<input
								type={item.type}
								id={item.name}
								name={item.name}
								placeholder=" "
								autoComplete="off"
							/>
							<label htmlFor={item.name}>{item.text}</label>
						</Field>
					))}
					<button className="p-2 rounded-md text-base-100 font-bold text-[1.1rem] bg-[#f50057] transition-all duration-200 hover:bg-[#f50057ef] active:scale-95">
						Sign Up
					</button>
				</form>

				<div className="flex items-center gap-2 py-10 [&>div]:border [&>div]:border-neutral-content [&>div]:flex-1 [&>div]:h-0 [&>div]:rounded-md">
					<div></div>
					<p className="text-neutral">Or Sign Up With</p>
					<div></div>
				</div>

				<div className="flex justify-center gap-5">
					{signUpIcons.map((item, index) => (
						<button
							key={index}
							onClick={item.event}
							className="p-3 rounded-full transition-all duration-200 bg-neutral-content hover:bg-base-200 hover:outline hover:outline-1 hover:outline-neutral-content active:scale-95 [&>*]:w-8 [&>*]:h-8"
						>
							{item.icon}
						</button>
					))}
				</div>
			</div>
		</div>
	)
}
