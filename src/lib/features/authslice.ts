import { signOut } from '@/src/utils'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
	currentUser: {
		uid: string
		displayName: string
		email: string
		photoURL: string
	} | null
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
		logout: state => {
			signOut()
			state.currentUser = null
		},
	},
})

export const { setUser, logout } = authSlice.actions
export default authSlice.reducer
