'use client'

import { Header, Sidebar } from '@/src/components'
import styled, { keyframes } from 'styled-components'

import React from 'react'
import { RootState } from '@/src/lib'
import { theme } from '@/src/constants'
import { useSelector } from 'react-redux'

const loaderAnimation = keyframes`
	0% {
    	transform: rotateY(0deg);
  	}

  	50%, 80% {
    	transform: rotateY(-180deg);
  	}

	90%, 100% {
		opacity: 0;
		transform: rotateY(-180deg);
	}
`

const LoadingWrapper = styled.div`
	width: 100%;
	height: 90vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background: ${theme['base-100']};
`

const Loader = styled.div`
	position: relative;
	width: 40px;
	height: 40px;
	perspective: 67px;

	& > div {
		width: 100%;
		height: 100%;
		background: ${theme.primary};
		position: absolute;
		left: 50%;
		transform-origin: left;
		animation: ${loaderAnimation} 2s infinite;
	}

	& div:nth-child(1) {
		animation-delay: 0.15s;
	}

	& div:nth-child(2) {
		animation-delay: 0.3s;
	}

	& div:nth-child(3) {
		animation-delay: 0.45s;
	}

	& div:nth-child(4) {
		animation-delay: 0.6s;
	}

	& div:nth-child(5) {
		animation-delay: 0.75s;
	}
`

export default function LibraryLayout({ children }: { children: React.ReactNode }) {
	const { appState } = useSelector((state: RootState) => state.app)

	return (
		<>
			{appState === 'ready' ? (
				<>
					<Header />
					<Sidebar />
					<section>{children}</section>
				</>
			) : (
				<>
					<LoadingWrapper>
						<Loader>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
						</Loader>
					</LoadingWrapper>
				</>
			)}
		</>
	)
}
