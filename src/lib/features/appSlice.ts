import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface AppState {
	appState: 'loading' | 'ready'
	fileState: 'uploaded' | 'deleted' | 'downloaded' | 'added to favorites' | null
}

const initialState: AppState = {
	appState: 'loading',
	fileState: null,
}

const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setAppState: (state, action: PayloadAction<AppState['appState']>) => {
			state.appState = action.payload
		},
		setFileState: (state, action: PayloadAction<AppState['fileState']>) => {
			state.fileState = action.payload
		},
	},
})

export default appSlice
