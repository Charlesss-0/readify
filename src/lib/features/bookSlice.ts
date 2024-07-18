import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface BookState {
	books: Book[] | null
	favorites: Book[] | null
}

const initialState: BookState = {
	books: null,
	favorites: null,
}

const bookSlice = createSlice({
	name: 'book',
	initialState,
	reducers: {
		setBooks: (state, action: PayloadAction<BookState['books']>) => {
			state.books = action.payload
		},
		setFavorites: (state, action: PayloadAction<BookState['favorites']>) => {
			state.favorites = action.payload
		},
		clearBooks: state => {
			state.books = null
		},
		clearFavorites: state => {
			state.favorites = null
		},
	},
})

export default bookSlice
