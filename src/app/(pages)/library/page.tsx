'use client'

import { useCallback, useEffect, useState } from 'react'

import { BookCollection } from '@/src/components'
import { RootState } from '@/src/lib'
import { useSelector } from 'react-redux'

export default function Library() {
	const { fileState } = useSelector((state: RootState) => state.app)
	const [showAlert, setShowAlert] = useState<boolean>(false)

	const setAlertState = useCallback(() => {
		if (fileState === 'uploaded' || fileState === 'deleted') {
			setShowAlert(true)

			const timer = setTimeout(() => {
				setShowAlert(false)
			}, 3000)

			return () => clearTimeout(timer)
		}
	}, [])

	useEffect(() => {
		setAlertState()
	}, [fileState])

	return (
		<>
			<main className="overflow-auto bg-base-100">
				<BookCollection />
			</main>

			{showAlert && fileState === 'uploaded' ? (
				<div
					role="alert"
					className={`alert alert-success text-white w-max absolute bottom-2 left-[50%] translate-x-[-50%] transition-all duration-200 ${
						showAlert ? 'opacity-100' : 'opacity-0'
					}`}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6 shrink-0 stroke-current"
						fill="none"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<span>File uploaded successfully!</span>
				</div>
			) : showAlert && fileState === 'deleted' ? (
				<div
					role="alert"
					className={`alert alert-success text-white w-max absolute bottom-2 left-[50%] translate-x-[-50%] transition-all duration-200 ${
						showAlert ? 'opacity-100' : 'opacity-0'
					}`}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6 shrink-0 stroke-current"
						fill="none"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<span>File deleted successfully!</span>
				</div>
			) : (
				''
			)}
		</>
	)
}
