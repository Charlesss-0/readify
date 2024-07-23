'use client'

import { BookCollection } from '@/src/components'
import { RootState } from '@/src/lib'
import { useSelector } from 'react-redux'

export default function FavoritesPage() {
	const { favorites } = useSelector((state: RootState) => state.book)

	return <BookCollection books={favorites} emptyMessage={'Your favorites are empty'} />
}
