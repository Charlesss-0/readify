import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface BookState {
	books: Book[] | null
}

const initialState: BookState = {
	books: null,
}

const bookSlice = createSlice({
	name: 'book',
	initialState,
	reducers: {
		setBooks: (state, action: PayloadAction<BookState['books']>) => {
			state.books = action.payload
		},
		clearBooks: state => {
			state.books = null
		},
	},
})

export default bookSlice
