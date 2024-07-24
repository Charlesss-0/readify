import './globals.css'

import { AppStateManager, StyledComponentsRegistry } from '@/src/hoc'

import { AppContextProvider } from '@/src/context/appContext'
import { GoogleTagManager } from '@next/third-parties/google'
import { Metadata } from 'next'
import StoreProvider from './storeProvider'

export const metadata: Metadata = {
	title: 'Readify',
	generator: 'Next.js',
	manifest: '/manifest.json',
	keywords: ['nextjs', 'nextjs13', 'next13', 'pwa', 'next-pwa'],
	icons: [
		{ rel: 'apple-touch-icon', url: '/icons/icon-192x192.png' },
		{ rel: 'icon', url: '/icons/icon-192x192.png' },
	],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<StoreProvider>
			<AppContextProvider>
				<AppStateManager>
					<StyledComponentsRegistry>
						<html lang="en" data-theme="appTheme">
							<body>
								<main>{children}</main>

								{/* <!-- Google Tag Manager --> */}
								<GoogleTagManager gtmId="GTM-TNRLXM32" />
								{/* <!-- End Google Tag Manager --> */}

								{/* <!-- Google Tag Manager (noscript) --> */}
								<noscript>
									<iframe
										src="https://www.googletagmanager.com/ns.html?id=GTM-TNRLXM32"
										height="0"
										width="0"
										style={{ display: 'none', visibility: 'hidden' }}
									></iframe>
								</noscript>
								{/* <!-- End Google Tag Manager (noscript) --> */}
							</body>
						</html>
					</StyledComponentsRegistry>
				</AppStateManager>
			</AppContextProvider>
		</StoreProvider>
	)
}
