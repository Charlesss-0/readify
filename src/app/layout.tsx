import './globals.css'

import { AppStateManager } from '@/src/components'
import { AuthContextProvider } from '@/src/context/authContext'
import { BookContextProvider } from '@/src/context/bookContext'
import Head from 'next/head'
import { Metadata } from 'next'
import StyledComponentsRegistry from '@/src/lib/registry'

export const metadata: Metadata = {
	title: 'Readify',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<AuthContextProvider>
			<BookContextProvider>
				<html lang="en" data-theme="appTheme">
					<Head>
						<meta charSet="UTF-8" />
						<meta name="viewport" content="width=device-width, initial-scale=1.0" />
					</Head>
					<body className="bg-neutral">
						<AppStateManager>
							<StyledComponentsRegistry>{children}</StyledComponentsRegistry>
						</AppStateManager>
					</body>
				</html>
			</BookContextProvider>
		</AuthContextProvider>
	)
}
