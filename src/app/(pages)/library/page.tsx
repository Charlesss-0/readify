'use client'

import { Alerts, BookCollection } from '@/src/components'

export default function Library() {
	return (
		<>
			<main className="overflow-auto bg-base-100">
				<BookCollection />
			</main>

			<Alerts />
		</>
	)
}
