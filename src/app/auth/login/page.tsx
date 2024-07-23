'use client'

import { SignIn } from '@/src/components'

export default function LoginPage() {
	const inputItems = [
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

	return <SignIn signin={true} inputItems={inputItems} />
}
