import './globals.css'

import { BookContextProvider } from '@/src/context/bookContext'
import Head from 'next/head'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Readify',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<BookContextProvider>
			<html lang="en" data-theme="emerald">
				<Head>
					<meta charSet="UTF-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				</Head>
				<body className="bg-neutral">{children}</body>
			</html>
		</BookContextProvider>
	)
}
