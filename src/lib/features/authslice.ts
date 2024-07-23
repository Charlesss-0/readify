import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const initialState: AuthState = {
	currentUser: null,
	name: null,
	email: null,
	password: null,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<AuthState['currentUser']>) => {
			state.currentUser = action.payload
		},
		setName: (state, action: PayloadAction<AuthState['name']>) => {
			state.name = action.payload
		},
		setEmail: (state, action: PayloadAction<AuthState['email']>) => {
			state.email = action.payload
		},
		setPassword: (state, action: PayloadAction<AuthState['password']>) => {
			state.password = action.payload
		},
		clearUser: state => {
			state.currentUser = null
		},
	},
})

export default authSlice
