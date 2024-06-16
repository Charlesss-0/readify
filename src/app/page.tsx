'use client'

import { BookCollection, Header, Sidebar } from '@/src/components'
import styled, { keyframes } from 'styled-components'
import { useEffect, useState } from 'react'

import { useBookContext } from '../context'

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
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #1f1f1f;
`

const Loader = styled.div`
	position: relative;
	width: 40px;
	height: 40px;
	perspective: 67px;

	& > div {
		width: 100%;
		height: 100%;
		background: #fff;
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

export default function Home() {
	const { book, isBookLoading } = useBookContext()
	const [pageState, setPageState] = useState<'loading' | 'ready'>('loading')

	useEffect(() => {
		if (isBookLoading) {
			setPageState('loading')
		} else if (book.length > 0) {
			setPageState('ready')
		}
	}, [isBookLoading, book])

	return (
		<>
			{pageState === 'loading' ? (
				<LoadingWrapper>
					<Loader>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</Loader>
				</LoadingWrapper>
			) : (
				<>
					<Header />
					<Sidebar />
					<main className="h-screen">
						<BookCollection />
					</main>
				</>
			)}
		</>
	)
}
