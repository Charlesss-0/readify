'use client'

import { Alerts, BookCollection } from '@/src/components'

import { RootState } from '@/src/lib'
import { useSelector } from 'react-redux'

export default function Library() {
	const { books } = useSelector((state: RootState) => state.book)

	return (
		<>
			<main className="overflow-auto bg-base-100">
				<BookCollection books={books} />
			</main>

			<Alerts />
		</>
	)
}
