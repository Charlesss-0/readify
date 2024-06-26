'use client'

import { AWSClient, FirebaseAuth, Reader } from '@/src/utils'
import React, { createContext, useContext, useMemo } from 'react'

interface AppContextValue {
	reader: BookReader
	awsClient: AWSInstance
	firebaseAuth: FirebaseAuthInstance
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppContextProvider({ children }: { children: React.ReactNode }) {
	const reader = useMemo(() => new Reader(), [])
	const awsClient = useMemo(() => new AWSClient(), [])
	const firebaseAuth = useMemo(() => new FirebaseAuth(), [])

	const contextValue = {
		reader,
		awsClient,
		firebaseAuth,
	}

	return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
}

export function useAppContext(): AppContextValue {
	const context = useContext(AppContext)
	if (!context) {
		throw new Error('useBookContext must be used within a ContextProvider')
	}
	return context
}
