import './global.css'

import { BookContextProvider } from '@/context/bookContext'

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<BookContextProvider>
			<html lang="en">
				<head>
					<meta charSet="UTF-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1.0" />
					<title>E-Reader</title>
					<link
						rel="stylesheet"
						href="https://cdn-uicons.flaticon.com/2.2.0/uicons-regular-rounded/css/uicons-regular-rounded.css"
					/>
				</head>
				<body>
					<main>{children}</main>
				</body>
			</html>
		</BookContextProvider>
	)
}
