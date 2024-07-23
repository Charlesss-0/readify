'use client'

import { BookCollection } from '@/src/components'
import { RootState } from '@/src/lib'
import { useSelector } from 'react-redux'

export default function Library() {
	const { books } = useSelector((state: RootState) => state.book)

	return (
		<>
			<main>
				<BookCollection books={books} />
			</main>
		</>
	)
}
