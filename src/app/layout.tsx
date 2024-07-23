import './globals.css'

import { AppStateManager, StyledComponentsRegistry } from '@/src/hoc'

import { AppContextProvider } from '@/src/context/appContext'
import { Metadata } from 'next'
import StoreProvider from './storeProvider'

export const metadata: Metadata = {
	title: 'Readify',
	generator: 'Next.js',
	manifest: '/manifest.json',
	keywords: ['nextjs', 'nextjs13', 'next13', 'pwa', 'next-pwa'],
	icons: [
		{ rel: 'apple-touch-icon', url: '/icon-192x192.png' },
		{ rel: 'icon', url: '/icon-192x192.png' },
	],
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
