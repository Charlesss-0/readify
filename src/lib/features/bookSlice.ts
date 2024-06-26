import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface BookState {
	book: Book[] | null
}

const initialState: BookState = {
	book: null,
}

const bookSlice = createSlice({
	name: 'book',
	initialState,
	reducers: {
		setBooks: (state, action: PayloadAction<BookState['book']>) => {
			state.book = action.payload
		},
		clearBooks: state => {
			state.book = null
		},
	},
})

export default bookSlice
