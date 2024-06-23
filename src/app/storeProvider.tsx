'use client'

import { type AppStore, createAppStore } from '@/src/lib'
import React, { useRef } from 'react'

import { Provider } from 'react-redux'

export default function StoreProvider({ children }: { children: React.ReactNode }) {
	const storeRef = useRef<AppStore>()
	if (!storeRef.current) {
		storeRef.current = createAppStore()
	}

	return <Provider store={storeRef.current}>{children}</Provider>
}
