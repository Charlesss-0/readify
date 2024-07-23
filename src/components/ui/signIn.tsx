import { AppDispatch, RootState, authSlice } from '@/src/lib'
import { devices, theme } from '@/src/constants'
import { useDispatch, useSelector } from 'react-redux'

import BookShelves from '@/src/assets/images/login/bookshelves'
import { FcGoogle } from 'react-icons/fc'
import Link from 'next/link'
import { User } from 'firebase/auth'
import { setCurrentUserState } from '@/src/utils'
import styled from 'styled-components'
import { useAppContext } from '@/src/context'

interface InputItems {
	name: string
	type: string
	text: string
}

interface LoginProps {
	signup?: boolean
	signin?: boolean
	inputItems?: InputItems[]
	createUser?: () => Promise<void>
}

interface AuthFormProps {
	inputItems: InputItems[]
	onSubmit: (e: React.FormEvent) => void
	buttonText: string
}

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

const GoogleSignInButton = styled.button`
	background: ${theme['secondary-content']};
	color: ${theme['neutral']};
	border-radius: 50%;
	border: none;
	padding: 0.5rem;
	transition: all 200ms ease-in-out;

	&:hover {
		background: ${theme['base-200']};
		outline: 1px solid ${theme['neutral-content']};
	}

	&:active {
		transform: scale(0.95);
	}

	& > * {
		width: 2rem;
		height: 2rem;
	}
`

const Divider = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
	margin: 2rem 0;

	& > div {
		flex: 1;
		height: 1px;
		background-color: ${theme['neutral-content']};
	}

	& > p {
		color: ${theme['neutral']};
	}
`

const AuthLink = styled(Link)`
	color: ${theme['neutral']};
	text-decoration: underline;
`

const AuthForm = ({ inputItems, onSubmit, buttonText }: AuthFormProps) => {
	const dispatch = useDispatch<AppDispatch>()
	const { setName, setEmail, setPassword } = authSlice.actions

	return (
		<SignUpForm onSubmit={onSubmit}>
			{inputItems.map((item, index) => (
				<Field key={index}>
					<input
						type={item.type}
						id={item.name}
						name={item.name}
						placeholder=" "
						autoComplete="off"
						onChange={e => {
							if (item.type === 'text') {
								dispatch(setName(e.target.value))
							} else if (item.type === 'email') {
								dispatch(setEmail(e.target.value))
							} else if (item.type === 'password') {
								dispatch(setPassword(e.target.value))
							}
						}}
					/>
					<label htmlFor={item.name}>{item.text}</label>
				</Field>
			))}
			<button
				className="btn btn-secondary text-base-100 font-bold text-[1.1rem] transition-all duration-100 active:scale-[0.98]"
				type="submit"
			>
				{buttonText}
			</button>
		</SignUpForm>
	)
}

export default function SignIn({ signup, signin, inputItems }: LoginProps) {
	const { firebaseAuth } = useAppContext()
	const dispatch = useDispatch<AppDispatch>()
	const { setUser } = authSlice.actions
	const { name, email, password } = useSelector((state: RootState) => state.auth)

	const createUser = async () => {
		try {
			const user: User | null = await firebaseAuth.createUserWithEmailAndPassword(
				name as string,
				email as string,
				password as string
			)

			if (user) {
				setCurrentUserState(user, (userState: AuthState) =>
					dispatch(setUser(userState.currentUser))
				)
			}
		} catch (error) {
			console.error('Error creating user:', error)
		}
	}

	const handleSignInWithEmailAndPassword = async () => {
		try {
			const user: User | null = await firebaseAuth.signInWithEmailAndPassword(
				email as string,
				password as string
			)

			if (user) {
				setCurrentUserState(user, (userState: AuthState) =>
					dispatch(setUser(userState.currentUser))
				)
			}
		} catch (error) {
			console.error('Error signing in:', error)
		}
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (signup) {
			await createUser()
		} else if (signin) {
			await handleSignInWithEmailAndPassword()
		}
	}

	const handleGoogleSignIn = async () => {
		try {
			const user: User | null = await firebaseAuth.signInWithGoogle()

			if (user) {
				setCurrentUserState(user, (user: AuthState) => dispatch(setUser(user.currentUser)))
			}
		} catch (error) {
			console.error('Error signing in with Google:', error)
		}
	}

	return (
		<Container>
			<div className="bookshelves flex items-end w-[50%] h-screen p-3">
				<BookShelves />
			</div>

			<SignUpContainer>
				<h1 className="text-[2rem] text-neutral text-center mb-12">
					{signup ? 'Sign up' : 'Log in'}
				</h1>

				<AuthForm
					inputItems={inputItems!}
					onSubmit={handleSubmit}
					buttonText={signup ? 'Sign Up' : 'Sign In'}
				/>

				<Divider>
					<div></div>
					<p>{signup ? 'Or Sign Up With' : 'Sign In With'}</p>
					<div></div>
				</Divider>

				<div className="flex justify-center gap-5">
					<GoogleSignInButton onClick={async () => await handleGoogleSignIn()}>
						<FcGoogle />
					</GoogleSignInButton>
				</div>

				<p className="text-neutral text-center pt-8">
					{signup ? (
						<>
							Already signed up? <AuthLink href={'/auth/login'}>Go to login</AuthLink>
						</>
					) : (
						<>
							Don't have an account? <AuthLink href={'/auth/register'}>Sign up</AuthLink>
						</>
					)}
				</p>
			</SignUpContainer>
		</Container>
	)
}
