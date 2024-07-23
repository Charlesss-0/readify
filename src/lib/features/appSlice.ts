import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type AppStateType = 'loading' | 'ready'

type FileStateType =
	| 'Book successfully uploaded'
	| 'Book successfully downloaded'
	| 'Book successfully deleted'
	| 'Book added to favorites'
	| 'Book removed from favorites'
	| null

interface AppAndFileState {
	appState: AppStateType
	fileState: FileStateType
}

const initialState: AppAndFileState = {
	appState: 'loading',
	fileState: null,
}

const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setAppState: (state, action: PayloadAction<AppAndFileState['appState']>) => {
			state.appState = action.payload
		},
		setFileState: (state, action: PayloadAction<AppAndFileState['fileState']>) => {
			state.fileState = action.payload
		},
	},
})

export default appSlice
