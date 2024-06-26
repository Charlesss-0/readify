import appReducer from './features/appSlice'
import authReducer from './features/authslice'
import bookReducer from './features/bookSlice'
import { configureStore } from '@reduxjs/toolkit'

export const createAppStore = () => {
	const store = configureStore({
		reducer: {
			app: appReducer.reducer,
			auth: authReducer.reducer,
			book: bookReducer.reducer,
		},
	})

	return store
}

export type AppStore = ReturnType<typeof createAppStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
