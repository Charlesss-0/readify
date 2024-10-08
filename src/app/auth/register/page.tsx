'use client'

import { SignIn } from '@/src/components'

export default function SignUpPage() {
	const inputItems = [
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

	return <SignIn signup={true} inputItems={inputItems} />
}
