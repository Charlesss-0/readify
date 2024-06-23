import authReducer from './features/authslice'
import { configureStore } from '@reduxjs/toolkit'

export const createAppStore = () => {
	const store = configureStore({
		reducer: {
			auth: authReducer,
		},
	})

	return store
}

export type AppStore = ReturnType<typeof createAppStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
