import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface AlertState {
	type: 'info' | 'success' | 'error' | null
	message:
		| 'Uploading book'
		| 'Downloading book'
		| 'Deleting book'
		| 'Book uploaded successfully'
		| 'Book downloaded successfully'
		| 'Book deleted successfully'
		| 'Book added to favorites'
		| 'Book removed from favorites'
		| 'Unable to upload book'
		| 'Unable to download book'
		| 'Unable to delete book'
		| 'Unable to add book to favorites'
		| 'Unable to remove book from favorites'
		| null
}

interface AppState {
	appState: 'loading' | 'ready'
	alert: AlertState
}

const initialState: AppState = {
	appState: 'loading',
	alert: {
		type: null,
		message: null,
	},
}

const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setAppState: (state, action: PayloadAction<AppState['appState']>) => {
			state.appState = action.payload
		},
		setAlert: (state, action: PayloadAction<AppState['alert']>) => {
			state.alert = action.payload
		},
		clearAlert: state => {
			state.alert = { type: null, message: null }
		},
	},
})

export default appSlice
