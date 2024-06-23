import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { User } from 'firebase/auth'

interface AuthState {
	currentUser: User | null
}

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

export const { setUser, clearUser } = authSlice.actions
export default authSlice.reducer
