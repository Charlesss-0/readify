import './globals.css'

import { AppStateManager, StyledComponentsRegistry } from '@/src/hoc'

import { AppContextProvider } from '@/src/context/appContext'
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
			<AppContextProvider>
				<AppStateManager>
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
							<StyledComponentsRegistry>{children}</StyledComponentsRegistry>
						</body>
					</html>
				</AppStateManager>
			</AppContextProvider>
		</StoreProvider>
	)
}
