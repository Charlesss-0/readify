import styled from 'styled-components'
import { theme } from './theme'

export const ItemListContainer = styled.ul`
	position: absolute;
	width: 100%;
	margin-top: 0.75rem;
	padding: 0.5rem;
	display: flex;
	flex-direction: column;
	border-radius: 0.5rem;
	background-color: ${theme['base-200']};
	user-select: none;
	border: 1px solid ${theme.neutral};
`

export const ItemList = styled.li``
