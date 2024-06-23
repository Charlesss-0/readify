import './globals.css'

import { AppStateManager, StyledComponentsRegistry } from '@/src/hoc'

import { AuthContextProvider } from '@/src/context/authContext'
import { BookContextProvider } from '@/src/context/bookContext'
import Head from 'next/head'
import { Metadata } from 'next'
import StoreProvider from './storeProvider'
import { theme } from '@/src/constants'

export const metadata: Metadata = {
	title: 'Readify',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<StoreProvider>
			<AuthContextProvider>
				<BookContextProvider>
					<html lang="en" data-theme="appTheme">
						<Head>
							<meta charSet="UTF-8" />
							<meta name="viewport" content="width=device-width, initial-scale=1.0" />
						</Head>
						<body
							style={{
								backgroundColor: theme['primary-content'],
							}}
						>
							<AppStateManager>
								<StyledComponentsRegistry>{children}</StyledComponentsRegistry>
							</AppStateManager>
						</body>
					</html>
				</BookContextProvider>
			</AuthContextProvider>
		</StoreProvider>
	)
}
