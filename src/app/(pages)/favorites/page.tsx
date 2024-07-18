'use client'

import { BookCollection } from '@/src/components'
import { RootState } from '@/src/lib'
import { useSelector } from 'react-redux'

export default function Favorites() {
	const { favorites } = useSelector((state: RootState) => state.book)

	return (
		<div>
			<BookCollection books={favorites} />
		</div>
	)
}
