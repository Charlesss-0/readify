import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const initialState: AuthState = {
	currentUser: null,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<AuthState['currentUser']>) => {
			state.currentUser = action.payload
		},
		clearUser: state => {
			state.currentUser = null
		},
	},
})

export default authSlice
