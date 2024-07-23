import { AppDispatch, RootState, appSlice } from '@/src/lib'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import styled from 'styled-components'

const Alert = styled.div<{ $show: boolean }>`
	position: absolute;
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
	const { setFileState } = appSlice.actions
	const { fileState } = useSelector((state: RootState) => state.app)
	const [showAlert, setShowAlert] = useState<boolean>(false)
	const [currentFileState, setCurrentFileState] = useState<string | null>(null)

	const setAlertState = useCallback(() => {
		if (fileState) {
			setCurrentFileState(fileState)
			setShowAlert(true)

			const timer = setTimeout(() => {
				setShowAlert(false)

				const hideTimer = setTimeout(() => {
					dispatch(setFileState(null))
					setCurrentFileState(null)
				}, 500)

				return () => clearTimeout(hideTimer)
			}, 4000)

			return () => clearTimeout(timer)
		}
	}, [fileState])

	useEffect(() => {
		setAlertState()
	}, [fileState])

	return (
		<>
			<Alert role="alert" className="alert alert-success" $show={showAlert}>
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
				<span>File {currentFileState} successfully!</span>
			</Alert>
		</>
	)
}
