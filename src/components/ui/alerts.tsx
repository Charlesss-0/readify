import { AppDispatch, RootState, appSlice } from '@/src/lib'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import styled from 'styled-components'

const Alert = styled.div<{ $show: boolean }>`
	position: fixed;
	bottom: 0.5rem;
	left: 50%;
	transform: translateX(-50%);
	color: #ffffff;
	width: max-content;
	display: ${props => (props.$show ? 'flex' : 'none')};
	opacity: ${props => (props.$show ? '1' : '0')};
	transition: opacity 500ms;
`

export default function Alerts() {
	const dispatch = useDispatch<AppDispatch>()
	const { clearAlert } = appSlice.actions
	const { alert } = useSelector((state: RootState) => state.app)
	const [showAlert, setShowAlert] = useState<boolean>(false)

	const setAlertState = useCallback(() => {
		if (alert.type && alert.message) {
			setShowAlert(true)

			const timer = setTimeout(() => {
				setShowAlert(false)
				const hideTimer = setTimeout(() => {
					dispatch(clearAlert())
				}, 500)
				return () => clearTimeout(hideTimer)
			}, 4000)

			return () => clearTimeout(timer)
		}
	}, [alert])

	useEffect(() => {
		setAlertState()
	}, [alert])

	return (
		<>
			<Alert
				role="alert"
				className={`alert ${
					alert.type === 'info'
						? 'alert-info'
						: alert.type === 'success'
						? 'alert-success'
						: alert.type === 'error'
						? 'alert-error'
						: ''
				}`}
				$show={showAlert}
			>
				{alert.type === 'info' ? (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						className="h-6 w-6 shrink-0 stroke-current"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						></path>
					</svg>
				) : alert.type === 'success' ? (
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
				) : alert.type === 'error' ? (
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
							d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				) : (
					''
				)}
				<span>{alert.message}</span>
			</Alert>
		</>
	)
}
