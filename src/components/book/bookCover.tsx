import Link from 'next/link'
import styled from 'styled-components'
import { useBookContext } from '../../context/bookContext'

const Cover = styled.div`
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	width: 250px;
	height: 400px;
	overflow: hidden;
	border-radius: 0.5rem;
	box-shadow: 1px 1px 1rem 0 #000a;
`

export default function BookCover() {
	const { bookCover } = useBookContext()

	return (
		<div className="flex items-center justify-around gap-[4rem] h-[450px] p-[0.5rem]">
			{bookCover && (
				<Link href="/book">
					<Cover
						id="cover"
						style={{
							backgroundImage: `url('${bookCover}')`,
						}}
					/>
				</Link>
			)}
		</div>
	)
}
