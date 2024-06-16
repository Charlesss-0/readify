'use client'

import React, { createContext, useContext, useState } from 'react'

import { User } from 'firebase/auth'

interface AuthContextValue {
	currentUser: User | null
	setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
	const [currentUser, setCurrentUser] = useState<User | null>(null)

	const contextValue = {
		currentUser,
		setCurrentUser,
	}

	return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export function useAuthContext(): AuthContextValue {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error('useAuthContext must be used within a ContextProvider')
	}
	return context
}
