'use client'

import { RootState, authSlice } from '@/src/lib'
import { devices, theme } from '@/src/constants'
import { useDispatch, useSelector } from 'react-redux'

import BookShelves from '@/src/assets/images/login/bookshelves'
import { FcGoogle } from 'react-icons/fc'
import { User } from 'firebase/auth'
import { setCurrentUserState } from '@/src/utils'
import styled from 'styled-components'
import { useAppContext } from '@/src/context'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const Container = styled.div`
	background-color: ${theme['base-100']};
	display: flex;
	align-items: center;
	height: 100vh;

	@media only screen and ${devices.md} {
		flex-direction: column;

		& .bookshelves {
			display: none;
		}
	}
`

const SignUpContainer = styled.div`
	width: 50%;
	height: 100vh;
	background-color: ${theme['base-200']};
	color: ${theme['base-100']};
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 5rem;
	border-radius: 1rem 0 0 1rem;

	@media only screen and ${devices.md} {
		width: 100%;
		border-radius: 0;
		padding: 1rem;
	}
`

const SignUpForm = styled.form`
	display: flex;
	flex-direction: column;
	gap: 3rem;
	padding: 0.5rem;
`

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

export default function SignUpPage() {
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

	useEffect(() => {
		const checkCurrentUser = async () => {
			await firebaseAuth.getCurrentUser(router)
		}
		checkCurrentUser()
	}, [currentUser])

	return (
		<Container>
			<div className="bookshelves flex items-end w-[50%] h-screen p-3">
				<BookShelves />
			</div>

			<SignUpContainer>
				<h1 className="text-[2rem] text-neutral text-center mb-12">Create account</h1>

				<SignUpForm action="#" onSubmit={e => e.preventDefault()}>
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
					<button className="btn btn-secondary text-base-100 font-bold text-[1.1rem] transition-all duration-100 active:scale-[0.98]">
						Sign Up
					</button>
				</SignUpForm>

				<div className="flex items-center gap-2 py-10 [&>div]:border [&>div]:border-neutral-content [&>div]:flex-1 [&>div]:h-0 [&>div]:rounded-md">
					<div></div>
					<p className="text-neutral">Or Sign Up With</p>
					<div></div>
				</div>

				<div className="flex justify-center gap-5">
					<button
						onClick={async () => await handleGoogleSignIn()}
						className="btn bg-secondary-content text-neutral rounded-full px-8 transition-all duration-100 hover:bg-base-200 hover:outline hover:outline-1 hover:outline-neutral-content active:scale-95 [&>*]:w-8 [&>*]:h-8"
					>
						<FcGoogle />
						Google
					</button>
				</div>
			</SignUpContainer>
		</Container>
	)
}
