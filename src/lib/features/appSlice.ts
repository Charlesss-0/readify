import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface AppState {
	appState: 'loading' | 'ready'
}

const initialState: AppState = {
	appState: 'loading',
}

const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setAppState: (state, action: PayloadAction<AppState['appState']>) => {
			state.appState = action.payload
		},
	},
})

export default appSlice
