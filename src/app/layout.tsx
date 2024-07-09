import './globals.css'

import { AppStateManager, StyledComponentsRegistry } from '@/src/hoc'

import { AppContextProvider } from '@/src/context/appContext'
import { Metadata } from 'next'
import StoreProvider from './storeProvider'

export const metadata: Metadata = {
	title: 'Readify',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<StoreProvider>
			<AppContextProvider>
				<AppStateManager>
					<StyledComponentsRegistry>
						<html lang="en" data-theme="appTheme">
							<body>{children}</body>
						</html>
					</StyledComponentsRegistry>
				</AppStateManager>
			</AppContextProvider>
		</StoreProvider>
	)
}
