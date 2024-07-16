import { AppDispatch, RootState, appSlice } from '@/src/lib'
import styled, { keyframes } from 'styled-components'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const show = keyframes`
    0% {
        transform: translateX(-50%) translateY(200%);
		opacity: 0;
    }
    100% {
        transform: translateX(-50%) translateY(0%);
		opacity: 1;
    }
`

const Alert = styled.div`
	position: absolute;
	bottom: 0.5rem;
	left: 50%;
	transform: translateX(-50%);
	color: #ffffff;
	width: max-content;
	animation: ${show} 500ms forwards;
`

export default function Alerts() {
	const dispatch = useDispatch<AppDispatch>()
	const { setFileState } = appSlice.actions
	const { fileState } = useSelector((state: RootState) => state.app)
	const [showAlert, setShowAlert] = useState<boolean>(false)

	const setAlertState = useCallback(() => {
		if (fileState === 'uploaded' || fileState === 'deleted') {
			setShowAlert(true)

			const timer = setTimeout(() => {
				dispatch(setFileState(null))
				setShowAlert(false)
			}, 3000)

			return () => clearTimeout(timer)
		}
	}, [fileState])

	useEffect(() => {
		setAlertState()
	}, [fileState])

	return (
		<>
			{showAlert && (
				<Alert role="alert" className="alert alert-success">
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
					<span>File {fileState} successfully!</span>
				</Alert>
			)}
		</>
	)
}
